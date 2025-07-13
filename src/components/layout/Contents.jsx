import { useRouter } from "next/router";
import CommonTitle from "../common/CommonTitle";

export default function Contents({ children }) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <div className="layout-contents">
      <div className="contents-title">
        <CommonTitle path={path}/>
      </div>
      <div className="contents-detail">
        {children}
      </div>
    </div>
  );
}