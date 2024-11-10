"use client";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import ShimmerButton from "@/components/ui/shimmer-button";
import {
  ArrowUpRightIcon,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import upload_kidneyDiseaseAI from "@/public/upload_kidneyDiseaseAI.gif";
import classify_kidneyDiseaseAI from "@/public/classify_kidneyDiseaseAI.gif";
import result_kidneyDiseaseAI from "@/public/result_kidneyDiseaseAI.gif";

const Home = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inView1 = useInView(ref1, { once: true });
  const inView2 = useInView(ref2, { once: true });
  const inView3 = useInView(ref3, { once: true });
  return (
    <>
      <div className="w-full h-screen relative p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2560 1453"
          width="0"
          height="0"
        >
          <defs>
            <clipPath id="mask" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.000390625,0.00068823124)"
                d="M2521 1H41C18.9086 1 1 18.9086 1 41V834C1 856.091 18.9086 874 41 874H588.5C610.591 874 628.5 891.909 628.5 914V971.5C628.5 993.591 646.409 1011.5 668.5 1011.5H997.5C1019.59 1011.5 1037.5 1029.41 1037.5 1051.5V1167C1037.5 1189.09 1055.41 1207 1077.5 1207H1271.5C1293.59 1207 1311.5 1224.91 1311.5 1247V1398.31C1311.5 1420.2 1329.09 1438.02 1350.98 1438.31L2520.48 1453.47C2542.77 1453.76 2561 1435.77 2561 1413.48V41C2561 18.9086 2543.09 1 2521 1Z"
              />
            </clipPath>
          </defs>
        </svg>
        <motion.img
          src="./Kidney_Image.jpg"
          alt="Kidney Image"
          className="w-full h-[100%] object-cover"
          style={{
            clipPath: "url(#mask)",
            WebkitClipPath: "url(#mask)",
          }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
            filter: { duration: 1, delay: 0.5, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute bottom-[1.5%] left-[3%] text-8xl text-black/80 flex flex-col items-start justify-center leading-none font-Articulate"
          initial={{ opacity: 0, filter: "blur(30px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
        >
          <p className=" text-sm lg:text-base 2xl:text-lg font-medium font-Articulate pb-2 pl-3 text-black/60 ">
            Early Detection for a Healthier Future
          </p>
          <h1 className=" 2xl:text-[8rem] lg:text-[5rem]">Smart</h1>
          <h1 className="2xl:text-[8rem] lg:text-[5rem]">Kidney Health</h1>
        </motion.div>
        <motion.div
          className="absolute bottom-[10%] right-[5%] text-white/60 font-medium rounded-xl max-w-60 px-6 py-5 backdrop-blur-lg bg-[#837b7b4d] border"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease: "easeInOut" }}
        >
          <div className="text-2xl text-white font-bold font-Articulate pb-2">
            AI Kidney Classification
          </div>
          <div className="text-pretty">
            AI revolutionizes kidney health by improving early diagnosis,
            personalized treatments, and proactive care, ensuring better
            outcomes for patients.
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-[5%] lg:right-[30%] right-[28%]"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <Link href="/scanAnalysis">
            <ShimmerButton
              className="shadow-2xl"
              shimmerColor="#74A202"
              shimmerSize="0.15em"
              shimmerDuration="4s"
              background="linear-gradient(90deg, #ffffff, #f0f0f0)"
            >
              <span className="whitespace-pre-wrap text-center text-sm font-medium flex space-x-1 justify-center items-center leading-none tracking-tight text-[#363535] dark:from-white dark:to-slate-900/10 lg:text-lg">
                Check Health <ArrowUpRightIcon className="w-4 h-4" />
              </span>
            </ShimmerButton>
          </Link>
        </motion.div>
      </div>
      <div className="mt-11 overflow-hidden py-6">
        <VelocityScroll
          text=" Kidney Disease Detection -"
          default_velocity={2}
          className="font-Articulate text-center text-6xl tracking-[-0.02em] text-[#444343] drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        />
      </div>
      <div className="h-screen w-full pt-[10%]">
        <div className="flex flex-col h-full">
          <motion.div
            className="2xl:text-5xl md:text-3xl font-Articulate w-[50%] pl-[5%] text-[#444343] dark:text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Early detection of kidney diseases is crucial. Our AI system
            identifies diseases early, enabling personalized treatments and
            proactive care.
          </motion.div>
          <div className="h-[60%] w-full px-4 mt-auto mb-[2%] flex items-stretch space-x-5">
            <motion.div
              className="h-full flex-[1] pt-[1%]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="2xl:text-xl md:text-lg font-Articulate pl-[10%] text-[#444343] dark:text-white">
                <p className="rounded-lg w-fit px-2 border">HOW TO USE</p>
              </div>
            </motion.div>
            <motion.div
              className="h-full flex-[2] relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Image
                src={upload_kidneyDiseaseAI}
                alt="Kidney Image 1"
                className=" w-full h-full object-cover rounded-lg"
                unoptimized
              />
              <div
                className="absolute inset-0 w-full h-full z-[1]  rounded-lg"
                style={{
                  boxShadow: "inset 0 0 20px 15px rgba(255, 255, 255, 0.5)",
                }}
              />
            </motion.div>
            <motion.div
              className="h-full flex-[2] relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Image
                src={classify_kidneyDiseaseAI}
                alt="Kidney Image 1"
                className=" w-full h-full object-cover rounded-lg"
                unoptimized
              />
              <div
                className="absolute inset-0 w-full h-full z-[1]  rounded-lg"
                style={{
                  boxShadow: "inset 0 0 20px 15px rgba(255, 255, 255, 0.5)",
                }}
              />
            </motion.div>
            <motion.div
              className="h-full flex-[2] relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Image
                src={result_kidneyDiseaseAI}
                alt="Kidney Image 1"
                className=" w-full h-full object-cover rounded-lg"
                unoptimized
              />
              <div
                className="absolute inset-0 w-full h-full z-[1]  rounded-lg"
                style={{
                  boxShadow: "inset 0 0 20px 15px rgba(255, 255, 255, 0.5)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full pt-[5%] flex">
        <div className="flex-1 flex flex-col">
          <motion.div
            className="2xl:text-5xl md:text-3xl px-4 pt-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our goal is to utilize AI with a sequential model to deliver fast,
            accurate kidney disease classification, enabling early detection and
            supporting better health outcomes.
          </motion.div>
          <div className="grid grid-cols-2 gap-6 h-full pt-[10%] px-5 pb-5">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="flex-[2] text-5xl flex items-center px-5">
                50%
              </div>
              <div className="flex-1 flex items-center px-5 border-t leading-none border-[#575656]">
                Accuracy rate of our AI model
                <br /> in detecting kidney diseases
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="flex-[2] text-5xl flex items-center px-5">
                Normal
              </div>
              <div className="flex-1 flex items-center px-5 border-t leading-none border-[#575656]">
                Potential kidney disease signs identified, evaluate further.
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="flex-[2] text-5xl flex items-center px-5">
                Risk Level
              </div>
              <div className="flex-1 flex items-center px-5 border-t leading-none border-[#575656]">
                Model detected early-stage abnormalities for further evaluation.
              </div>
            </motion.div>
            <div className=""></div>
          </div>
        </div>
        <motion.div
          className=" flex-1 relative overflow-hidden "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div
            className=" absolute h-[90%] aspect-square -rotate-90 right-4"
            ref={ref3}
          >
            <motion.div
              className="  ml-auto m-4 border-2 rounded-full aspect-square relative "
              initial={{ scale: 0 }}
              animate={inView3 ? { scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ transformOrigin: "bottom right" }}
            >
              <div className=" h-5 aspect-square bg-[#74D2B4] absolute -top-3 rounded-full left-1/2">
                <div className="absolute rotate-90 font-medium text-black/70 bg-white leading-none whitespace-nowrap w-fit top-[100%]">
                  AI-Powered <br /> Diagnosis
                </div>
              </div>
            </motion.div>
          </div>

          <div
            ref={ref1}
            className="absolute h-[70%] aspect-square top-[3%] right-[5%] -rotate-45"
          >
            <motion.div
              className="ml-auto m-4 bg-[#e0e0e0] rounded-full aspect-square relative"
              initial={{ scale: 0 }}
              animate={inView1 ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85, ease: "easeInOut" }}
              style={{ transformOrigin: "90% 45%" }}
            >
              <div className="h-5 aspect-square bg-[#56C8A4] absolute -top-3 rounded-full left-1/2 transform -translate-x-1/2">
                <div className="absolute rotate-45 font-medium text-black/70 leading-none whitespace-nowrap w-fit right-0 mix-blend-luminosity">
                  High Accuracy
                </div>
              </div>
            </motion.div>
          </div>

          <div
            ref={ref2}
            className="absolute h-[50%] aspect-square top-[8%] right-[9%] -rotate-[120deg]"
          >
            <motion.div
              className="ml-auto m-4 bg-white border-2 rounded-full aspect-square relative"
              initial={{ scale: 0 }}
              animate={inView2 ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <div className="h-5 aspect-square bg-[#37A985] rotate-[120] absolute -top-3 rounded-full left-1/2 transform -translate-x-1/2">
                <div className="absolute rotate-[120deg] font-medium text-black/70 leading-none whitespace-nowrap w-fit right-0">
                  Fast Results
                </div>
              </div>
            </motion.div>
          </div>

          {/* <div className=" h-[90%] ml-auto m-4 bg-red-500 rounded-full aspect-square relative -rotate-90"></div> */}
        </motion.div>
      </div>

      {/* Footer Section */}
      <div className="h-screen w-full pt-[5%]">
        <div className="h-[60%] w-full px-5 py-4">
          <motion.div
            className="flex h-full bg-[#ffebec] rounded-2xl overflow-hidden border"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="px-10 py-4 h-full flex items-center text-7xl text-black/80 font-Articulate">
              Your health is your greatest asset
              <br /> – protect it!
            </div>
            <img
              src="./Kidney_Image_Footer.png"
              alt="Kidney Image Footer"
              className="h-full ml-auto object-contain"
            />
          </motion.div>
        </div>
        <div className="h-[35%] w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full gap-8 mb-12 font-Articulate px-8 mt-4">
            <div className="flex flex-col h-full justify-center">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl mb-4 text-[#18261C] flex items-center"
              >
                KidneyHealth AI
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm text-gray-600"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex space-x-4"
                >
                  {[
                    { icon: <Facebook className="w-6 h-6" />, href: "#" },
                    { icon: <Twitter className="w-6 h-6" />, href: "#" },
                    { icon: <Instagram className="w-6 h-6" />, href: "#" },
                    { icon: <Linkedin className="w-6 h-6" />, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="text-gray-600 hover:text-[#CDF391] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            <div className="flex flex-col h-full justify-center">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold mb-4 text-gray-800"
              >
                Quick Links
              </motion.h3>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-2"
              >
                {["About", "Privacy Policy", "Terms of Service", "Contact"].map(
                  (item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Link
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-600 hover:text-[#CDF391] transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </div>

            <div className="flex flex-col h-full justify-center">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold mb-4 text-gray-800"
              >
                Stay Updated
              </motion.h3>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col space-y-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#CDF391]"
                />
                <Button className="bg-[#CDF391] hover:bg-[#D6F5A3] text-gray-800">
                  Subscribe
                </Button>
              </motion.form>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-gray-600 z-20 absolute bottom-[0rem] w-full"
          >
            &copy; 2024 KidneyHealth AI. All rights reserved.
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-0 left-0 w-full h-20 bg-[#CDF391]/20 rounded-tl-full rounded-tr-full"
        />
      </div>
    </>
  );
};

export default Home;
