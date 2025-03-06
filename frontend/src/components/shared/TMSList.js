import { List } from "@mui/material";

const TMSList = (props) => {
  return <List {...props}>{props.children}</List>;
};

export default TMSList;
