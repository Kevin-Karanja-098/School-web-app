import { ListItem } from "@mui/material";

const TMSListItem = (props) => {
  return <ListItem {...props}>{props.children}</ListItem>;
};

export default TMSListItem;
