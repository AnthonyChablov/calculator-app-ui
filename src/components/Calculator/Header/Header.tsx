import React from "react";
import Toggle from "./Toggle/Toggle";
import HeaderText from "@/components/Typography/HeaderText/HeaderText";

const Header = () => {
  return (
    <div className="flex items-center justify-between ">
      <HeaderText header="calc" className=" text-xl" />
      <Toggle title="THEME" />
    </div>
  );
};

export default Header;
