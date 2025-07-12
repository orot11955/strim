import { useRouter } from "next/router";
import Contents from "./Contents";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SubSidebar from "./Subsidebar";

export default function Layout({ children }) {
  const router = useRouter();

  const subSidebarRoutes = ['/post'];
  const showSubSidrbar = subSidebarRoutes.some((path) => router.asPath.startsWith(path));

  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className={`layout-subsidebar-wrapper ${showSubSidrbar ? 'show' : ''}`}>
        {showSubSidrbar && <SubSidebar />}
      </div>
      <div className="layout-body">
        <div className="layout-middle">
          <Header />
          <Contents>{children}</Contents>
        </div>
        <Footer />
      </div>
    </div>
  );
}