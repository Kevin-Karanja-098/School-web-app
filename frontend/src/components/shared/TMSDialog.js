import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { Close } from "../assets/Icons";
import TMSStack from "./TMSStack";
import TMSButton from "./TMSButton";

const TMSDialog = ({
  children,
  btnText,
  onDialogClose,
  handleSubmit,
  loading,
  title,
  ...rest
}) => {
  return (
    <>
      <Dialog {...rest} fullWidth onClose={onDialogClose}>
        <DialogTitle
          fontWeight="bold"
          sx={{ py: 1.5, borderBottom: "1px solid #ddd" }}
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 14,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
          <TMSStack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            mt={2}
          >
            <TMSButton
              variant="contained"
              onClick={onDialogClose}
              disabled={loading}
              sx={{
                backgroundColor: "gray.dark",
                "&:hover": { backgroundColor: "orange.main" },
              }}
            >
              Cancel
            </TMSButton>
            <TMSButton
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {btnText}
            </TMSButton>
          </TMSStack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TMSDialog;
