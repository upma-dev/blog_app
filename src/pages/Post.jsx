import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../firebase/firebase";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8 rounded-2xl overflow-hidden">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

            {/* Action Buttons for Author */}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500/80 hover:bg-green-500 backdrop-blur-sm"
                    className="text-white"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500/80 hover:bg-red-500 backdrop-blur-sm"
                  onClick={deletePost}
                  className="text-white"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-slate-400 mb-8 pb-8 border-b border-slate-800">
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {new Date(post.$createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                post.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {post.status}
            </span>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none 
                        prose-headings:text-white 
                        prose-p:text-slate-300 
                        prose-a:text-accent-400 
                        prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white
                        prose-code:text-accent-400
                        prose-code:bg-slate-800/50 prose-code:rounded prose-code:px-2 prose-code:py-0.5
                        prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700"
          >
            {parse(post.content)}
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </article>
      </Container>
    </div>
  ) : (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400">Loading post...</p>
      </div>
    </div>
  );
}
