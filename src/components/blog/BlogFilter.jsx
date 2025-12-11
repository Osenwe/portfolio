import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const BlogFilter = ({ 
  categories, 
  tags, 
  selectedCategory, 
  selectedTag, 
  searchQuery,
  onCategoryChange,
  onTagChange,
  onSearchChange,
  isDarkMode 
}) => {
  return (
    <div className={`rounded-lg shadow-md p-6 mb-8 ${
      isDarkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <div className="md:col-span-3">
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Search Posts
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, content, or tags..."
              className={`w-full px-4 py-2 pl-10 rounded-md border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Tag
          </label>
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery !== '') && (
          <div className="flex items-end">
            <button
              onClick={() => {
                onCategoryChange('all');
                onTagChange('all');
                onSearchChange('');
              }}
              className={`w-full px-4 py-2 rounded-md transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogFilter;
