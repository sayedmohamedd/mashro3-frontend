// import React, { useRef } from 'react';

// Framer Motion Animation
import { motion } from 'framer-motion';

const Advertisments = () => {
  // const imgsContainer = useRef(0);
  // const slideFunction = () => {
  //   for (let i = 0; i < imgsContainer.current.children.length; i++) {
  //     imgsContainer.current.children[i].classList.toggle('flex');
  //     imgsContainer.current.children[i].classList.toggle('hidden');
  //   }
  // };
  return (
    <section className="my-5">
      <div className="container mx-auto px-3 py-2 flex flex-col md:flex-row gap-4  md:max-h-[60vh]">
        {/* slider */}
        <motion.div
          initial={{ x: -500 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          animate={{ x: 0 }}
          className="overflow-hidden w-full md:w-1/2 relative flex justify-center items-center border-2 shadow-md rounded-md bg-white"
        >
          <div className="w-full h-full ">
            <img
              src="./products/product-21.jpg"
              className="aspect-square object-contain w-full h-full rounded-md"
              alt=""
            />
          </div>

          <div className="absolute flex gap-2 bottom-3 left-[50%] translate-x-[-50%]">
            <span className="w-4 h-4 rounded-full border-2 border-gray-300"></span>
            <span className="w-4 h-4 rounded-full border-2 border-gray-300"></span>
            <span className="w-4 h-4 rounded-full border-2 border-gray-300 "></span>
          </div>
        </motion.div>
        {/* offers */}
        <motion.div
          initial={{ x: 500 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          animate={{ x: 0 }}
          className="w-full md:w-1/2 flex flex-wrap gap-2 py-4 justify-center items-center border-2 shadow-md rounded-md bg-white"
        >
          <div className="w-[45%] h-[50%] rounded-md">
            <img
              src="./products/product-20.jpg"
              className="aspect-square object-contain w-full h-full"
              alt=""
            />
          </div>
          <div className="w-[45%] h-[50%]  rounded-md">
            <img
              src="./products/product-22.jpg"
              className="aspect-square object-contain w-full h-full "
              alt=""
            />
          </div>
          <div className="w-[45%] h-[50%]  rounded-md">
            <img
              src="./products/product-23.jpg"
              className="aspect-square  object-contain w-full h-full"
              alt=""
            />
          </div>
          <div className="w-[45%] h-[50%] rounded-md">
            <img
              src="./products/product-4.jpg"
              className="aspect-square object-contain w-full h-full"
              alt=""
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Advertisments;
