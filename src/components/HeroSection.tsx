import React from "react";

const HeroSection = () => {
  return (
    <div className="max-w-full mt-20">
      <div className="mx-auto h-80 flex flex-col items-center justify-center">
        <div className="text-7xl font-bold text-zinc-800 mx-auto md:text-center md:mx-4 sm:mx-auto sm:text-center">
          Dropshipping made easy.
        </div>
        <h1 className="mt-4 text-7xl font-bold bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
          dropit.io
        </h1>
        <p className="mt-4 text-xl text-zinc-400 sm:text-center sm:mx-auto">
          Automate your dropshipping experience with our AI-powered utilities.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
