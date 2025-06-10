export interface EmailData {
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
}
