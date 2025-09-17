import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Sequential ID generator (starts from 1001 each day)
const getUniqueId = () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const counterKey = `patientCounter_${today}`;

  if (!global[counterKey]) {
    global[counterKey] = 1000; // start from 1001
  }
  global[counterKey]++;

  return global[counterKey];
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const AppointmentBookedEmail = () => {
  const appointmentId = getUniqueId();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Your appointment has been successfully booked!</Preview>
        <Container style={container}>
          <Section style={box}>
            {/* Company Logo */}
            <Img
              src={`https://res.cloudinary.com/dpy32gguc/image/upload/v1757523852/logo_f57a822ddd.svg`}
              width="150"
              height="50"
              alt="Company Logo"
              style={{ margin: "0 auto" }}
            />

            <Hr style={hr} />

            {/* Greeting */}
            <Text style={heading}>Appointment Confirmation</Text>

            {/* Appointment Details */}
            <Text style={paragraph}>
              Dear Patient,
            </Text>
            <Text style={paragraph}>
              We are pleased to inform you that your appointment has been
              successfully booked with our healthcare team. Please find the
              details of your appointment below.
            </Text>

            <Text style={paragraph}>
              <b>Appointment ID:</b> {appointmentId}
            </Text>

            <Text style={paragraph}>
              Your appointment ID is unique to this booking. Please keep it safe
              and use it for any future communication with our clinic.
            </Text>

            <Text style={paragraph}>
              Our team will be ready to welcome you and provide the best possible
              care. We recommend arriving 10–15 minutes before your scheduled
              time to ensure a smooth experience.
            </Text>

            <Text style={paragraph}>
              If you need to reschedule or have any questions, please contact our
              support team. We are here to assist you at every step.
            </Text>

            <Text style={paragraph}>
              Thank you for choosing us as your healthcare provider. We look
              forward to serving you.
            </Text>

            <Hr style={hr} />

            {/* Button (Optional) */}
            <Button style={button} href={`${baseUrl}`}>
              Visit Our Website
            </Button>

            <Hr style={hr} />

            {/* Footer */}
            <Text style={footer}>
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AppointmentBookedEmail;

/* Styles */
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "12px",
  textAlign: "center",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
  marginBottom: "12px",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center",
};
