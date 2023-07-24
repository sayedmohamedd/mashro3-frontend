import Axios from 'axios';
const CartProduct = ({ product }) => {
  const deleteProduct = async (product_id) => {
    const user_id = window.localStorage.getItem('userId');
    await Axios.post('http://localhost:3002/api/cart/removeProduct', {
      user_id,
      product_id,
    }).then((res) => console.log(res.data));
  };
  return (
    <div className="md:w-[30%] lg:w-[20%] flex flex-col p-3 shadow-xl rounded-xl bg-white">
      <img src={product.image} alt={product.name} className="aspect-square" />
      <div className="flex justify-between mt-4">
        <h1 className="font-medium text-xl">{product.name}</h1>
        <span className="font-medium text-lg">
          {product.price * product.number} $
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 ml-2 text-gray-500">
          <span>-</span>
          <span>{product.number}</span>
          <span>+</span>
        </div>
        <button
          className="self-end font-medium px-2 py-1.5 rounded-md my-2 bg-red-400"
          onClick={() => deleteProduct(product.product_id)}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
