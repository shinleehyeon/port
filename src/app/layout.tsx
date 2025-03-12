import './globals.css'
import { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import OpenReplayTracker from '@/components/analytics/OpenReplayTracker';

export const metadata: Metadata = {
  title: 'shinleehyeon | Developer Portfolio',
  description: 'Welcome to the official portfolio of shinleehyeon, a passionate software developer.',
  verification: {
    google: 'U3XR0SbCLhek7REd-BeocPYDC8CP7GqVe_elyQn4GLg',
  },
  openGraph: {
    type: 'website',
    title: '신이현 | 개발자 포트폴리오',
    description: '성장하는 개발자 신이현 포트폴리오 웹사이트입니다.',
    url: 'https://www.2hyundev.com/',
    siteName: '신이현 포트폴리오',
    images: [
      {
        url: 'https://www.2hyundev.com/images/about.png',
        width: 800,
        height: 600,
        alt: '신이현 포트폴리오',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.2hyundev.com/'
  }
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
        <link rel="me" href="https://www.instagram.com/hyun._.s08/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "신이현",
              "url": "https://www.2hyundev.com/",
              "image": "https://www.2hyundev.com/images/about.png",
              "jobTitle": "Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "선린인터넷고등학교"
              },
              "sameAs": [
                "https://www.instagram.com/hyun._.s08/",
                "https://github.com/shinleehyeon"
              ]
            }`
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <OpenReplayTracker />
      </body>
    </html>
  )
}