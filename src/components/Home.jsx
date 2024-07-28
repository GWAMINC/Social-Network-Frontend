import React from "react";
import Navbar from "@/components/shared/Navbar.jsx";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlineSmile, AiOutlineUser, AiOutlineGroup, AiOutlineComment } from 'react-icons/ai';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="bg-[#F7F7F7] w-full h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-3 px-4">
                <header className="text-center py-16">
                    <h1 className="text-4xl font-bold text-[#B48FD9]">
                        Welcome to <span className="text-[#BFB26F]">KitKat</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        Àn nhoong
                    </p>
                </header>
                
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <div className="mt-4 space-y-4">
            {/* Latest Posts moved inside Shortcuts */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-[#B48FD9]">Latest Posts</h2>
                                <p className="text-gray-600 mt-4">
                                    Check out the latest posts from your friends and stay updated with what's happening.
                                </p>
                        </div>
                            <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                                Home
                            </button>
                            <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                                Friends
                            </button>
                            <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                                Groups
                            </button>
                            <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                                Favourites
                            </button>
                            <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                                Saved
                            </button>
                        </div>
                    </div>

            {/* Create a Post */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-[#B48FD9]">Create a Post</h2>
                        <div className="flex items-start gap-4 mt-4">
                            <div className="w-12 h-12">
                                <img
                                    src="https://github.com/shadcn.png" 
                                    alt="User Avatar"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <textarea
                                placeholder="What's on your mind?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#B48FD9] text-gray-700"
                                rows="3"
                            ></textarea>
                        </div>
                    <div className="mt-4 border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-4">
                                    <button className="text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2">
                                        <AiOutlineCamera className="w-6 h-6" />
                                        <span className="hidden md:inline">Photo</span>
                                    </button>
                                    <button className="text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2">
                                        <AiOutlineVideoCamera className="w-6 h-6" />
                                        <span className="hidden md:inline">Video</span>
                                    </button>
                                    <button className="text-[#B48FD9] hover:text-[#BFB26F] transition-colors flex items-center gap-2">
                                        <AiOutlineSmile className="w-6 h-6" />
                                        <span className="hidden md:inline">Feeling</span>
                                    </button>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 bg-[#BFB26F] text-white rounded-md hover:bg-[#B48FD9] transition-colors">
                                New Post
                            </button>
                        </div>
                    </div>
                    {/* Latest Activity and Active Friends */}
                    <div className="space-y-8 md:space-y-0 md:flex md:gap-8">
                        {/* Latest Activity */}
                        <div className="p-6 bg-white shadow-lg rounded-lg flex-1">
                            <h2 className="text-2xl font-semibold text-[#B48FD9]">Latest Activity</h2>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-2">
                                    <AiOutlineUser className="w-6 h-6 text-[#B48FD9]" />
                                    <p className="text-gray-600">
                                        You have a new friend request from John Doe.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AiOutlineGroup className="w-6 h-6 text-[#B48FD9]" />
                                    <p className="text-gray-600">
                                        Group invitation from the 'Developers' group.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AiOutlineComment className="w-6 h-6 text-[#B48FD9]" />
                                    <p className="text-gray-600">
                                        New comment on your post by Jane Smith.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Active Friends */}
                        <div className="p-6 bg-white shadow-lg rounded-lg flex-1">
                            <h2 className="text-2xl font-semibold text-[#B48FD9]">Active Friends</h2>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://github.com/shadcn.png"
                                        alt="Friend Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p className="text-gray-600">John Doe is online</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://github.com/shadcn.png"
                                        alt="Friend Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p className="text-gray-600">Jane Smith is online</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://github.com/shadcn.png"
                                        alt="Friend Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <p className="text-gray-600">Alex Johnson is online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                                {/* Posts */}
                                <section className="mt-8">
                    <div className="space-y-8">
                        {/* Post Example */}
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12">
                                    <img
                                        src="https://github.com/shadcn.png"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <div className="text-lg font-semibold text-[#B48FD9]">John Doe</div>
                                    <p className="text-gray-600 mt-2">
                                        This is a sample status update. Feel free to add your thoughts here!
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src="https://via.placeholder.com/600x400"
                                            alt="Post Media"
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-gray-200 pt-4">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors">
                                        <FaThumbsUp className="w-5 h-5" />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors">
                                        <FaComment className="w-5 h-5" />
                                        <span>Comment</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors">
                                        <FaShare className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Another Post Example */}
                        <div className="p-6 bg-white shadow-lg rounded-lg">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12">
                                    <img
                                        src="https://github.com/shadcn.png"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <div className="text-lg font-semibold text-[#B48FD9]">Jane Smith</div>
                                    <p className="text-gray-600 mt-2">
                                        Had a great day at the beach! 🌴🏖️
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src="https://via.placeholder.com/600x400"
                                            alt="Post Media"
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-gray-200 pt-4">
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors">
                                        <FaThumbsUp className="w-5 h-5" />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors">
                                        <FaComment className="w-5 h-5" />
                                        <span>Comment</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[#B48FD9] hover:text-[#BFB26F] transition-colors">
                                        <FaShare className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Groups Section */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-[#B48FD9]">Your Groups</h2>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Group 1</span>
                                <button className="text-[#B48FD9] hover:text-[#BFB26F]">View</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Group 2</span>
                                <button className="text-[#B48FD9] hover:text-[#BFB26F]">View</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Group 3</span>
                                <button className="text-[#B48FD9] hover:text-[#BFB26F]">View</button>
                            </div>
                        </div>
                    </div>

                    {/* Pages Section */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-[#B48FD9]">Your Pages</h2>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Page 1</span>
                                <button className="text-[#B48FD9] hover:text-[#BFB26F]">View</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Page 2</span>
                                <button className="text-[#B48FD9] hover:text-[#BFB26F]">View</button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Page 3</span>
                                <button className="text-[#B48FD9] hover:text-[#BFB26F]">View</button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <footer className="text-center mt-16 py-6 border-t border-gray-300">
                    <p className="text-gray-600">
                        &copy; 2024 KitKat. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Home;
