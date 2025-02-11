import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'shinleehyeon | Developer Portfolio',
  description: 'Welcome to the official portfolio of shinleehyeon, a passionate software developer.',
  verification: {
    google: 'U3XR0SbCLhek7REd-BeocPYDC8CP7GqVe_elyQn4GLg',
  },
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}