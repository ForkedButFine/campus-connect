import { useState } from 'react';
import { Navbar } from './Navbar';
import { Heart, MessageCircle, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostsProps {
  currentUser: any;
  posts: any[];
  setPosts: (posts: any[]) => void;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Posts({ currentUser, posts, setPosts, onNavigate, onLogout }: PostsProps) {
  const [newPost, setNewPost] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  const handleCreatePost = () => {
    if (newPost.trim() || newPostImage.trim()) {
      const post = {
        id: posts.length + 1,
        author: currentUser.name,
        authorId: currentUser.id,
        content: newPost,
        image: newPostImage,
        likes: 0,
        likedBy: [],
        comments: [],
        timestamp: new Date().toISOString()
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewPostImage('');
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const alreadyLiked = post.likedBy.includes(currentUser.id);
        return {
          ...post,
          likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
          likedBy: alreadyLiked 
            ? post.likedBy.filter((id: number) => id !== currentUser.id)
            : [...post.likedBy, currentUser.id]
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number, commentText: string) => {
    if (commentText.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { author: currentUser.name, text: commentText, timestamp: new Date().toISOString() }]
          };
        }
        return post;
      }));
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl mb-4">Create a Post</h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 h-24"
            />
            <div className="mb-3">
              <label className="flex items-center gap-2 text-gray-600 mb-2">
                <ImageIcon size={20} />
                Add Image URL (optional)
              </label>
              <input
                type="text"
                value={newPostImage}
                onChange={(e) => setNewPostImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={handleCreatePost}
              className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-lg transition"
            >
              Post
            </button>
          </div>

          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDeletePost}
            />
          ))}

          {posts.length === 0 && (
            <div className="bg-white p-12 rounded-lg shadow-lg text-center text-gray-500">
              <p>No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, currentUser, onLike, onComment, onDelete }: any) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = () => {
    onComment(post.id, commentText);
    setCommentText('');
  };

  const isLiked = post.likedBy.includes(currentUser.id);
  const canDelete = post.authorId === currentUser.id;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="mb-1">{post.author}</h3>
          <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
        </div>
        {canDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete post"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      
      <p className="mb-4">{post.content}</p>
      
      {post.image && (
        <div className="mb-4">
          <ImageWithFallback 
            src={post.image} 
            alt="Post image" 
            className="w-full rounded-lg max-h-96 object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 ${isLiked ? 'text-pink-600' : 'text-gray-600'} hover:text-pink-600 transition`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition"
        >
          <MessageCircle size={20} />
          <span>{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="border-t pt-4">
          <div className="mb-4">
            {post.comments.map((comment: any, index: number) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="mb-1">{comment.author}</p>
                <p className="text-sm text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              placeholder="Write a comment..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSubmitComment}
              className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded transition"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
