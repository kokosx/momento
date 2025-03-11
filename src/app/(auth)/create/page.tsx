"use client";

import ImagePicker from "@/components/ImagePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createPost } from "@/actions/posts";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const Page = () => {
  const { execute } = useAction(createPost);
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: undefined,
    },
  });

  useEffect(() => {
    if (image) {
      form.setValue("image", image);
    }
  }, [image, form]);

  console.log(form.formState.errors);
  const onSubmit = (values: CreatePostSchema) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    execute(formData);
  };

  return (
    <div className="mx-auto w-full">
      <div className="w-1/2 mx-auto mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ImagePicker setImage={setImage} />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="Title"
                      placeholder="My trip to the park"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A description..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">Add</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
