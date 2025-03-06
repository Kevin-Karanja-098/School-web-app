import React from "react";
import { FormLabel } from "@mui/material";

const TMSFormLabel = ({ children, ...rest }) => {
  return <FormLabel {...rest}>{children}</FormLabel>;
};

export default TMSFormLabel;
