const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper to get token
const getToken = () => localStorage.getItem("token");

// Helper for headers
const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// ==================== AUTH API ====================

export const authAPI = {
  // Register new user
  register: async ({ name, email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    if (data.token) localStorage.setItem("token", data.token);
    return data;
  },

  // Login user
  login: async ({ email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    if (data.token) localStorage.setItem("token", data.token);
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem("token");
    return { message: "Logged out" };
  },
};

// ==================== POSTS API ====================

export const postsAPI = {
  // Get all posts
  getPosts: async (queries = []) => {
    const res = await fetch(`${API_URL}/api/posts`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  // Get single post by slug
  getPost: async (slug) => {
    const res = await fetch(`${API_URL}/api/posts/${slug}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  // Create post
  createPost: async (formData) => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_URL}/api/posts`, {
      method: "POST",
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  // Update post
  updatePost: async (slug, formData) => {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_URL}/api/posts/${slug}`, {
      method: "PUT",
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  // Delete post
  deletePost: async (slug) => {
    const res = await fetch(`${API_URL}/api/posts/${slug}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },
};

// ==================== FILE API ====================

export const fileAPI = {
  // Get file preview URL
  getFilePreview: (fileId) => {
    if (!fileId) return "";
    // If it's already a full URL, return it
    if (fileId.startsWith("http")) return fileId;
    // Otherwise, prepend the API URL
    return `${API_URL}${fileId}`;
  },
};

export default { authAPI, postsAPI, fileAPI };
