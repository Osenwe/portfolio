import Link from 'next/link';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';

const BlogCard = ({ post, isDarkMode }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={`rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-700 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20' 
          : 'bg-white hover:shadow-xl shadow-md'
      }`}>
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600">
            {/* Placeholder gradient until you add actual images */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-20">
              {post.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Badge */}
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              isDarkMode 
                ? 'bg-purple-900/50 text-purple-300' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`mb-4 line-clamp-3 flex-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className={`flex flex-wrap gap-4 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Read More Link */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className={`inline-flex items-center font-medium ${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-purple-600 hover:text-purple-700'
            }`}>
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
