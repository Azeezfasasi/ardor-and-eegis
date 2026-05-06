import '../globals.css'
import MainHeader from '@/components/home-component/MainHeader'
import Footer from '@/components/home-component/Footer'
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast';
import MessageSlider from '@/components/home-component/MessageSlider';

export const metadata = {
  title: 'Ardor and Eegis - Security and Protection Solutions',
  description: 'Ardor and Eegis provides cutting-edge security and protection solutions for communities. Trust us to keep your community safe and secure.',
  icons: {
    icon: '/portalfav.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="w-full site-main-header fixed top-0 z-50">
            <MessageSlider />
            <MainHeader />
          </div>
          <main>{children}</main>
          <div className="site-main-header">
            {/* <Footer /> */}
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  )
}
