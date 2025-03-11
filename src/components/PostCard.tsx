import { DocumentTextIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import React from "react";
import models from "../models";
import { createSupaClient } from "../supabase/server";
import PostLikeButton from "./PostLikeButton";

type Props = {
  post: Awaited<ReturnType<(typeof models)["post"]["getNewestPosts"]>>[0];
  client: Awaited<ReturnType<typeof createSupaClient>>;
};

const PostCard = ({ post, client }: Props) => {
  return (
    <div key={post.id} className="bg-[#121212] rounded-xl p-4 flex gap-x-4">
      <Image
        className="rounded-md"
        src={
          client.storage.from("files").getPublicUrl(post.image!).data.publicUrl
        }
        alt="brda"
        height={300}
        width={500}
      />
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-xxl font-semibold">{post.title}</h3>
          <p className="w-[200px]">{post.content}</p>
        </div>

        <div className="flex gap-x-2">
          <PostLikeButton
            postId={post.id}
            initiallyLiked={post.didUserInitiallyLike}
            count={post.like_count}
          />
          <div className="flex">
            <DocumentTextIcon className="h-6 w-6" />
            <span>529</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
