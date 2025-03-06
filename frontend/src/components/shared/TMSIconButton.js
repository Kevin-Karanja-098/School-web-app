import IconButton from "@mui/material/IconButton";
import { MUIStyled } from "./MUIStyled";

const StyledIconButton = MUIStyled(IconButton)(({ theme }) => ({
  "&.Mui-disabled": {
    backgroundColor: "#ddd",
  },
}));

const TMSIconButton = (props) => {
  return <StyledIconButton {...props} />;
};

export default TMSIconButton;
