
import { useState, useRef } from 'react';
import './ButtonLevel.scss'
import { current } from '@reduxjs/toolkit';


const ButtonLevel = (props) => {
      const { children, id, classes } = props
      // const [styles, setStyles] = useState("level")




      const refButton = useRef([])
      console.log(refButton.current);

      const focusLevel = () => {
            // const retw = refButton.current.map((item) => {
            //       console.log(retw);
            //       item.remove.class('level_active');
            // })

      }
      //focusLevel()

      // const callingElevator = () => {

      //       refButton.current.map((item) => {
      //             if (item.id === id)
      //                   item.add.classList('level_active');

      //       })

      // }


      return (
            <div>
                  <button onClick={(e) => {
                        // callingElevator(e)
                        focusLevel(e)
                  }}
                        id={id}
                        className='level'
                        ref={refButton}
                  >{children}

                  </button>
            </div>
      );
}

export default ButtonLevel;
//level_active
