import { useState, useRef, useEffect } from "react";
import {Container, 
  Box, Typography, Paper, List, ListItem, ListItemText, Avatar, TextField, 
  Button, Grid, IconButton, Drawer, Divider, AppBar, Toolbar 
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const ChatPage = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) || [
      { id: 1, name: "Dr. Jane Doe", avatar: "J" },
      { id: 2, name: "Mr. John Smith", avatar: "S" },
      { id: 3, name: "Dr. Emily Carter", avatar: "E" }
    ];
  });
  const [newContact, setNewContact] = useState("");
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("messages")) || [
      { text: "Hello! How can I assist you today?", sender: "counselor" },
      { text: "I need help with stress management.", sender: "user" }
    ];
  });
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);
    
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = [...messages, { text: newMessage, sender: "user" }];
    setMessages(updatedMessages);
    setNewMessage("");
    setTimeout(() => {
      setMessages([...updatedMessages, { text: "I understand. Let’s talk about it.", sender: "counselor" }]);
    }, 1000);
  };

  const addContact = () => {
    if (!newContact.trim()) return;
    const newEntry = { id: Date.now(), name: newContact, avatar: newContact[0].toUpperCase() };
    setContacts([...contacts, newEntry]);
    setNewContact("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
     <Container maxWidth="sm" style={{ 
          paddingBottom: '60px',paddingTop: "64px" , 
        }}>
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "#e8f5e9", paddingBottom: '100px'   }}>
        <Box sx={{ 
          height: "100px",
          overflow: "auto",
          paddingBottom: '60px',
          bgcolor: "#D0F0C0", 
          display: "flex", 
          alignItems: "center", 
          padding: "8px 16px", 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
        }}>
  {/* <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)} sx={{ mr: 2 }}>
    <MenuIcon />
  </IconButton> */}
  <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
  <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)} sx={{ mr: 2 }}>
    <MenuIcon />
  </IconButton>
    Chat with {selectedContact?.name || "Select a Contact"}
    <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              {msg.sender === "counselor" && <Avatar sx={{ bgcolor: "#2e7d32", mr: 1 }}>C</Avatar>}
              <Box sx={{ bgcolor: msg.sender === "user" ? "#c8e6c9" : "#e0e0e0", padding: "10px", borderRadius: "10px", maxWidth: "70%", textAlign: msg.sender === "user" ? "right" : "left", boxShadow: 2 }}>
                <ListItemText primary={msg.text} />
              </Box>
              {msg.sender === "user" && <Avatar sx={{ bgcolor: "#1b5e20", ml: 1 }}>U</Avatar>}
            </ListItem>
          ))}
          <div ref={chatEndRef} />
        </List>
  </Typography>
</Box>

      <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={() => setSidebarOpen(false)} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2 }}>Contacts</Typography>
          <Divider />
          <List>
            {contacts.map((contact) => (
              <ListItem 
                key={contact.id} 
                button 
                onClick={() => {
                  setSelectedContact(contact);
                  setSidebarOpen(false);
                }}
                sx={{ backgroundColor: selectedContact?.id === contact.id ? "#c8e6c9" : "transparent" }}
              >
                <Avatar sx={{ mr: 1 }}>{contact.avatar}</Avatar>
                <ListItemText primary={contact.name} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <TextField 
            fullWidth 
            label="New Contact" 
            value={newContact} 
            onChange={(e) => setNewContact(e.target.value)}
          />
          <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={addContact}>
            Add Contact
          </Button>
        </Box>
      </Drawer>

      {/* <Paper sx={{ flex: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column", boxShadow: 0 }}>
        {/* <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              {msg.sender === "counselor" && <Avatar sx={{ bgcolor: "#2e7d32", mr: 1 }}>C</Avatar>}
              <Box sx={{ bgcolor: msg.sender === "user" ? "#c8e6c9" : "#e0e0e0", padding: "10px", borderRadius: "10px", maxWidth: "70%", textAlign: msg.sender === "user" ? "right" : "left", boxShadow: 2 }}>
                <ListItemText primary={msg.text} />
              </Box>
              {msg.sender === "user" && <Avatar sx={{ bgcolor: "#1b5e20", ml: 1 }}>U</Avatar>}
            </ListItem>
          ))}
          <div ref={chatEndRef} />
        </List> */}
      
      <Box sx={{ p: 2, bgcolor: "#f1f8e9", boxShadow: "0 -2px 5px rgba(0,0,0,0.1)" }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <TextField 
              fullWidth 
              label="Type a message..." 
              variant="outlined" 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" fullWidth onClick={sendMessage} sx={{ bgcolor: "#2e7d32", color: "white", }}>
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Container>
  );
};

export default ChatPage;
