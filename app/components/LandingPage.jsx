// components/LandingPage.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-[79vh] flex flex-col items-center justify-center text-black-800">
      
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-5xl font-extrabold mt-4">FileFlex</h1>
        <p className="text-xl mt-2">The Ultimate File Conversion Tool</p>
        <Link href='/getstarted'>
        <button className="hover:scale-105 shadow-lg shadow-blue-200  transition-all inline-block rounded-full bg-blue-700 px-8 py-4 text-center font-bold text-white mt-4 hover:border-black hover:bg-blue-500">
          Get Started
        </button>
        </Link>

        <div class="mt-4 mb-4 flex flex-col items-center justify-center divide-y divide-black sm:flex-row sm:divide-x sm:divide-y-0 md:mt-20">
          <div class="flex max-w-xs space-x-2 px-4 py-4">
            <div class="text-black-600 dark:text-black-400">
            Effortless Conversion: Convert files between various formats with just a few clicks.

            </div>
          </div>
          <div class="flex max-w-xs space-x-2 px-4 py-4">
            <div class="text-black-600 dark:text-black-400">
            High-Quality Outputs: Ensure top-notch quality for all your converted files.
            </div>
          </div>
          <div class="flex max-w-xs space-x-2 px-4 py-4">
            <div class="text-black-600 dark:text-black-400">
            Secure & Private: Your files are handled with the utmost security and privacy.
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default LandingPage;
