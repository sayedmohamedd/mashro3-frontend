// React Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// React Router
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/features/categoryReducer';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  // Fetch Categories
  useEffect(() => {
    dispatch(fetchCategories());
    return () => {};
  }, [dispatch]);

  return (
    <section className="container mx-auto my-5 py-3">
      <h1 className="text-center text-2xl font-semibold my-5 md:my-3 text-slate-900">
        Categories
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-5 px-5 justify-between">
        {categories.map((category) => (
          <div
            key={category?._id}
            className="w-[70%] h-[100px] md:w-[20%] flex justify-center text-center items-center px-2 py-6 rounded-md text-xl font-medium text-slate-800 bg-white hover:scale-95 ease-in-out duration-100 cursor-pointer"
          >
            <Link to={`/store/${category.name}`} className="text-center">
              {category?.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
