import React from 'react';
import './header.scss'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { onToggleAuthorization } from "../pages/slicePages/formRegisterSlice"
import { fetchChars } from '../pages/slicePages/aboutSlice';

const Header = () => {
  const urlAllChars = "https://gateway.marvel.com:443/v1/public/characters?limit=5&apikey=4ca4e0f7a1c0e3bdc1240a5027d68f5f"

  const { stateAuthorization } = useSelector(state => state.formRegisterSlice)
  const shoppingCart = useSelector(state => state.aboutSlice.shoppingCart)
  const dispatch = useDispatch()
  const registrStatus = stateAuthorization[0] === false ? 'Регистрация' : stateAuthorization[1]
  // useEffect(() => {
  // }, []);
  const fetchData = useMemo(() => {
    dispatch(fetchChars(urlAllChars))
  }, [urlAllChars])

  const navLinkStyles = ({ isActive }) => {

    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? 'rgb(227, 125, 125)' : "azure"
    };
  };
  const countCharsCart = shoppingCart.length

  return (
    <header className='header'>

      <div className='container'>
        <ul className='header_nav'>
          <NavLink style={navLinkStyles} to="/register" className='header_nav-list'>{registrStatus}</NavLink>
          <NavLink style={navLinkStyles} to="/" className='header_nav-list'>Информация</NavLink>
          <NavLink style={navLinkStyles} to="/about" className='header_nav-list'>Все</NavLink>
          {/* <NavLink style={navLinkStyles} to="/hi" className='header_nav-list'>Карзина</NavLink> */}
          {stateAuthorization[0] === true ? <NavLink className='header_nav-list'
            onClick={() => dispatch(onToggleAuthorization([false]))
            }>Выйти</NavLink> : null}
        </ul>

      </div>
      <NavLink to="/hi" className="heder__cart-img">
        <img src="https://img.icons8.com/?size=100&id=8AWSfZqmVTZJ&format=png&color=FFFFFF" alt="Картинка карзины" />
        <span className='heder__cart-count'>{countCharsCart}</span>
      </NavLink>
    </header>
  );
}

export default Header;
