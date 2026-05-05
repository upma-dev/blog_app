import React, { useEffect, useState } from "react";
import appwriteService from "../firebase/firebase";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((data) => {
        if (data && data.documents) {
          setPosts(data.documents);
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4">
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="glass-dark rounded-2xl p-12 border border-slate-700/50">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Welcome to <span className="text-gradient">12MegaBlog</span>
              </h1>
              <p className="text-slate-400 text-lg mb-6 max-w-md">
                Login to read posts and discover amazing stories from our
                community.
              </p>
              <a
                href="/login"
                className="inline-block px-8 py-3 bg-gradient-to-r from-accent-600 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-gradient">Posts</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover the latest stories and insights from our community
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <div
              // Use $id (Appwrite convention) or slug as key - both are unique
              key={post.$id || post.slug || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
