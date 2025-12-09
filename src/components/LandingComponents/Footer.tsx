import React from 'react';
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-700 body-font border-t border-lime-200">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        {/* LOGO TEXT */}
        <a className="flex items-center text-2xl font-extrabold text-lime-600">
          TempoPe
        </a>

        <p className="sm:border-gray-300 text-gray-600 mt-4 text-sm sm:ml-4 sm:mt-0 sm:border-l-2 sm:py-2 sm:pl-4">
          © 2025 TempoPe — All Rights Reserved
        </p>

        {/* SOCIAL ICONS */}
        <span className="mt-4 inline-flex justify-center gap-4 sm:ml-auto sm:mt-0 sm:justify-start">
          <a className="text-gray-600 transition hover:text-lime-700">
            <FaFacebook className="h-5 w-5" />
          </a>
          <a className="text-gray-600 transition hover:text-lime-700">
            <FaXTwitter className="h-5 w-5" />
          </a>
          <a className="text-gray-600 transition hover:text-lime-700">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a className="text-gray-600 transition hover:text-lime-700">
            <FaLinkedinIn className="h-5 w-5" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
