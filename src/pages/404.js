import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="not-found-page">
      <h1>404 - 페이지를 찾을 수 없습니다 😢</h1>
      <p>존재하지 않는 주소이거나, 이동되었을 수 있어요.</p>
      <Link href="/" className="back-home">
        홈으로 돌아가기
      </Link>
    </div>
  );
}