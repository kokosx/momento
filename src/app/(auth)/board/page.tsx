import models from "../../../models";
import { createSupaClient } from "../../../supabase/server";
import PostCard from "../../../components/PostCard";
import { getSession } from "../../../auth";

const page = async () => {
  const s = await getSession();
  const posts = await models.post.getNewestPosts(10, s!.user.id);
  const client = await createSupaClient();
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} client={client} post={post} />
        ))}
      </div>
    </div>
  );
};

export default page;
