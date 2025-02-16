import './globals.css'
import { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'

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
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JZZ3PWV3FP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JZZ3PWV3FP');
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}