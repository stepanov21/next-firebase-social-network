import React, { FC, PropsWithChildren } from "react";
import Aside from "./aside/Aside";
import Header from "./header/Header";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <div className="max-w-[1140px] w-[100%] my-0 mx-auto px-[25px]">
        <Header />
        <main
          className="grid grid-cols-[3fr_9fr] gap-4
        "
        >
          <Aside />
          <div className="bg-second overflow-hidden rounded-xl p-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
