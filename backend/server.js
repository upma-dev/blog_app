import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/12megablog";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key_123";

// ==================== MODELS ====================

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Post Model
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  featuredImage: { type: String, default: "" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// ==================== HELPER FUNCTIONS ====================

// Transform MongoDB _id to $id for frontend compatibility (Appwrite convention)
const transformToAppwrite = (doc) => {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.$id = obj._id.toString();
  obj.$createdAt = obj.createdAt;
  obj.$updatedAt = obj.updatedAt;
  delete obj._id;
  return obj;
};

// Transform array of documents
const transformArray = (docs) => docs.map(transformToAppwrite);

// ==================== MULTER SETUP ====================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ==================== MIDDLEWARE ====================

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ==================== AUTH ROUTES ====================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { $id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { $id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Current User
app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ $id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout (Client-side token removal, just acknowledge)
app.post("/api/auth/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// ==================== POST ROUTES ====================

// Get All Posts
app.get("/api/posts", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const posts = await Post.find(filter)
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    // Transform MongoDB documents to Appwrite format
    res.json({ documents: transformArray(posts) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Post (by slug OR by id)
app.get("/api/posts/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    // Try to find by slug first, then by _id
    let post = await Post.findOne({ slug: identifier }).populate(
      "userId",
      "name",
    );
    if (!post) {
      try {
        post = await Post.findById(identifier).populate("userId", "name");
      } catch (e) {
        // Ignore ObjectId validation errors
      }
    }
    if (!post) return res.status(404).json({ message: "Post not found" });
    // Transform MongoDB document to Appwrite format
    res.json(transformToAppwrite(post));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Post
app.post(
  "/api/posts",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, slug, content, status } = req.body;
      const featuredImage = req.file ? `/uploads/${req.file.filename}` : "";

      const post = await Post.create({
        title,
        slug,
        content,
        featuredImage,
        status: status || "active",
        userId: req.userId,
      });

      // Transform MongoDB document to Appwrite format
      res.status(201).json(transformToAppwrite(post));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// Update Post
app.put(
  "/api/posts/:slug",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug });
      if (!post) return res.status(404).json({ message: "Post not found" });

      if (post.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const { title, content, status } = req.body;
      post.title = title || post.title;
      post.content = content || post.content;
      post.status = status || post.status;
      post.updatedAt = Date.now();

      if (req.file) {
        post.featuredImage = `/uploads/${req.file.filename}`;
      }

      await post.save();
      // Transform MongoDB document to Appwrite format
      res.json(transformToAppwrite(post));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
);

// Delete Post (by slug OR by id)
app.delete("/api/posts/:identifier", verifyToken, async (req, res) => {
  try {
    const { identifier } = req.params;
    // Try to find by slug first, then by _id
    let post = await Post.findOne({ slug: identifier });
    if (!post) {
      try {
        post = await Post.findById(identifier);
      } catch (e) {
        // Ignore ObjectId validation errors
      }
    }
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==================== SERVER ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
