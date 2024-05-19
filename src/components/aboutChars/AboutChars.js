import React from 'react';
import '../pages/scssPages/about.scss'
import Spinner from '../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChars, fetchChar, getIdDescription, fetchShoppingCart, getShoppingCart } from '../pages/slicePages/aboutSlice';
import { useRef, useMemo, useState } from 'react';


const AboutChars = () => {

  const dispatch = useDispatch();
  const refer = useRef([]);
  const { chars, char, idDescr, shoppingCart } = useSelector(state => state.aboutSlice)
  //const statusChar = useSelector(state => state.aboutSlice.statusChar)
  const urlAllChars = "https://gateway.marvel.com:443/v1/public/characters?limit=25&apikey=4ca4e0f7a1c0e3bdc1240a5027d68f5f"
  console.log(chars);


  const fetchServer = useMemo(() => {
    dispatch(fetchChars(urlAllChars))
  }, [])


  const charsq = (e) => {
    chars.forEach((el, i) => {
      if (el.id == e.target.id)
        dispatch(getShoppingCart(el))

    })
    //dispatch(getShoppingCart(et))
    //console.log(et);
  }

  //const src = char.map((item) => item.thumbnail)

  const focuseItem = (i) => {
    refer.current.forEach((item) => {
      item.classList.remove('activer')
    });
    refer.current[i].classList.add('activer');
    const activeClass = document.querySelector(".about__description");
    activeClass.classList.add('activer')
  }


  const disableButton = (e) => {
    const disButton = document.querySelectorAll('.about__list-button')

    disButton.forEach((element) => {
      //console.log(element.id);

      if (element.id === e.target.id)
        element.remove()

    });
    // refer.current[i].classList.add('activer');
    // const activeClass = document.querySelector(".about__description");
    // activeClass.classList.add('activer')
  }
  return (
    <div>
      {chars.length < 1 ? <Spinner /> : <div>
        {
          chars.map((item, i) => {
            return (
              <li ref={(el) => (refer.current[i] = el)}
                onClick={(e) => {
                  focuseItem(i, e)
                }}
                key={i}
                id={item.id}
                className='about__list' >
                <div className='about__list-name'>{item.name}</div>
                <div className='about__list-descr'>{item.description}</div>
                <div className='about__list-id'>{item.id}</div>
                <div className='about__list-i'>{i + 1}</div>
                <button
                  onClick={(e) => {
                    dispatch(fetchChar(+e.target.id));
                    dispatch(getIdDescription(+e.target.id));
                    charsq(e);
                    disableButton(e);
                  }}
                  id={item.id}
                  className="about__list-button"
                >
                  добавить
                </button>
              </li>
            )
          })
        }
      </div>
      }
    </div>
  );
}

export default AboutChars;
