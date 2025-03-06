import { Grid } from "@mui/material";
import React from "react";

const TMSGrid = ({ children, ...rest }) => {
  return <Grid {...rest}>{children}</Grid>;
};

export default TMSGrid;
