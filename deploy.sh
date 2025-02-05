#!/bin/bash
# Env Vars
DOMAIN_NAME="tool.oneclickresult.com"
APP_DIR=/home/ubuntu/myapp
SWAP_SIZE="1G"  # Swap size of 1GB

# Update package list and upgrade existing packages
sudo dnf update -y

# Add Swap Space
echo "Adding swap space..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l $SWAP_SIZE /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# Install Docker
echo "Installing Docker..."
sudo dnf install -y yum-utils device-mapper-persistent-data lvm2
sudo dnf config-manager --add-repo https://download.docker.com/linux/oracle/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io

# Start and enable Docker
sudo systemctl enable --now docker
sudo systemctl start docker

# Install Docker Compose
echo "Installing Docker Compose..."
sudo rm -f /usr/local/bin/docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

if [ ! -f /usr/local/bin/docker-compose ]; then
    echo "Docker Compose download failed. Exiting."
    exit 1
fi

sudo chmod +x /usr/local/bin/docker-compose
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify Docker Compose
docker-compose --version
if [ $? -ne 0 ]; then
    echo "Docker Compose installation failed. Exiting."
    exit 1
fi

# Clone the Git repository
if [ -d "$APP_DIR" ]; then
    echo "Directory $APP_DIR already exists. Pulling latest changes..."
    cd $APP_DIR && git pull
else
    echo "Cloning repository from $REPO_URL..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# Install Nginx
echo "Installing Nginx..."
sudo dnf install -y nginx

# Stop any service using port 80
echo "Stopping services on port 80..."
sudo systemctl stop nginx
sudo lsof -ti:80 | xargs sudo kill -9 2>/dev/null || true

# Create Nginx directories if they don't exist
echo "Setting up Nginx directories..."
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

# Remove old Nginx config (if it exists)
sudo rm -f /etc/nginx/sites-available/myapp
sudo rm -f /etc/nginx/sites-enabled/myapp
sudo rm -f /etc/nginx/sites-enabled/default

# Create Nginx config
echo "Creating Nginx configuration..."
sudo tee /etc/nginx/sites-available/myapp > /dev/null <<EOL
# Rate limiting configuration
limit_req_zone \$binary_remote_addr zone=mylimit:10m rate=10r/s;

server {
    listen 80;
    server_name $DOMAIN_NAME;

    # application
    location / {
        limit_req zone=mylimit burst=20 nodelay;
        proxy_pass http://localhost:3000;  # application port
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_buffering off;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Accel-Buffering no;
    }
}
EOL

# Create symbolic link
echo "Creating Nginx symbolic link..."
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# Start Nginx
echo "Starting Nginx..."
sudo systemctl enable nginx
sudo systemctl start nginx

# Start Docker containers
echo "Starting Docker containers..."
cd $APP_DIR
sudo docker-compose up --build -d

# Check Docker containers
echo "Checking Docker container status..."
sudo docker-compose ps

# Final status check
echo "Checking final deployment status..."
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx failed to start"
fi

if sudo docker-compose ps | grep "Up"; then
    echo "✅ Docker containers are running"
else
    echo "❌ Docker containers failed to start"
fi

echo "Deployment complete! Your application should be available at http://$DOMAIN_NAME"
echo "Please check the logs if you encounter any issues:"
echo "Nginx logs: sudo journalctl -u nginx"
echo "Docker logs: sudo docker-compose logs"

