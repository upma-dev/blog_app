import { postsAPI, fileAPI } from "../api/api.js";

export const Service = {
  createPost: postsAPI.createPost,
  updatePost: postsAPI.updatePost,
  deletePost: postsAPI.deletePost,
  getPost: postsAPI.getPost,
  getPosts: postsAPI.getPosts,
  uploadFile: async (file) => {
    // For now, we'll handle file upload via FormData in the createPost/updatePost
    return { $id: Date.now().toString() };
  },
  deleteFile: async () => true,
  getFilePreview: fileAPI.getFilePreview,
};

export default Service;
