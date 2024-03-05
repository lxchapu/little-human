import type { FC } from "react";
import { useTranslation } from "react-i18next";

import "./Footer.scss";
import { Locale } from "../utils/enums";

const Footer: FC = () => {
  const { i18n } = useTranslation();

  function switchLocale() {
    i18n.changeLanguage(i18n.language === Locale.EN ? Locale.ZH : Locale.EN);
  }

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

      <div className="locale" role="button" onClick={switchLocale}>
        {i18n.language === Locale.EN ? "简体中文" : "English"}
      </div>
    </footer>
  );
};

export default Footer;
