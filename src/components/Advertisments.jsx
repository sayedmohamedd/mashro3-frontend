import { useState } from 'react';

// react icons
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

// Framer Motion Animation
import { motion } from 'framer-motion';

const Advertisments = () => {
  const [currentIndex, setCurrentIndex] = useState(21);

  const prevSlide = () => {
    if (currentIndex === 21) {
      setCurrentIndex(24);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex === 24) {
      setCurrentIndex(21);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  return (
    <section className="my-5">
      <div className="container mx-auto px-3 py-2 flex flex-col md:flex-row gap-7 md:max-h-[60vh]">
        {/* slider */}
        <motion.div
          initial={{ x: -500 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          animate={{ x: 0 }}
          className="w-full md:w-1/2 relative flex justify-center items-center border-2 shadow-md rounded-md bg-white"
        >
          {/* slider */}
          <div
            className="w-full h-full bg-center bg-contain bg-no-repeat group duration-500 select-none"
            style={{
              backgroundImage: `url(./products/product-${currentIndex}.jpg)`,
            }}
          >
            <div className="w-full h-full aspect-square object-contain"></div>
            <div
              onClick={nextSlide}
              className="absolute hidden group-hover:block top-[50%] right-3 translate-y-[-50%] rounded-full p-1.5 cursor-pointer duration-75 ease-out  text-white"
            >
              <BsChevronCompactRight size={30} />
            </div>
            <div
              onClick={prevSlide}
              className="absolute hidden group-hover:block top-[50%] left-3 translate-y-[-50%] rounded-full p-1.5 cursor-pointer duration-75 ease-out text-white"
            >
              <BsChevronCompactLeft size={30} />
            </div>
            {/* Dots */}
            <div className="absolute flex gap-2 bottom-[-25px] left-[50%] translate-x-[-50%]">
              {Array(4)
                .fill(1)
                .map((item, index) => (
                  <RxDotFilled
                    onClick={() => setCurrentIndex(index + 21)}
                    key={index}
                    size={20}
                    className="cursor-pointer text-white hover:text-gray-500 duration-100"
                  />
                ))}
            </div>
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
