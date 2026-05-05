import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../firebase/firebase";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("content", data.content);
    formData.append("status", data.status);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    if (post) {
      // Update existing post
      const dbPost = await appwriteService.updatePost(post.slug, formData);
      if (dbPost) {
        navigate(`/post/${dbPost.slug}`);
      }
    } else {
      // Create new post
      const dbPost = await appwriteService.createPost(formData);
      if (dbPost) {
        navigate(`/post/${dbPost.slug}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row gap-6"
    >
      {/* Main Content Column */}
      <div className="flex-1 space-y-6">
        <Input
          label="Title"
          placeholder="Enter post title"
          className="bg-slate-800/50"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Post slug (URL-friendly)"
          className="bg-slate-800/50"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <div className="glass-dark rounded-xl p-4 border border-slate-700/50">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* Sidebar Column */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="glass-dark rounded-xl p-6 border border-slate-700/50 space-y-6 sticky top-24">
          {/* Featured Image Upload */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">
              Featured Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-slate-100 outline-none focus:ring-2 focus:ring-accent-500/50 border border-slate-700/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent-600 file:text-white file:font-semibold hover:file:bg-accent-500 transition-colors cursor-pointer"
                {...register("image", { required: !post })}
              />
            </div>
            {post && post.featuredImage && (
              <div className="mt-4 relative rounded-xl overflow-hidden">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm">Current Image</span>
                </div>
              </div>
            )}
          </div>

          {/* Status Select */}
          <Select
            options={["active", "inactive"]}
            label="Status"
            {...register("status", { required: true })}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            bgColor={
              post ? "bg-gradient-to-r from-green-600 to-green-500" : undefined
            }
            className="w-full"
          >
            {post ? "Update Post" : "Publish Post"}
          </Button>

          {/* Cancel Link */}
          {post && (
            <button
              type="button"
              onClick={() => navigate(`/post/${post.slug}`)}
              className="w-full py-3 text-slate-400 hover:text-slate-300 text-center transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
