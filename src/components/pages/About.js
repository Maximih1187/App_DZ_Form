import './scssPages/about.scss'
import Spinner from '../spinner/Spinner';
import { useSelector } from 'react-redux';
import AboutChars from '../aboutChars/AboutChars';
import { number, object } from 'yup';


const About = () => {



   // const obj1 = {
   //    age: 30,
   //    status: false,
   //    number: 38,
   // }

   // const obj4 = obj1;


   // const obj2 = { ...obj1 }
   // const obj3 = JSON.parse(JSON.stringify(obj2))


   // console.log(obj1 === obj2);
   // console.log(obj1 === obj3);
   // console.log(obj2 === obj3);
   // console.log(obj1 === obj4);
   // // console.log(obj1);
   // // console.log(obj2);
   // // console.log(obj3);


   const { charImg, chars } = useSelector(state => state.aboutSlice)
   const statusChar = useSelector(state => state.aboutSlice.statusChar)

   const src = charImg.map((item) => {
      if (chars.length === 0) {
         return ("https://cs.moestavern.ru/files/avatars/1685190363.jpg")
      } else { return item.thumbnail }

   })

   return (
      <div className='about__wrapper'>
         <ul className='about'>
            <AboutChars />
         </ul>
         <div className='about__description'>
            <div className='about__description-inner'>
               {statusChar === "" ? <div>Кликните по карточке с героем.</div> : null}
               {statusChar === "loading" ? <Spinner /> : <img className='about__description-imges' src={src} alt="" />}
               {/* {statusChar === "fulfilled" ? <img className='about__description-imges' src={src} alt="" /> : <Spinner />} */}
            </div>

         </div>


      </div>
   );
}





export default About;
