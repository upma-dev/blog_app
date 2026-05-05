import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../firebase/firebase";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All <span className="text-gradient">Posts</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Browse through all the posts in our blog
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.$id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="glass-dark rounded-2xl p-8 border border-slate-700/50 text-center">
              <p className="text-slate-400 text-lg">No posts available yet.</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
