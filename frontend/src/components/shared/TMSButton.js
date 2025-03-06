import { Button as BTN, alpha } from "@mui/material";
import { MUIStyled } from "./MUIStyled";

const Button = MUIStyled(BTN)(({ theme, radius }) => ({
  boxShadow: "none",
  fontSize: 12,
  fontWeight: 600,
  padding: "12px 30px",
  lineHeight: 1.5,
  borderRadius: radius ? radius : 30,
  letterSpacing: "0.8px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 15px",
    minHeight: "auto",
    fontSize: 11,
  },
  "&.MuiButton-sizeSmall": {
    padding: "8px 15px",
    fontSize: 11,
  },
  "&.MuiButton-containedPrimary": {
    "&.Mui-disabled": {
      backgroundColor: alpha(theme.palette.primary.main, 0.4),
      color: theme.palette.white.main,
    },
  },
  "&.MuiButton-containedWhite:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: theme.palette.white.main,
  },
  "&:active, &:hover, &:focus": {
    boxShadow: "none",
  },
  "&.MuiButton-text": {
    backgroundColor: "transparent",
    padding: 0,
    fontWeight: "normal",
    "&:hover": {
      boxShadow: "none",
    },
  },
  "&.MuiButton-containedInfo": {
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  "&.MuiButton-containedWarning": {
    "&:hover": {
      backgroundColor: theme.palette.warning.main,
    },
  },
}));

const TMSButton = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default TMSButton;
