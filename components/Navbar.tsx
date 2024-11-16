"use client";
import { ChevronRight, HomeIcon, SearchCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      className="w-full h-20 flex items-center fixed z-20 "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {" "}
      <Link href="/">
        <motion.div
          className="flex-2 w-fit pl-6 pr-4 lg:pl-10 lg:pr-14 h-full flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="lg:text-2xl sm:text-sm px-3 py-1 whitespace-nowrap font-Articulate text-white backdrop-blur-sm bg-[#6b706163]  shadow-lg rounded-md">
            KidneyHealth AI
          </h1>
        </motion.div>
      </Link>
      <motion.div
        className="flex-1 h-full flex items-center py-1 space-x-1 lg:space-x-5 lg:px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <Link
          className="text-sm w-fit  bg-white/60 flex justify-center items-center space-x-2 rounded-full py-[.2rem] px-1 md:pl-1 md:pr-3 font shadow-md backdrop-blur-sm hover:bg-white/80 transition duration-300"
          href="/"
        >
          <div className="bg-white p-2  rounded-full shadow-sm">
            <HomeIcon className="lg:w-4 lg:h-4 w-3 h-3" />
          </div>

          <p className="font-Articulate hidden md:block lg:pr-2 font-medium lg:text-sm text-xs whitespace-nowrap text-black/80">
            Home
          </p>
        </Link>
        <Link
          className="text-sm w-fit  bg-white/60 flex justify-center items-center space-x-2 rounded-full py-[.2rem] px-1 md:pl-1 md:pr-3 font shadow-md backdrop-blur-sm hover:bg-white/80 transition duration-300"
          href="/scanAnalysis"
        >
          <div className="bg-white p-2 rounded-full shadow-sm">
            <SearchCheck className="lg:w-4 lg:h-4 w-3 h-3" />
          </div>

          <p className="font-Articulate hidden md:block lg:pr-2 font-medium lg:text-sm text-xs whitespace-nowrap text-black/80">
            Scan Analysis
          </p>
        </Link>
      </motion.div>
      <motion.div
        className="w-fit mr-3 md:mr-0 md:pl-4 p-1 sm:pr-6 md:pr-10 h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Link
          className="text-sm w-fit bg-white/60 flex justify-center items-center space-x-2 rounded-full py-[.2rem] px-1 md:pl-1 md:pr-3 font hover:bg-white/80 transition duration-300"
          href="https://github.com/Not-Sahil-Raja/KindneyDiseaseClassification"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#272525] md:p-2 p-1 rounded-full shadow-sm">
            <img src="./github_logo.svg" className="w-5 h-5 invert" />
          </div>
          <p className=" md:block hidden whitespace-nowrap font-Articulate md:pr-2 font-medium text-black/80">
            Check Github
          </p>
          <div className="md:flex hidden ">
            <ChevronRight className="w-3 opacity-50" />
            <ChevronRight className="w-4 opacity-75" />
            <ChevronRight className="w-5" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
