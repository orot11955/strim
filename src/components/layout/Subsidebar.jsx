import { useRouter } from "next/router";

export default function SubSidebar() {
  const router = useRouter();

  const path = router.asPath;

  let title = path.split('/')[1].toUpperCase();

  if (title !== 'POST') {
    title = '';
  }


  return (
    <div className="layout-subsidebar">
      <h4 className="subsidebar-title">{title}</h4>
    </div>
  );
}