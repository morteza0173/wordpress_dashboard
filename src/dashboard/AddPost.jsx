import { useEffect, useState } from "react";
import customAxios from "../config/customAxios";
import Categories from "./Categories";

const AddPost = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await customAxios.get("wp/v2/categories?per_page=100");
      if (response.status === 200) {
        setCategories(response.data);
      }
    };

    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    const updatedValue = {
      ...value,
      status: "publish",
      categories: selectedCategories,
    };
    try {
      const response = await customAxios.post("wp/v2/posts", updatedValue);
      if (response.status) {
        console.log("پست با موفقیت ایجاد شد");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10  bg-slate-100 shadow-md p-4 flex">
      <form onSubmit={handleSubmit} className="p-8 w-2/3">
        <h1 className="text-2xl font-semibold mb-4">افزودن پست جدید</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-8">
            موضوع
          </label>
          <input
            type="text"
            name="title"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            محتوا
          </label>
          <textarea
            name="content"
            rows="4"
            className="h-60 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            افزودن پست
          </button>
        </div>
      </form>
      <div className="w-1/3">
        <Categories
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </div>
  );
};

export default AddPost;
