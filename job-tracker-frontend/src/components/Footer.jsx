import React from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Discord', icon: <FaDiscord />, url: 'https://discordapp.com/users/honkingwizard' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/mayankt28' },
  ];

  const usefulLinks = [
    { name: 'About Us', url: '#about' },
    { name: 'Terms of Service', url: '#terms' },
  ];

  return (
    <footer className="bg-discord-dark text-discord-text p-8 mt-auto"> 
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

      
        <div>
          <h3 className="text-xl font-pixel text-discord-accent shadow-pixel mb-4">HuntLog</h3>
          <p className="text-sm text-gray-400 mb-4">
            Made with ❤️ by Mayank 🙂
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-discord-text hover:text-arcade-neonBlue transition-colors duration-200"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

 
        <div>
          <h3 className="text-lg font-pixel text-discord-primary mb-4">Useful Links</h3>
          <ul className="space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  className="text-sm text-gray-400 hover:text-discord-accent transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

    
        <div>
          <h3 className="text-lg font-pixel text-discord-primary mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">
            Email: <a href="mailto:mayankt28@gmail.com" className="hover:text-discord-accent">mayank@HuntLog.com</a>
          </p>
        </div>
      </div>


      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500 font-pixel">
        &copy; {currentYear} HuntLog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
