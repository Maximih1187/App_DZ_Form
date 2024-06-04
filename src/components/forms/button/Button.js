import React from 'react';
import './button.scss'


const Button = ({ children }) => {
      return (
            <button type='submit' className='button'>{children}</button>
      );
}

export default Button;
