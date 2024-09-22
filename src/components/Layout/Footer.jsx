// React Router
import { Link } from 'react-router-dom';
// Icons
import { BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { AiFillInstagram, AiFillGithub } from 'react-icons/ai';
// Utils
import { scrollTop } from '../../utils/helper';

const Footer = () => {
  return (
    <footer className=" bg-[#131921] text-white">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center px-4 py-8 gap-5">
        {/* first */}
        <div className="flex flex-col gap-5 text-center w-full md:w-1/4 ">
          <h1 className="text-4xl font-bold">Logo</h1>
          <p className="">
            The oldest classical British and Latin writing had little or no
            space between words and could be written in boustrophedon
            alternating directions. Over time
          </p>
        </div>
        {/* second */}
        <div className="w-full md:w-1/2 lg:w-1/4">
          <ul className="flex flex-col font-medium text-lg text-center gap-3">
            <li>
              <Link to="/" onClick={scrollTop}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/store">Store</Link>
            </li>
            <li>Offers</li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* third */}
        <div className="w-full md:w-1/2 lg:w-1/4">
          <h1 className="text-xl font-medium my-3 text-center">Contact Info</h1>
          <ul className="flex flex-col gap-3 text-center">
            <li>sayedmo.web.developer@gmail.com</li>
            <li>0110-212-8186</li>
            <li className="flex justify-evenly text-2xl">
              <a
                href="https://www.facebook.com/sayed.muhammed.54922/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook />
              </a>
              <a
                href="https://github.com/sayedmuhammed74/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
              <a
                href="https://www.instagram.com/_sayedmuhammed/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
              <a
                href="https://wa.link/ulh5l2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsWhatsapp />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
