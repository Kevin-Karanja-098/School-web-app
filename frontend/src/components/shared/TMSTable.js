import { Table, TableContainer } from "@mui/material";
import React from "react";

const TMSTable = ({ children, ...rest }) => {
  return (
    <TableContainer>
      <Table {...rest}>{children}</Table>
    </TableContainer>
  );
};

export default TMSTable;
