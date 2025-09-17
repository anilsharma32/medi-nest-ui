import { Resend } from "resend";
import { NextResponse } from "next/server";
import AppointmentBookedEmail from "@/emails/my-email";

const resend = new Resend(process.env.RESEND_API_KEY);
// rect-email for template and resend for sending email.
export async function POST(req) {
  const response = await req.json();
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // add your domain here to send email
      // to: [response.data.Email],
      to: ["anilsharma320143@gmail.com"],
      subject: "Appointment Booking Confirmation",
      react: AppointmentBookedEmail({ response }),
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
