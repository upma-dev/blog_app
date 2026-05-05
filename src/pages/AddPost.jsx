import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Create <span className="text-gradient">New Post</span>
          </h1>
          <p className="text-slate-400">Share your story with the world</p>
        </div>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
