import React from 'react';
import '../pages/scssPages/about.scss'
import Spinner from '../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChars, fetchChar, fetchShoppingCart, addShoppingCart, deleteChars, addChardAfterDeleteChars } from '../pages/slicePages/aboutSlice';
import { useRef, useMemo, useState, useEffect } from 'react';

const AboutChars = () => {

  const dispatch = useDispatch();
  const refer = useRef([]);
  const { chars, shoppingCart, } = useSelector(state => state.aboutSlice)
  const [updateChar, setUpdateChar] = useState([])
  //const [stateCart, setStateCart] = useState(false)
  //const statusChar = useSelector(state => state.aboutSlice.statusChar)
  // const urlAllChars = "https://gateway.marvel.com:443/v1/public/characters?limit=25&apikey=4ca4e0f7a1c0e3bdc1240a5027d68f5f"


  useEffect(() => {
    setUpdateChar(chars)
  }, [chars])

  const addCharsCart = (id) => {
    dispatch(addShoppingCart(id))
    dispatch(deleteChars(id))
  }

  return (
    <div>
      {updateChar.length === 0 ? <Spinner /> : <div>
        {
          updateChar.map((item, i) => {

            return (
              <li ref={(el) => (refer.current[i] = el)}
                onClick={() => {
                  dispatch(fetchChar(item.id));

                }}
                key={i}
                id={item.id}
                className='about__list' >
                <div className='about__list-name'>{item.name}</div>
                <div className='about__list-descr'>{item.description}</div>
                <div className='about__list-id'>{item.id}</div>
                <button
                  onClick={() => {
                    addCharsCart(item.id);
                  // focuseItem(i, e);
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
