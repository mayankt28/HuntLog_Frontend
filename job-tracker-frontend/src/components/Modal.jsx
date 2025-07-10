import React from 'react';
import ReactDOM from 'react-dom'; 
import { PrimaryButton, SecondaryButton } from './Button'; 

export const Modal = ({
  isOpen,         // Boolean to control visibility
  onClose,        // Function to call when the modal is closed
  title,          // Title of the modal
  children,       // Content of the modal
  footer,         // Optional footer content (e.g., buttons)
  className = '', // Optional classes for the modal content container
  backdropClass = '', // Optional classes for the backdrop
  titleClass = '',    // Optional classes for the title
}) => {
  if (!isOpen) return null; 

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${backdropClass}`}>
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={onClose} 
      ></div>

      <div className={`bg-discord-background p-6 rounded-lg shadow-xl relative z-50 max-w-lg w-full ${className}`}>

        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-pixel text-discord-primary ${titleClass}`}>
            {title}
          </h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-discord-accent focus:outline-none"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        <div className="mb-4 text-sm text-discord-text">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body 
  );
};
