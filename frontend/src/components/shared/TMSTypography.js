import { Typography } from "@mui/material";
import React from "react";

const TMSTypography = ({ children, ...rest }) => {
  return <Typography {...rest}>{children}</Typography>;
};

export default TMSTypography;
