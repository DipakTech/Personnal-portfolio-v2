import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "https://dipakgiri12.com.np/images/logo.png";

export const WelcomeEmailTemplate = ({ email }: { email: string }) => (
  <Html>
    <Head />
    <Preview>Get your order summary, estimated delivery date and more</Preview>
    <Body style={main}>
      <Container style={container}>
        <Hr style={global.hr} />
        <Section style={message}>
          <Img
            src={`https://dipakgiri12.com.np/images/logo.png`}
            width="30"
            height="22"
            alt="Dipak Giri"
            style={{ margin: "auto" }}
          />
          <Heading style={global.heading}>Welcome to my Newsletter</Heading>
          <Text style={global.text}>
            Hi, {email}! I&apos;m Dipak Giri, a software engineer. II&apos;mm
            excited to have you on board.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            Thank you for subscribing to my newsletter. I will keep you updated
            with the latest blog posts.
          </Text>
        </Section>

        <Section style={paddingY}>
          <Row style={footer.policy}>
            <Column>
              <Text style={footer.text}>Dipak Giri</Text>
            </Column>
            <Column>
              <Text style={footer.text}>Privacy Policy</Text>
            </Column>
          </Row>
          <Row>
            <Text style={{ ...footer.text, paddingTop: 10, paddingBottom: 10 }}>
              Please contact us if you have any questions :)
            </Text>
          </Row>
          <Row>
            <Text style={footer.text}>© 2024 Dipak All Rights Reserved.</Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmailTemplate;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "5px",
  paddingBottom: "5px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
