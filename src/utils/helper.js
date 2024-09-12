export const scrollTop = () => {
  window.scrollTo(0, 0);
};

export const isLoggedIn = () => {
  return localStorage.getItem('token') ? true : false;
};

export const determineTotalPrice = (cart) => {
  let total = 0;
  cart.map((el) => {
    return (total += el?.product?.price * el?.number);
  });
  return total;
};
