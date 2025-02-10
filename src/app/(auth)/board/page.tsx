import Image from "next/image";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import models from "../../../models";
import { createSupaClient } from "../../../supabase/server";

const page = async () => {
  const posts = await models.post.getNewestPosts(10);
  const client = await createSupaClient();
  return (
    <div className="flex flex-col items-center mt-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-[#121212] rounded-xl p-4 flex gap-x-4">
          <Image
            className="rounded-md"
            src={
              client.storage.from("files").getPublicUrl(post.image!).data
                .publicUrl
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
              <div className="flex">
                <FilledHeartIcon className="h-6 w-6 text-red-500" />
                <span>10k</span>
              </div>
              <div className="flex">
                <DocumentTextIcon className="h-6 w-6" />
                <span>529</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-[#121212] rounded-xl p-4 flex gap-x-4">
        <Image
          className="rounded-md"
          src="/brda.jpg"
          alt="brda"
          height={300}
          width={500}
        />
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xxl font-semibold">Brda w Bydgoszczy</h3>
            <p className="w-[200px]">
              Melina w chuj Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Perferendis, corporis.
            </p>
          </div>

          <div className="flex gap-x-2">
            <div className="flex">
              <FilledHeartIcon className="h-6 w-6 text-red-500" />
              <span>10k</span>
            </div>
            <div className="flex">
              <DocumentTextIcon className="h-6 w-6" />
              <span>529</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
