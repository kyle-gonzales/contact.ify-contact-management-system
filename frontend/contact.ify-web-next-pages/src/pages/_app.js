import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
