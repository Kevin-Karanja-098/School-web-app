import { Tab, Tabs } from "@mui/material";
import { memo } from "react";
import { MUIStyled } from "./MUIStyled";
import TMSStack from "./TMSStack";

const StyledTab = MUIStyled(TMSStack)(({ theme }) => ({
  position: "relative",
  "& .MuiTabs-root": {
    "& button": {
      textTransform: "none",
      position: "relative",
      color: theme.palette.gray.darkGray,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
      },
      "&:not(:first-child)": {
        marginLeft: 20,
        [theme.breakpoints.down("sm")]: {
          marginLeft: 0,
        },
      },
      "&.Mui-selected": {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.gray.lightGray3,
        borderRadius: "8px 8px 0 0",
      },
    },
    "& .MuiTabScrollButton-root": {
      width: 30,
      color: theme.palette.primary.main,
      "&.Mui-disabled": {
        display: "none",
      },
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
}));

const TMSTabs = ({ list, wrapperSx, ...rest }) => {
  return (
    <StyledTab sx={wrapperSx}>
      <Tabs indicatorColor="none" {...rest} variant="scrollable">
        {list.map((item, index) => (
          <Tab
            label={item.label}
            key={index}
            value={item.value}
            disableRipple={rest.tabBordered}
            disabled={rest.disabled || item?.disabled}
          />
        ))}
      </Tabs>
    </StyledTab>
  );
};

export default memo(TMSTabs);
