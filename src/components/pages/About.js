import './scssPages/about.scss'
import { useRef, useMemo, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChars, fetchChar, getIdDescription, fetchShoppingCart, getShoppingCart } from './slicePages/aboutSlice';
import AboutChars from '../aboutChars/AboutChars';


const About = () => {

   const dispatch = useDispatch();
   //const refer = useRef([]);
   const { chars, char, idDescr, shoppingCart } = useSelector(state => state.aboutSlice)
   const statusChar = useSelector(state => state.aboutSlice.statusChar)
   const urlAllChars = "https://gateway.marvel.com:443/v1/public/characters?limit=25&apikey=4ca4e0f7a1c0e3bdc1240a5027d68f5f"
   console.log(char);
   console.log('render');

   // const fetchServer = useMemo(() => {
   //    dispatch(fetchChars(urlAllChars))
   // }, [chars])

   // console.log(shoppingCart);
   // const countChar = shoppingCart.length


   // const filters = [...new Set(idDescr)]
   // console.log(filters);

   // const filtersCart = [...new Set(shoppingCart)]
   // console.log(filtersCart);

   // const fil = (shoppingCart) => {
   //    shoppingCart.reduce((acc, el) => {
   //       return acc.includes(el) ? acc : [...acc, el]
   //    })
   // }
   // console.log(fil);

   // const charsq = (e) => {
   //    chars.forEach((el, i) => {
   //       if (el.id == e.target.id)
   //          dispatch(getShoppingCart(el))

   //    })
   //    //dispatch(getShoppingCart(et))
   //    //console.log(et);
   // }
   //console.log(charsq());

   // const shoppingCart = dispatch(fetchShoppingCart())
   //console.log(shoppingСart(chars, filters));




   const src = char.map((item) => item.thumbnail)

   // const focuseItem = (i) => {
   //    refer.current.forEach((item) => {
   //       item.classList.remove('activer')
   //    });
   //    refer.current[i].classList.add('activer');
   //    const activeClass = document.querySelector(".about__description");
   //    activeClass.classList.add('activer')
   // }


   // const disableButton = (e) => {
   //    const disButton = document.querySelectorAll('.about__list-button')

   //    disButton.forEach((element) => {
   //       //console.log(element.id);

   //       if (element.id === e.target.id)
   //          element.remove()

   //    });
   //    // refer.current[i].classList.add('activer');
   //    // const activeClass = document.querySelector(".about__description");
   //    // activeClass.classList.add('activer')
   // }




   //mekfekfkl


   // if (chars.length < 1) {
   //    return (
   //       <div className='spinner'>
   //          <Spinner />
   //       </div>
   //    )
   // };

   return (
      <div className='about__wrapper'>
         <ul className='about'>
            <AboutChars />
         </ul>
         <div className='about__description'>
            <div className='about__description-inner'>
               {statusChar === "" ? <div>Кликните по карточке с героем.</div> : null}
               {statusChar === "Loading" ? <Spinner /> : <img className='about__description-imges' src={src} alt="" />}
            </div>
         </div>
      </div>
   );
}





export default About;
