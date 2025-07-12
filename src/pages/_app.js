import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import '@/styles/layout.css';
import '@/styles/markdown.css';
import '@/domains/login/login.css';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutRoutes = ['/login'];
  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  return isNoLayout ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
