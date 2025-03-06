import { Menu } from "@mui/material";
import React from "react";

const TMSMenu = ({ children, ...rest }) => {
  return <Menu {...rest}>{children}</Menu>;
};

export default TMSMenu;
