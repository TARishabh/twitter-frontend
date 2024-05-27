import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Toaster} from "react-hot-toast"

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
export default function App({ Component, pageProps }: AppProps) {
  return(
    <GoogleOAuthProvider clientId={clientId}>
    <Component {...pageProps} />
    <Toaster/>
    </GoogleOAuthProvider>
)}
