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

        const emailTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #2D3748;
            margin: 0;
            padding: 0;
            background-color: #F7FAFC;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        .header {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #4A5568 0%, #2D3748 100%);
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 32px;
        }
        .info-section {
            margin-bottom: 24px;
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
            border: 1px solid #E2E8F0;
        }
        .info-label {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #4A5568;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .info-value {
            font-size: 16px;
            color: #2D3748;
            padding: 12px 16px;
            background-color: #F7FAFC;
            border-radius: 8px;
        }
        .message-box {
            margin-top: 8px;
            padding: 20px;
            background-color: #F7FAFC;
            border-radius: 8px;
            font-size: 16px;
            line-height: 1.8;
        }
        .footer {
            text-align: center;
            padding: 32px;
            background-color: #F8F9FA;
            border-top: 1px solid #E2E8F0;
        }
        .footer p {
            margin: 4px 0;
            color: #718096;
            font-size: 14px;
        }
        .social-links {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #E2E8F0;
        }
        .social-links a {
            color: #718096;
            text-decoration: none;
            margin: 0 8px;
            font-weight: 500;
        }
        .divider {
            height: 4px;
            width: 60px;
            background: linear-gradient(90deg, #4A5568 0%, #718096 100%);
            margin: 24px auto;
            border-radius: 2px;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 20px;
                width: auto;
            }
            .header {
                padding: 30px 20px;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>포트폴리오 메시지 알림</h1>
            <p>새로운 문의가 도착했습니다</p>
        </div>
        <div class="content">
            <div class="info-section">
                <div class="info-label">보낸 사람</div>
                <div class="info-value">${email}</div>
            </div>
            
            <div class="info-section">
                <div class="info-label">제목</div>
                <div class="info-value">${subject}</div>
            </div>
            
            <div class="info-section">
                <div class="info-label">메시지</div>
                <div class="message-box">${message}</div>
            </div>
        </div>
        
        <div class="footer">
            <div class="divider"></div>
            <p>© 2024 신이현 포트폴리오</p>
            <p>본 이메일은 포트폴리오 사이트를 통해 전송되었습니다.</p>
        </div>
    </div>
</body>
</html>`;

        const data = await resend.emails.send({
            from: 'Portfolio <port@resend.dev>',
            to: ['shinlee7878@gmail.com'],
            reply_to: email,
            subject: `[포트폴리오 문의]`,
            html: emailTemplate
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