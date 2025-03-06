import { Stack } from "@mui/material";
import React from "react";

const TMSStack = ({ children, ...rest }) => {
  return <Stack {...rest}>{children}</Stack>;
};

export default TMSStack;
