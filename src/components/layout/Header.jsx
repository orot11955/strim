import ThemeToggle from "./header/ThemeToggle";

export default function Header() {
  return (
    <div className="layout-header">
      <div className="header-left">
        <div className="logo"></div>
      </div>
      <div className="header-right">
        <img class="svg" src="/images/logo/user.svg" />
        <ThemeToggle />  
      </div>
    </div>
  );
}