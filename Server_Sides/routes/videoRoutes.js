const express = require("express");
const router = express.Router();
const upload = require("../authMiddleware/upload");
const User = require("../modals/userModal");


router.post("/:userId", upload.single("video"), async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, tags } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const videoData = {
      title,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], 
      fileSize: req.file.size,
      filename: req.file.filename,
      path: req.file.path,
    };

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.videos.push(videoData);
    await user.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: videoData,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
