import { Link } from 'react-router-dom';
import Product from './Product';
import SkeletonProduct from './Skeleton/SkeletonProduct';

export const View = ({ products, status, category }) => {
  return (
    <section className="my-12">
      <div className="container mx-auto px-6 py-5 text-center rounded-3xl shadow-2xl bg-white">
        <h1 className="mb-5 text-3xl font-medium text-heading">{category}</h1>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {status !== 'success' ? (
            <>
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </>
          ) : (
            products
              ?.slice(0, 5)
              .map((product) => (
                <Product product={product} loading={0} key={product._id} />
              ))
          )}
        </div>
        <Link to="/store">
          <button className="px-6 py-2.5 rounded-3xl text-white bg-gray-700  mt-5 hover:bg-gray-500 hover:text-black ease-in duration-100">
            VIEW MORE
          </button>
        </Link>
      </div>
    </section>
  );
};

export default View;
