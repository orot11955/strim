import { useRouter } from "next/router";
import Contents from "./Contents";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SubSidebar from "./Subsidebar";
import MailModal from "./MailModal";
import { useState } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);

  const subSidebarRoutes = ['/post'];
  const showSubSidrbar = subSidebarRoutes.some((path) => router.asPath.startsWith(path));

  return (
    <div className="layout-wrapper">
      <Sidebar setIsMailModalOpen={setIsMailModalOpen}/>
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
      <MailModal
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
      />
    </div>
  );
}