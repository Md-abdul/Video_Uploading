import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const VideoDisplayPage = () => {
  const { user } = useUser();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3030/api/videos/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch videos");
        }

        setVideos(data);
        setFilteredVideos(data);
        
       
        const tags = [...new Set(data.flatMap(video => video.tags))];
        setAllTags(tags);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user]);

  useEffect(() => {
    let results = [...videos];

   
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(video => 
        video.title.toLowerCase().includes(term) || 
        video.description.toLowerCase().includes(term)
      );
    }

  
    if (selectedTags.length > 0) {
      results = results.filter(video =>
        selectedTags.some(tag => video.tags.includes(tag))
      );
    }

    
    switch (sortOption) {
      case "newest":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title-asc":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredVideos(results);
  }, [searchTerm, selectedTags, sortOption, videos]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Videos</h1>
        
       
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Videos
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title or description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedTags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div className="mb-4 text-gray-600">
          Showing {filteredVideos.length} of {videos.length} videos
          {selectedTags.length > 0 && ` (filtered by ${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''})`}
        </div>

      
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">
              {videos.length === 0 
                ? "No videos found. Upload your first video!"
                : "No videos match your search criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h2>
                  <p className="text-gray-600 mb-3">{video.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-xs px-2 py-1 rounded ${
                          selectedTags.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black">
                  <video controls className="w-full h-auto max-h-64">
                    <source src={`http://localhost:3030/${video.path.replace(/\\/g, "/")}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 text-sm text-gray-500">
                  Uploaded: {new Date(video.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDisplayPage;