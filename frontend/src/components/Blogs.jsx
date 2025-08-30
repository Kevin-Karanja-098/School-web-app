import React, { useState, } from "react";
import {Select,CardHeader, Card, MenuItem,CardContent, Avatar,  Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Box  } from "@mui/material";

const BlogSection = () => {
  const [topic, setTopic] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      author: "Alice Johnson",
      role: "Mental Health Coach",
      avatar: "A",
      title: "Managing Stress in College",
      description: "Learn simple ways to reduce stress and stay productive.",
      date: "March 29, 2025",
    },
    {
      id: 2,
      author: "Brian Smith",
      role: "Peer Counselor",
      avatar: "B",
      title: "The Power of Mindfulness",
      description: "How mindfulness can improve your mental well-being.",
      date: "March 27, 2025",
    },
  ]);

  const topics = ["Stress Management", "Mental Wellness", "Self-Care", "Anxiety Support"];

  // Open dialog to ask for author's name
  const handlePublishClick = () => {
    if (!blogContent || !topic) return; // Prevent publishing empty blogs
    setOpenDialog(true);
  };

  // Handle publishing after getting author's name
  const handleConfirmPublish = () => {
    if (!authorName) return;

    const newBlog = {
      id: blogs.length + 1,
      author: authorName,
      role: "Peer Counselor",
      avatar: authorName[0].toUpperCase(),
      title: topic,
      description: blogContent.substring(0, 80) + "...",
      date: new Date().toLocaleDateString(),
    };

    setBlogs([newBlog, ...blogs]); // Add new blog without losing existing ones
    setOpenDialog(false);
    setBlogContent(""); // Clear content but keep topic
  };

  return (
    <Grid container spacing={4} sx={{ mt: 1, paddingBottom: '60px',paddingTop: "56px" }}>
      {/* Blog Author Form */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            p: 3,
            bgcolor: "#e8f5e9",
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Topic Selection */}
          <Select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ bgcolor: "white", borderRadius: 1 }}
          >
            <MenuItem value="" disabled>Select a Topic</MenuItem>
            {topics.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>

          {/* Blog Content Input */}
          <TextField
            label="Write your blog here..."
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            sx={{ bgcolor: "white", borderRadius: 1 }}
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />

          {/* Publish Button */}
          <Button variant="contained" sx={{ bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" } }} onClick={handlePublishClick}>
            Publish Blog
          </Button>
        </Box>
      </Grid>

      {/* Blog List */}
      <Grid item xs={12} md={8}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Recent Blogs</Typography>
        {blogs.map((blog) => (
          <Card key={blog.id} sx={{ mb: 2, boxShadow: 2 }}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "#2e7d32" }}>{blog.avatar}</Avatar>}
              title={blog.author}
              subheader={blog.role}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{blog.title}</Typography>
              <Typography variant="body2" color="text.secondary">{blog.description}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                {blog.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>

      {/* Dialog to Ask for Author's Name */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            fullWidth
            variant="outlined"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#2e7d32" }} onClick={handleConfirmPublish}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default BlogSection;