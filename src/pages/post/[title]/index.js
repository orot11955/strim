import { useRouter } from "next/router";

export default function Subject() {
  const router = useRouter();
  const { title } = router.query;

  return (
    <>
      <div>
        {title}
      </div>
    </>
  );
}