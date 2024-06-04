import './scssPages/about.scss'
import Spinner from '../spinner/Spinner';
import { useSelector } from 'react-redux';
import AboutChars from '../aboutChars/AboutChars';


const About = () => {

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
