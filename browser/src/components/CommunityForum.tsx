'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'memes' | 'literature' | 'tech';
  timestamp: string;
  likes: number;
  comments: Comment[];
  image?: string;
  tags: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function CommunityForum() {
  const [activeCategory, setActiveCategory] = useState<'memes' | 'literature' | 'tech'>('memes');
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'తెలుగు మీమ్ - ఇంటర్నెట్ స్పీడ్ 😄',
      content: 'ఇంటర్నెట్ స్పీడ్ చాలా నెమ్మదిగా ఉన్నప్పుడు మన భావనలు... ఎప్పుడు ఇంటర్నెట్ వేగవంతంగా వస్తుందో ఎవరికి తెలుసు! 😅',
      author: 'మీమ్_మాస్టర్',
      category: 'memes',
      timestamp: '2 hours ago',
      likes: 45,
      comments: [
        { id: '1', author: 'టెక్_గురు', content: 'ఇది చాలా హాస్యంగా ఉంది! 😂', timestamp: '1 hour ago', likes: 5 },
        { id: '2', author: 'సినిమా_ఫ్యాన్', content: 'నిజమే, ఇప్పుడు ఎప్పుడు ఫాస్ట్ ఇంటర్నెట్ వస్తుందో!', timestamp: '30 min ago', likes: 3 }
      ],
      image: '😄',
      tags: ['ఇంటర్నెట్', 'మీమ్', 'హాస్యం']
    },
    {
      id: '2',
      title: 'కవిత - డిజిటల్ యుగం',
      content: 'కంప్యూటర్‌లో టైప్ చేస్తున్న కవిత్వం... డిజిటల్ యుగంలో కవిత్వం ఎలా మారిందో చూడండి. ఈ కవిత నా అనుభవాలను వివరిస్తుంది.',
      author: 'కవి_కృష్ణ',
      category: 'literature',
      timestamp: '5 hours ago',
      likes: 23,
      comments: [
        { id: '3', author: 'సాహిత్య_ప్రియుడు', content: 'చాలా అందంగా రాశారు! 👏', timestamp: '4 hours ago', likes: 8 },
        { id: '4', author: 'కవిత_లవుడు', content: 'డిజిటల్ యుగంలో కవిత్వం ఎలా మారిందో చాలా బాగా వివరించారు.', timestamp: '3 hours ago', likes: 6 }
      ],
      tags: ['కవిత్వం', 'డిజిటల్', 'సాహిత్యం']
    },
    {
      id: '3',
      title: 'AI తెలుగు భాషలో ఎలా పనిచేస్తుంది?',
      content: 'కృత్రిమ మేధస్సు తెలుగు భాషను ఎలా అర్థం చేసుకుంటుంది? ఈ పోస్ట్‌లో AI తెలుగు భాషను ఎలా ప్రాసెస్ చేస్తుందో వివరిస్తాను. భవిష్యత్తులో తెలుగు AI ఎలా ఉంటుందో చూడండి.',
      author: 'టెక్_గురు',
      category: 'tech',
      timestamp: '1 day ago',
      likes: 67,
      comments: [
        { id: '5', author: 'AI_అధ్యయనుడు', content: 'చాలా ఉపయోగకరమైన సమాచారం!', timestamp: '23 hours ago', likes: 12 },
        { id: '6', author: 'భాషా_విజ్ఞాని', content: 'తెలుగు భాషకు AI ఎలా ఉపయోగపడుతుందో చాలా బాగా వివరించారు.', timestamp: '22 hours ago', likes: 9 }
      ],
      tags: ['AI', 'తెలుగు', 'టెక్నాలజీ', 'భాష']
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'memes' as 'memes' | 'literature' | 'tech',
    tags: ''
  });

  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const [newComment, setNewComment] = useState('');

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'మీరు (You)',
      category: newPost.category,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'memes', tags: '' });
    setShowNewPostForm(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleCommentLike = (postId: string, commentId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: post.comments.map(comment =>
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        )
      } : post
    ));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'మీరు (You)',
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ));
    setNewComment('');
  };

  const filteredPosts = posts.filter(post => post.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'memes': return '😄';
      case 'literature': return '📖';
      case 'tech': return '💻';
      default: return '📝';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'memes': return 'మీమ్స్ (Memes)';
      case 'literature': return 'సాహిత్యం (Literature)';
      case 'tech': return 'టెక్ (Tech)';
      default: return 'ఇతరం (Other)';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'memes': return 'bg-yellow-100 text-yellow-700';
      case 'literature': return 'bg-purple-100 text-purple-700';
      case 'tech': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">తెలుగు సమాజం (Telugu Community)</h2>
        <motion.button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showNewPostForm ? '✕ మూసివేయి' : '+ కొత్త పోస్ట్'}
        </motion.button>
      </div>

      {/* New Post Form */}
      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-4 mb-6 overflow-hidden"
          >
            <h3 className="font-semibold text-gray-800 mb-3">కొత్త పోస్ట్ (New Post)</h3>
            <form onSubmit={handleSubmitPost} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="పోస్ట్ శీర్షిక (Post title)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="మీ పోస్ట్ విషయం (Post content)..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value as 'memes' | 'literature' | 'tech' })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="memes">మీమ్స్ (Memes)</option>
                  <option value="literature">సాహిత్యం (Literature)</option>
                  <option value="tech">టెక్ (Tech)</option>
                </select>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="ట్యాగ్‌లు (Tags) - కామాలతో వేరు చేయండి"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <motion.button
                  type="submit"
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  పోస్ట్ చేయండి (Post)
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6">
        {(['memes', 'literature', 'tech'] as const).map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              activeCategory === category 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-gray-600 hover:text-orange-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{getCategoryIcon(category)}</span>
            <span>{getCategoryName(category)}</span>
          </motion.button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div 
            key={post.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {getCategoryName(post.category)}
              </span>
            </div>

            <h4 className="font-semibold text-lg text-gray-800 mb-2">{post.title}</h4>
            
            {post.image && (
              <div className="text-center text-4xl mb-3">{post.image}</div>
            )}
            
            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Comments Preview */}
            {post.comments.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h5 className="font-medium text-gray-800 mb-2">వ్యాఖ్యలు (Comments)</h5>
                <div className="space-y-2">
                  {post.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-semibold">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{comment.author}</p>
                        <p className="text-sm text-gray-600">{comment.content}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          <button 
                            onClick={() => handleCommentLike(post.id, comment.id)}
                            className="text-xs text-gray-500 hover:text-blue-600 flex items-center space-x-1"
                          >
                            <span>👍</span>
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {post.comments.length > 2 && (
                    <p className="text-sm text-gray-500 text-center">
                      మరో {post.comments.length - 2} వ్యాఖ్యలు (and {post.comments.length - 2} more comments)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Add Comment */}
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="వ్యాఖ్య రాయండి... (Write a comment...)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <motion.button
                onClick={() => handleAddComment(post.id)}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                వ్యాఖ్య (Comment)
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>👍</span>
                  <span>{post.likes}</span>
                </motion.button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <span>💬</span>
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                  <span>📤</span>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-8 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>ఈ వర్గంలో ఇంకా పోస్ట్‌లు లేవు (No posts in this category yet)</p>
            <p className="text-sm">మొదటి పోస్ట్‌ను మీరు చేయండి! (Be the first to post!)</p>
          </motion.div>
        )}
      </div>

      {/* Community Stats */}
      <motion.div 
        className="mt-8 bg-orange-50 rounded-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-semibold text-orange-800 mb-3">సమాజ గణాంకాలు (Community Stats)</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{posts.length}</div>
            <div className="text-sm text-orange-700">మొత్తం పోస్ట్‌లు (Total Posts)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {posts.reduce((sum, post) => sum + post.likes, 0)}
            </div>
            <div className="text-sm text-orange-700">మొత్తం లైక్‌లు (Total Likes)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {posts.reduce((sum, post) => sum + post.comments.length, 0)}
            </div>
            <div className="text-sm text-orange-700">మొత్తం వ్యాఖ్యలు (Total Comments)</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 