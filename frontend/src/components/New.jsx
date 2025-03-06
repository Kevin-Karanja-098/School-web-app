import React, { useState } from "react";
import { Button, TextField, IconButton, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { Search as SearchIcon, LocationOn as LocationOnIcon } from "@mui/icons-material";

const RouteForm = () => {
  const [loadingAddress, setLoadingAddress] = useState("");
  const [unloadingAddress, setUnloadingAddress] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);

  return (
    <Stack spacing={2} sx={{ width: "600px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth>SUBMIT</Button>

      {/* Loading Section */}
      <Typography color="error" fontWeight="bold">* Loading</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField label="Locality name" variant="outlined" size="small" fullWidth />
        <IconButton><SearchIcon /></IconButton>
        <TextField label="Address without city" variant="outlined" size="small" fullWidth />
        <IconButton><LocationOnIcon /></IconButton>
      </Stack>

      <TextField label="Input number 0" variant="outlined" size="small" fullWidth />
      <Button variant="outlined" fullWidth>+ Loading time</Button>

      {/* Add Route Point */}
      <Typography color="primary" fontWeight="bold">Add Route Point:</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="text" color="primary">+ Loading</Button>
        <Button variant="text" color="primary">+ Unloading point</Button>
        <Button variant="text" color="primary">+ Drive through</Button>
      </Stack>

      {/* Unloading Section */}
      <Typography color="error" fontWeight="bold">* Unloading</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField label="Locality name" variant="outlined" size="small" fullWidth />
        <IconButton><SearchIcon /></IconButton>
        <TextField label="Address without city" variant="outlined" size="small" fullWidth />
        <IconButton><LocationOnIcon /></IconButton>
      </Stack>
      <Button variant="outlined" fullWidth>+ Time and Date</Button>

      {/* Round Trip Checkbox */}
      <FormControlLabel
        control={<Checkbox checked={roundTrip} onChange={() => setRoundTrip(!roundTrip)} />}
        label="Round trip"
      />
    </Stack>
  );
};

export default RouteForm;
