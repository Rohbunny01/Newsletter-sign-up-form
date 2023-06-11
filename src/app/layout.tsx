import './globals.css'
import { Roboto} from 'next/font/google'

const roboto = Roboto({ weight: ["400", "700"], subsets: ['latin'] })

export const metadata = {
  title: 'Frontend Mentor | Newsletter sign-up form with success message',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}