import React from 'react';
import { Link } from 'react-router-dom';
import './modal.css';

const Modal = ({ children, handleClick }) => (
  <div className="Modal">
    {children}
    <Link
      to={{
        pathname: '/videos',
        state: {
          modal: false
        }
      }}
    >
      <button
        onClick={handleClick}
        className="Modal-close"
      />
    </Link>      
  </div>
)

export default Modal;
