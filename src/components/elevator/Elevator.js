import React from 'react';
// import ButtonLevel from './ButtonLevel';
import './Elevator.scss'
import { useRef, useState } from 'react';


const Elevator = () => {
      const [countLevel, setCountLevel] = useState(1)
      const [difference, setDifference] = useState()


      console.log(countLevel);

      const levelArr = [{
            children: 1,
            id: 1,
            className: 'level level_active'
      },
      {
            children: 2,
            id: 2,
            className: 'level'
      },
      {
            children: 3,
            id: 3,
            className: 'level'
      },
      {
            children: 4,
            id: 4,
            className: 'level'
      },
      {
            children: 5,
            id: 5,
            className: 'level'
      },
      {
            children: 6,
            id: 6,
            className: 'level'
      },
      ]
      const levelRef = useRef([])

      const removeClassLevel = (i, id) => {
            setCountLevel(id)
            levelRef.current.forEach((item) =>
                  item.classList.remove("level_active")
            );
            levelRef.current[i].classList.add("level_active");


            //console.log(index);
            // for (index = countLevel; index <= countLevel; index++) {
            //       setTimeout(() => {
            //

            //       }, 1000)
            // }







      }





      return (
            <div className='elevator'>
                  {levelArr.reverse().map((item, i) =>
                        <button id={item.id}
                              key={item.id}
                              className={item.className}
                              ref={(el) => (levelRef.current[i] = el)}
                              onClick={() => removeClassLevel(i, item.id)}
                        >
                              {item.children}
                        </button>
                  )}
            </div>
      );
}

export default Elevator;
