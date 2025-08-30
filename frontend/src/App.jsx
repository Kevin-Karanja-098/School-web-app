import React, { useState,  } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, BottomNavigation, BottomNavigationAction, Paper,
   TextField,  Dialog, DialogTitle, DialogContent, DialogActions,   } from "@mui/material";
import { Home, Chat, Event, Person,Article,} from "@mui/icons-material";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import HomePage from './components/Home';
import ChatPage from "./components/Chat";
import BlogSection from "./components/Blogs";
import AppointmentsPage from "./components/Appointments";
import ProfilePage from "./components/profile";


const firebaseConfig = {
  apiKey: "AIzaSyDw4hjVKQAKk-4q_X80wKbA2Hd2CWk0j04",
  authDomain: "karu-cousellors.firebaseapp.com",
  projectId: "karu-cousellors",
  storageBucket: "karu-cousellors.firebasestorage.app",
  messagingSenderId: "122679199731",
  appId: "1:122679199731:web:2e5b94cec06165f9e7b486",
  measurementId: "G-41C9HQL3LM"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "BFMLuh1J4OvBQYZKsdpbPuQ-zWvIXZzUamyzuuEGGwXHSrwxhd5cxX24rKoO6kuwmlaXkX5D5TdW4JFaO-nPVjg" });
      console.log("Push Notification Token:", token);
      return token;
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting notification token:", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Foreground Message Received:", payload);
});


const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#D3D3D3" }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction 
          label="Home" 
          icon={<Home style={{color:"#009444", borderRadius: "50%", padding: "5px" }} />} 
          onClick={() => navigate("/")} 
        />
        <BottomNavigationAction
          label="Chat"
          icon={<Chat sx={{ color: "#009444", borderRadius: "50%", padding: "5px" }} />}
          onClick={() => navigate("/chat")}
        />
        <BottomNavigationAction
          label="Blogs"
          icon={<Article sx={{ color: "#009444" }} />}
          onClick={() => navigate("/blogs")}
        />
        <BottomNavigationAction 
          label="Appointments" 
          icon={<Event style={{color:"#009444",  borderRadius: "50%", padding: "5px" }} />} 
          onClick={() => navigate("/appointments")} 
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<Person style={{color:"#009444",  borderRadius: "50%", padding: "5px" }} />} 
          onClick={() => navigate("/profile")} 
        />
      </BottomNavigation>
    </Paper>
  );
};

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", phone: "", password: "", confirmPassword: "" });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar   position='fixed' style={{ backgroundColor: "#009444" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <img src="https://students.karu.ac.ke/images/kar.png"   style={{ width: "20px", marginRight: "10px" }} />
            <Typography variant="h6" style={{ color: "#fff" }}>Karu Counseling</Typography>
          </div>
          <div>
            <Button  color="inherit" onClick={() => setLoginOpen(true)}>Login</Button>
            <Button variant="contained" style={{fontSize:"9px", width: "40px",backgroundColor: "#fff", color: "#009444" }} onClick={() => setSignupOpen(true)}>Register</Button>
          </div>
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/blogs" element={<BlogSection />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      <Navigation />

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle style={{ color: " #009444" }}>Login</DialogTitle>
        <DialogContent>
          <TextField style={{ color: " #009444" }} fullWidth margin="normal" label="Phone Number" variant="outlined" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <TextField fullWidth margin="normal" label="Password" type="password" variant="outlined"  />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#009444" }} onClick={() => setLoginOpen(false)}>Cancel</Button>
          <Button style={{ backgroundColor: "#009444", color: "#fff" }}>Login</Button>
        </DialogActions>
       
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onClose={() => setSignupOpen(false)}>
        <DialogTitle style={{ color: " #009444" }}>Sign Up</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Email" variant="outlined"  />
          <TextField fullWidth margin="normal" label="Phone Number" variant="outlined" />
          <TextField fullWidth margin="normal" label="Password" type="password" variant="outlined" />
          <TextField fullWidth margin="normal" label="Confirm Password" type="password" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#009444" }} onClick={() => setSignupOpen(false)}>Cancel</Button>
          <Button style={{ backgroundColor: "#009444", color: "#fff" }}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;