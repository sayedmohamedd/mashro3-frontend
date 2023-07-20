import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await Axios.get('http://localhost:3002/api/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, [categories]);

  return (
    <section className="container mx-auto my-5 py-3">
      <h1 className="text-center text-2xl font-semibold my-5 md:my-3 text-slate-900">
        Categories
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-5 px-5 justify-between">
        {categories.map((category) => (
          <div
            key={category._id}
            className="w-[70%] md:w-[20%] flex justify-center items-center py-6 rounded-md text-xl font-medium text-slate-800 bg-white hover:scale-95 ease-in-out duration-100 cursor-pointer"
          >
            <Link to={`/store`}>{category.name}</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
