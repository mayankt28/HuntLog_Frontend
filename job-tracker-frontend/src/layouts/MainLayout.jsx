import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const MainLayout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex flex-col min-h-screen bg-discord-dark text-discord-text">

      <div className="sticky top-0 z-50 bg-discord-dark">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <main className="flex-grow  bg-[#36393f]">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { searchQuery: searchTerm })
            : child
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
