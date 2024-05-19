import React from 'react';
import './header.scss'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { onToggleAuthorization } from "../pages/slicePages/formRegisterSlice"


const Header = () => {
  const { stateAuthorization } = useSelector(state => state.formRegisterSlice)
  const dispatch = useDispatch()
  const registrStatus = stateAuthorization[0] === false ? 'Регистрация' : stateAuthorization[1]
  // useEffect(() => {
  // }, []);

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? 'rgb(227, 125, 125)' : "azure"
    };
  };


  return (
    <header className='header'>
      <div className='container'>
        <ul className='header_nav'>
          <NavLink style={navLinkStyles} to="/register" className='header_nav-list'>{registrStatus}</NavLink>
          <NavLink style={navLinkStyles} to="/" className='header_nav-list'>Информация</NavLink>
          <NavLink style={navLinkStyles} to="/hi" className='header_nav-list'>Привет</NavLink>
          <NavLink style={navLinkStyles} to="/about" className='header_nav-list'>о нас</NavLink>
          {stateAuthorization[0] === true ? <NavLink className='header_nav-list'
            onClick={() => dispatch(onToggleAuthorization([false]))
            }>Выйти</NavLink> : null}
        </ul>
      </div>
    </header>
  );
}

export default Header;
