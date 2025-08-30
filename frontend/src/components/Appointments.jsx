import React, { useState, } from "react";
import {Container,List, ListItem, 
  ListItemText,   MenuItem, Button, Typography, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid,   } from "@mui/material";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2025-04-01", time: "10:00 AM", counselor: "Dr. Jane Doe" },
    { id: 2, date: "2025-04-05", time: "2:00 PM", counselor: "Mr. John Smith" }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "", time: "", counselor: ""
  });

  const counselors = ["Mr. Kevin Karanja","Dr. Jane Doe", "Mr. John Smith", "Dr. Emily Carter"];

  const handleBookAppointment = () => {
    if (!newAppointment.date || !newAppointment.time || !newAppointment.counselor) return;
    
    setAppointments([...appointments, { 
      id: appointments.length + 1, 
      ...newAppointment 
    }]);

    setNewAppointment({ date: "", time: "", counselor: "" });
    setOpenDialog(false);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, paddingBottom: '60px',paddingTop: "60px" }}>
      <Typography variant="h4" align="center" color="green">Manage Your Appointments</Typography>

      {/* Appointment List */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6">Upcoming Appointments</Typography>
        <List>
          {appointments.length === 0 ? (
            <Typography color="textSecondary" sx={{ textAlign: "center", py: 2 }}>No appointments scheduled.</Typography>
          ) : (
            appointments.map((appointment) => (
              <ListItem key={appointment.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText 
                  primary={`Date: ${appointment.date} | Time: ${appointment.time}`} 
                  secondary={`Counselor: ${appointment.counselor}`} 
                />
                <Button variant="contained" color="error" size="small" onClick={() => handleCancelAppointment(appointment.id)}>
                  Cancel
                </Button>
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      {/* Book Appointment Button */}
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2, bgcolor: "green", color: "white" }} 
        onClick={() => setOpenDialog(true)}
      >
        Book a New Appointment
      </Button>

      {/* Dialog for Booking New Appointment */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Select Date" type="date" 
                value={newAppointment.date} 
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Select Time" type="time" 
                value={newAppointment.time} 
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                select fullWidth label="Select Counselor" 
                value={newAppointment.counselor} 
                onChange={(e) => setNewAppointment({ ...newAppointment, counselor: e.target.value })}
              >
                {counselors.map((counselor) => (
                  <MenuItem key={counselor} value={counselor}>{counselor}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleBookAppointment}>Book</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentsPage;