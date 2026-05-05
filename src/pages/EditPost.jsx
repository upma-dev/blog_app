import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPosts(post);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Edit <span className="text-gradient">Post</span>
          </h1>
          <p className="text-slate-400">Update your post</p>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
