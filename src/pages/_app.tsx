import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-80 pt-40">
      <Component {...pageProps} />
    </div>
  );
}
