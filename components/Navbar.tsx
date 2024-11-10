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
      <motion.div
        className="flex-2 w-fit pl-10 pr-14 h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-2xl font-Articulate text-white backdrop-blur-sm bg-[#6b706163] px-3 py-1 shadow-lg rounded-md">
          KidneyHealth AI
        </h1>
      </motion.div>
      <motion.div
        className="flex-1 h-full flex items-center py-1 space-x-5 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <Link
          className="text-sm w-fit bg-white/60 flex justify-center items-center space-x-2 rounded-full py-[.2rem] pl-1 pr-3 font shadow-md backdrop-blur-sm hover:bg-white/80 transition duration-300"
          href="/"
        >
          <div className="bg-white p-2 rounded-full shadow-sm">
            <HomeIcon className="w-4 h-4" />
          </div>
          <p className="font-Articulate pr-2 font-medium text-black/80">Home</p>
        </Link>
        <Link
          className="text-sm w-fit bg-white/60 flex justify-center items-center space-x-2 rounded-full py-[.2rem] pl-1 pr-3 font shadow-md backdrop-blur-sm hover:bg-white/80 transition duration-300"
          href="/scanAnalysis"
        >
          <div className="bg-white p-2 rounded-full shadow-sm">
            <SearchCheck className="w-4 h-4" />
          </div>
          <p className="font-Articulate pr-2 font-medium text-black/80">
            Scan Analysis
          </p>
        </Link>
      </motion.div>
      <motion.div
        className="w-fit pl-4 pr-10 h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <Link
          className="text-sm w-fit bg-white/60 flex justify-center items-center space-x-2 rounded-full py-[.2rem] pl-1 pr-3 font hover:bg-white/80 transition duration-300"
          href="https://github.com/Not-Sahil-Raja/KindneyDiseaseClassification"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-[#272525] p-2 rounded-full shadow-sm">
            <img src="./github_logo.svg" className="w-5 h-5 invert" />
          </div>
          <p className="font-Articulate pr-2 font-medium text-black/80">
            Check Github
          </p>
          <div className="flex">
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
