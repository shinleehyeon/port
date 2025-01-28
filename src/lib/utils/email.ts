import type { EmailData, EmailResponse } from '@/types/api';

export async function sendEmail(data: EmailData): Promise<EmailResponse> {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}