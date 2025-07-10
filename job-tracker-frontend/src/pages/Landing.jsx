import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/Button';

const Landing = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/media/landing-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-pixel text-discord-primary drop-shadow-lg">
          HuntLog
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-pixel text-gray-300">
          Your ultimate job application tracker with an 8-bit heart 💾
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="text-discord-accent underline font-pixel hover:text-white transition"
          >
                <PrimaryButton as={Link} to="/register">
                    Get Started
                </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
