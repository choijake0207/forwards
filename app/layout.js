import "./styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import {Analytics} from "@vercel/analytics/react"




export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body>
        <AuthProvider>
            {children}
            <Analytics/>
        </AuthProvider>
      </body>
    </html>
  );
}

