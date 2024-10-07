import { useEffect, useState } from "react";
import customAxios from "../config/customAxios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Categories from "./Categories";

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditePostId] = useState(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const [cateories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const editHandler = (post) => {
    if (post.id === editPostId) {
      setEditePostId(null);
      setEditPostContent("");
      setEditPostTitle("");
      setSelectedCategories([]);
    } else {
      setEditePostId(post.id);
      setEditPostTitle(post.title.rendered);
      setEditPostContent(post.content.rendered);
      setSelectedCategories(post.categories);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await customAxios.delete(`wp/v2/posts/${postId}`);
      if (response.status === 200) {
        console.log("پست با موفقیت حذف شد");
        setPosts(posts.filter((post) => post.id !== postId));

        // getDataPost();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.post(`wp/v2/posts/${editPostId}`, {
        title: editPostTitle,
        content: editPostContent,
        categories: selectedCategories,
      });

      if (response.status === 200) {
        setPosts(
          posts.map((post) =>
            post.id === editPostId
              ? {
                  ...post,
                  title: { rendered: editPostTitle },
                  content: { rendered: editPostContent },
                  categories: selectedCategories,
                }
              : post
          )
        );
        setEditePostId(null);
        setEditPostTitle("");
        setEditPostContent("");
        setSelectedCategories([]);

        // const responseCategories = await customAxios.get(
        //   "wp/v2/categories?per_page=100"
        // );
        setCategories(responseCategories.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getDataPost = async () => {
      try {
        const response = await customAxios.get("wp/v2/posts");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await customAxios.get("wp/v2/categories?per_page=100");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    getDataPost();
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => {
          const postCategoreis = post?.categories.map((catId) =>
            cateories.find((cat) => cat.id === catId)
          );

          return (
            <div key={post.id}>
              <li className="p-2 py-4">
                <div className="flex justify-between items-centers">
                  <h2 className="text-lg">{post.title.rendered}</h2>

                  <div className="flex">
                    {postCategoreis.map((cat) => {
                      return (
                        <h3
                          key={cat?.id}
                          className="mr-12 text-sm text-gray-400"
                        >
                          {cat?.name}
                        </h3>
                      );
                    })}
                  </div>
                  <div className="flex">
                    <MdOutlineDeleteOutline
                      className="ml-6 text-2xl text-red-400 cursor-pointer"
                      onClick={() => handleDeletePost(post.id)}
                    />
                    <CiEdit
                      className="ml-6 text-2xl text-blue-400 cursor-pointer"
                      onClick={() => editHandler(post)}
                    />
                  </div>
                </div>

                {editPostId === post.id && (
                  <div className=" bg-slate-100 shadow-lg flex">
                    <form className="mt-4 p-4 w-2/3" onSubmit={submitHandler}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          موضوع
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editPostTitle}
                          onChange={(e) => setEditPostTitle(e.target.value)}
                          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          محتوا
                        </label>
                        <textarea
                          name="content"
                          value={editPostContent}
                          onChange={(e) => setEditPostContent(e.target.value)}
                          rows="4"
                          className="h-40 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          ویرایش محتوا
                        </button>
                      </div>
                    </form>
                    <div className="m-10 w-1/3 h-72 overflow-y-auto bg-gray-50 p-4 shadow-lg">
                      {/* اینجا لیست کتگوری ها قرار میگیرد */}
                      <Categories
                        categories={cateories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                      />
                    </div>
                  </div>
                )}
              </li>
              <div />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default ListPost;
