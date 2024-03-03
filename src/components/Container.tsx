import type { FC, ReactNode } from "react";

import "./Container.scss";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <section className="container">{children}</section>;
};

export default Container;
