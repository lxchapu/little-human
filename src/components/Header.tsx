import type { FC } from "react";

import "./Header.scss";
import iconGithub from "../assets/icons/github.svg";

const Header: FC = () => {
  return (
    <header className="header">
      <img className="site-logo" src="/favicon.png" alt="logo" />

      <h2 className="site-title">Little Human</h2>

      <div className="header-right">
        <a
          className="github-button"
          href="https://github.com/lxchapu/little-human"
          role="button"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <img className="icon" src={iconGithub} alt="Github" />
          <span className="text">Github</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
