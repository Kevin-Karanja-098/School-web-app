import { FormGroup, TextField as TF } from "@mui/material";
import React from "react";
import { MUIStyled } from "./MUIStyled";
import TMSFormLabel from "./TMSFormLabel";

const TextField = MUIStyled(TF)(({ theme }) => ({
  marginTop: 0,
  marginBottom: 0,
  "& .Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
    },
  },
  "& .MuiInputBase-input": {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  "& .MuiFilledInput-root": {
    borderRadius: 6,
    border: "1px solid #B8B8B8",
    backgroundColor: "#edf4fc",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#edf4fc",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
    },
    "&.Mui-focused": {
      backgroundColor: "#edf4fc",
    },
    "& .MuiInputBase-input": {
      padding: 12,
      [theme.breakpoints.down("sm")]: {
        padding: "10px 14px",
      },
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button, &[type="number"]':
        {
          WebkitAppearance: "none",
          MozAppearance: "textfield",
        },
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus":
        {
          WebkitBoxShadow: `0 0 0px 40rem #edf4fc inset`,
          borderRadius: 6,
        },
      "&::-webkit-input-placeholder": {
        color: "#B8B8B8",
      },
      "&:-ms-input-placeholder": {
        color: "#B8B8B8",
      },
      "&::placeholder": {
        color: "#B8B8B8",
      },
    },
    "&:before, &:after": {
      content: "normal",
    },
    "&.MuiInputBase-multiline": {
      padding: 0,
      "& textarea": {
        resize: "vertical",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "& svg": {
      width: 15,
      height: 15,
      verticalAlign: "middle",
    },
  },
}));
const TMSInput = (props) => {
  const { label, sxFormGroup = {}, ...otherProps } = props;
  return (
    <FormGroup sx={{ ...sxFormGroup }}>
      {label && (
        <TMSFormLabel sx={{ wordBreak: "break-word", whiteSpace: "normal" }}>
          {label}
        </TMSFormLabel>
      )}
      <TextField {...otherProps} />
    </FormGroup>
  );
};

export default TMSInput;
