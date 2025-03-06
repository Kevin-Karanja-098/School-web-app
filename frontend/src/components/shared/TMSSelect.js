import { FormControl, Select, useMediaQuery } from "@mui/material";
import React from "react";
import { ArrowDownFill } from "../assets/Icons";
import { MUIStyled } from "./MUIStyled";

const StyledSelect = MUIStyled(Select)(({ theme, radius }) => ({
  borderRadius: 4,
  "& svg": {
    width: 12,
    height: 12,
    flex: "none",
    color: theme.palette.gray.darkGray,
    marginRight: 10,
    marginLeft: 10,
  },
  "&.MuiFilledInput-root,&.MuiFilledInput-root.Mui-focused": {
    border: "1px solid #B8B8B8",
    backgroundColor: "#B8B8B8",
    "&:hover": {
      backgroundColor: "#B8B8B8",
    },
  },
  "&.MuiInputBase-root .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "&:before, &:after": {
    content: "normal",
  },
  "& .MuiSelect-select": {
    padding: radius ? "12px 40px 12px 20px !important" : 8,
    fontSize: 12,
    [theme.breakpoints.down("sm")]: {
      padding: radius ? "12px 40px 12px 20px !important" : "10px 12px",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#B8B8B8",
  },
  "&.Mui-focused": {
    backgroundColor: theme.palette.white.main,
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
    },
  },
  '& [aria-expanded="true"] +': {
    "& input + svg": {
      transform: "rotate(180deg)",
    },
  },
}));

const TMSSelect = ({
  children,
  variant,
  radius,
  value,
  label,
  required,
  error,
  helperText,
  controlSx,
  placeholder,
  showSanitizedValue = false,
  ...rest
}) => {
  const sanitizedValue = value === undefined ? "" : value;
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <FormControl variant={variant} fullWidth error={error} sx={controlSx}>
        <StyledSelect
          displayEmpty
          value={showSanitizedValue ? showSanitizedValue : sanitizedValue}
          renderValue={
            showSanitizedValue
              ? (value) =>
                  value?.length
                    ? Array.isArray(value)
                      ? value.join(", ")
                      : value
                    : placeholder
              : undefined
          }
          radius={radius}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: 3,
                marginTop: 1,
                "& .MuiList-root": {
                  ...(matches && {
                    padding: 2,
                    "& .MuiButtonBase-root": {
                      borderRadius: 2,
                    },
                  }),
                },
                ...(matches && {
                  position: "fixed",
                  bottom: 0,
                  top: "auto !important",
                  left: "0 !important",
                  right: "0 !important",
                  maxWidth: "100%",
                  borderRadius: "25px 25px 0 0",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                }),
              },
            },
          }}
          IconComponent={() => <ArrowDownFill />}
          {...rest}
          onChange={(e) => rest.onChange(e, { ...rest })}
        >
          {children}
        </StyledSelect>
      </FormControl>
    </>
  );
};

export default TMSSelect;
