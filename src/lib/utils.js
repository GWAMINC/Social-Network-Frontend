import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Convert post data received from getPostById to data for Post component
export async function toPostData(post) {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const userRes = await axios.post(
      `${apiUrl}/user/getProfileById`,
      { userId: post.userId },
      { withCredentials: true }
    );

    const currentUserRes = await axios.get(`${apiUrl}/user/profile`, {
      withCredentials: true,
    });

    const groupRes = await axios.get(
      `${apiUrl}/group/getGroupByPostId/${post._id}`,
      { withCredentials: true }
    );

    return {
      postInfo: post,
      userInfo: userRes.data.user,
      likeCount: post.isLiked.length,
      dislikeCount: post.isDisliked.length,
      user: currentUserRes.data.user._id,
      group: groupRes.data,
    };
  } catch (error) {
    throw new Error("Failed to fetch post data:", error);
  }
}
