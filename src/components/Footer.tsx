import type { FC } from "react";

import "./Footer.scss";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div>
        Made by{" "}
        <a
          className="link"
          href="http://github.com/lxchapu"
          target="_black"
          rel="nofollow noopener noreferrer"
        >
          lxchapu
        </a>
      </div>

      <div className="divider">|</div>

      <div className="locale">English</div>
    </footer>
  );
};

export default Footer;
