import { Checkbox, FormControlLabel } from "@mui/material";
import { MUIStyled } from "./MUIStyled";

const StyledFormControlLabel = MUIStyled(FormControlLabel)(({ theme }) => ({
  marginRight: 0,
  "& .MuiCheckbox-root": {
    "&.Mui-disabled": {
      opacity: 0.4,
      color: theme.palette.primary.main,
    },
    "&.Mui-checked": {
      "&.Mui-disabled": {
        opacity: 0.4,
        color: theme.palette.primary.main,
      },
    },
  },
  "& .MuiTypography-root": {
    fontSize: 12,
    "& a": {
      color: "#000",
      textDecoration: "underline",
    },
    "& svg": {
      verticalAlign: "middle",
    },
  },
}));

const TMSCheckbox = ({
  label,
  labelSx,
  error,
  helperText,
  isForm,
  ...rest
}) => {
  return (
    <>
      <StyledFormControlLabel
        sx={labelSx}
        control={
          <Checkbox
            {...rest}
            onChange={(e, value) => {
              if (rest.onChange)
                isForm
                  ? rest.onChange(value, { ...rest })
                  : rest.onChange(e, value);
            }}
          />
        }
        label={label}
      />
    </>
  );
};

export default TMSCheckbox;
