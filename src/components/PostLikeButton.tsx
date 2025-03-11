"use client";

import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useOptimisticAction, useAction } from "next-safe-action/hooks";
import { likePost, unlikePost } from "../actions/posts";

type Props = {
  count: number;
  initiallyLiked: boolean;
  postId: number;
};

const PostLikeButton = ({ count, initiallyLiked }: Props) => {
  const { execute: executeLike } = useAction(likePost);
  const { execute: executeUnlike } = useAction(unlikePost);
  const [liked, setLiked] = useState(initiallyLiked);
  const [likedCount, setLikedCount] = useState(count);

  const handleLike = () => {
    executeLike({ postId: 1 });
    setLiked(true);
    setLikedCount(likedCount + 1);
  };

  const handleUnlike = () => {
    executeUnlike({ postId: 1 });
    setLiked(false);
    setLikedCount(likedCount - 1);
  };

  const handleClick = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  return (
    <div className="flex">
      <button onClick={handleClick}>
        {liked ? (
          <FilledHeartIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIcon className="h-6 w-6" />
        )}
      </button>

      <span>{likedCount}</span>
    </div>
  );
};

export default PostLikeButton;
