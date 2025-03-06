import { Card } from "@mui/material";
import React from "react";
import { MUIStyled } from "./MUIStyled";

const StyleCard = MUIStyled(Card)(({ theme }) => ({
  padding: 20,
  borderRadius: 4,
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.10)",
  [theme.breakpoints.down("sm")]: {
    padding: 15,
  },
}));
const TMSCard = ({ children, ...rest }) => {
  return (
    <StyleCard elevation={0} {...rest}>
      {children}
    </StyleCard>
  );
};

export default TMSCard;
