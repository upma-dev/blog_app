import appwriteService from "../firebase/firebase";
import { Link } from "react-router-dom";

function PostCard(props) {
  // Destructure all props - could have $id, slug, or other fields
  const { $id, slug, title, featuredImage } = props;

  // Use $id for routing if available, otherwise use slug, otherwise use _id
  // Fall back to any available identifier
  const postId = $id || slug || props._id;

  // Skip rendering if no identifier (data might be loading)
  if (!postId) {
    console.warn("PostCard: No post identifier available", props);
    return null;
  }

  return (
    <Link to={`/post/${postId}`} className="group">
      <div className="card-modern overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-semibold text-slate-100 group-hover:text-accent-400 transition-colors duration-300 line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
