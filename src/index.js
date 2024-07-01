const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Replace with your Instagram Graph API access token
const ACCESS_TOKEN = "YOUR_INSTAGRAM_ACCESS_TOKEN";

app.use(express.json());

app.post("/get-comments", async (req, res) => {
  const { instagramPostId } = req.body;

  if (!instagramPostId) {
    return res.status(400).json({ error: "Instagram Post ID is required" });
  }

  try {
    const response = await axios.get(
      `https://graph.instagram.com/${instagramPostId}`,
      {
        params: {
          fields: "comments_count",
          access_token: ACCESS_TOKEN,
        },
      }
    );

    const data = response.data;

    if (data && data.comments_count !== undefined) {
      return res.json({ commentCount: data.comments_count });
    } else {
      return res.status(404).json({ error: "Unable to find comment count" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch the Instagram post" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("<div>Hello to instagram api!<div>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
