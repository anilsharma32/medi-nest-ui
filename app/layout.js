import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });



export const metadata = {
  title: "MediNest",
  description: "Doctor Appointment Booking",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        <div className="md:px-20">
          <Header/>
          {children}
          <Toaster/>
        </div>
      {/* Footer (hyperui.dev)*/}
      <Footer />
      </body>
    </html>
  );
}
