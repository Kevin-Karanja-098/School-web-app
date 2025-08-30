import React, { useState, } from "react";
import {Container, Switch,CardContent, Avatar,  Button, Typography,TextField, Card,} from "@mui/material";

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Peer counselor at Karatina University.",
    profilePic: "https://via.placeholder.com/100",
  });
  const [message, setMessage] = useState("");

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const handleSendData = async () => {
    try {
      const response = await fetch("https://your-backend.com/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (response.ok) alert("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ 
      paddingBottom: '60px',paddingTop: "64px" , textAlign: "center", backgroundColor: darkMode ? "#1b5e20" : "#e8f5e9", 
      color: darkMode ? "#fff" : "#000", minHeight: "100vh" 
    }}>
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      <Typography variant="h4" gutterBottom style={{ color: "#2e7d32" }}>Your Profile</Typography>
      
      <Card style={{ padding: "20px", textAlign: "center", backgroundColor: darkMode ? "#2e7d32" : "#c8e6c9" }}>
        <CardContent>
          <Avatar src={user.profilePic} alt="Profile" style={{ width: "100px", height: "100px", margin: "auto" }} />
          
          {isEditing ? (
            <>
              <TextField fullWidth label="Name" name="name" value={user.name} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Email" name="email" value={user.email} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Bio" name="bio" value={user.bio} onChange={handleChange} margin="normal" multiline />
              <Button variant="contained" color="primary" onClick={handleEditToggle} style={{ marginTop: "10px", backgroundColor: "#1b5e20" }}>Save</Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body1" color="textSecondary">{user.email}</Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>{user.bio}</Typography>
              <Button variant="outlined" color="primary" onClick={handleEditToggle} style={{ marginTop: "10px", borderColor: "#1b5e20", color: "#1b5e20" }}>Edit Profile</Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Form to Send Data to Backend */}
      <Card style={{ marginTop: "20px", padding: "20px", backgroundColor: "#c8e6c9" }}>
        <Typography variant="h6" style={{ color: "#2e7d32" }}>Send Feedback</Typography>
        <TextField
          fullWidth
          label="Enter your message"
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleSendData} style={{ backgroundColor: "#1b5e20", color: "white" }}>Send</Button>
      </Card>
    </Container>
  );
};

export default ProfilePage;