import Navbar from '../components/layout/navbar'
import Footer from '../components/layout/footer'
import SmoothScrollProvider from '../components/animations/SmoothScrollProvider'
import './globals.css'

export const metadata = {
  title: 'YourName — Portfolio',
  description: 'Mobile, web & backend projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
