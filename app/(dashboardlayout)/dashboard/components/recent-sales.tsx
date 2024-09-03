import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ emailList }: { emailList: any }) {
  return (
    <div className="space-y-8">
      {emailList?.data?.data.map((email: any) => (
        <div key={email.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {email.first_name.slice(0, 1)}
              {email.last_name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {email.first_name} {email.last_name}
            </p>
            <p className="text-sm text-muted-foreground">{email.email}</p>
          </div>
          <div className="ml-auto font-xs">
            {email.unsubscribed ? "false" : "true"}
          </div>
        </div>
      ))}
    </div>
  );
}
