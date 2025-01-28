import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
interface EmailRequest {
    email: string;
    subject: string;
    message: string;
}

export async function POST(request: Request) {
    try {
        const { email, subject, message }: EmailRequest = await request.json();

        const data = await resend.emails.send({
            from: 'port@resend.dev',
            to: ['shinlee7878@gmail.com'],
            reply_to: email,
            subject: subject,
            html: `
        <h1>${subject}</h1>
        <p>From: ${email}</p>
        <p>Message:</p>
        <p>${message}</p>
      `
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.log('error', error);
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }
}