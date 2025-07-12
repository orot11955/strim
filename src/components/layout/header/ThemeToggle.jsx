import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null); // 초기 null로 설정

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = saved || (prefersDark ? 'dark' : 'light');

    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  if (!theme) return null; // 클라이언트에서 테마 적용 전까지 렌더 막기

  return (
    <div onClick={toggleTheme}>
      {theme === 'dark' ? (
        <img className="svg" src="/images/logo/planet.svg" alt="dark" />
      ) : (
        <img className="svg" src="/images/logo/sun.svg" alt="light" />
      )}
    </div>
  );
}