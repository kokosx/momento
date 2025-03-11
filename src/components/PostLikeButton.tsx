import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";

const PostLikeButton = () => {
  return (
    <div className="flex">
      <FilledHeartIcon className="h-6 w-6 text-red-500" />
      <span>10k</span>
    </div>
  );
};

export default PostLikeButton;
