import { useState } from "react";
import axios from "axios";
import { Listbox } from "@headlessui/react";
import { AiOutlineCamera, AiOutlineSmile, AiOutlineVideoCamera } from "react-icons/ai";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [access, setAccess] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [photos, setPhotos] = useState([]);  // Change to array
  const [video, setVideo] = useState(null);

  const accessOptions = ["public", "private"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("access", access);
    photos.forEach(photo => formData.append("photos", photo));  // Append all photos
    if (video) formData.append("video", video);

    try {
      console.log(formData)
      const response = await axios.post(
        "http://localhost:9090/api/post/createPost",
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Post created:", response.data);
      setContent("");
      setAccess("public");
      setPhotos([]);
      setVideo(null);
      setError("");
      setSuccess("Post created!");
      setShowPicker(false);

      const event = new CustomEvent('postCreated');
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    setPhotos(prevPhotos => [
      ...prevPhotos,
      ...Array.from(e.target.files)
    ]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleEmoji = (emoji) => {
    setContent(content + emoji.native);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg relative">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-[#B48FD9]">Create a Post</h2>

        <div className="flex items-start gap-4 mt-4">
          <div className="w-12 h-12">
            <img
              src="https://github.com/shadcn.png"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="access" className="block text-sm font-medium text-gray-700">Access</label>
            <Listbox value={access} onChange={setAccess}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="block truncate">{access}</span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {accessOptions.map((option, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ selected }) =>
                        `${selected ? "text-blue-900 bg-blue-100" : "text-gray-900"} cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>
                          {option}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        {photos.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mt-2">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <label className="text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2">
                <AiOutlineCamera className="w-6 h-6" />
                <span className="hidden md:inline">Photos</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              <label className="text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2">
                <AiOutlineVideoCamera className="w-6 h-6" />
                <span className="hidden md:inline">Video</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                className="text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2"
                onClick={() => setShowPicker(!showPicker)}
              >
                <AiOutlineSmile className="w-6 h-6" />
                <span className="hidden md:inline">Emoji</span>
              </button>
              {showPicker && (
                <div className="absolute top-0 right-20 p-4">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmoji}
                    emojiSize={20}
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className={`w-full px-4 py-2 rounded-md transition-colors ${isSubmitting ? "bg-gray-400" : "bg-[#BFB26F] hover:bg-[#B48FD9]"} text-white`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "New Post"}
          </button>
        </div>
      </form>

     
    </div>
  );
};

export default AddPost;
