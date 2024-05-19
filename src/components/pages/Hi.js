
import { useEffect, useState } from 'react'
import './scssPages/hi.scss'
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../spinner/Spinner';

const Hi = () => {

  const { v4: uuidv4 } = require('uuid');
  const shoppingCart = useSelector(state => state.aboutSlice.shoppingCart)
  const [stat, setStat] = useState([])
  const [check, setCheck] = useState({})
  console.log(check);

  //const [ret, setRet] = useState()
  // const filtr = () => {
  //   const resArray = Array.from(new Set(shoppingCart))
  //   setRet(resArray)
  // }

  const resArray = (() => {
    const et = Array.from(new Set(shoppingCart));
    setStat(et)
  })
  console.log(stat);
  useEffect(() => {
    resArray()

  }, [])



  //setStat(shoppingCart)
  // console.log(stat);
  if (stat < 1) {
    return <Spinner />
  }
  // setStat(resArray)
  // console.log(stat);
  //console.log(resArray);


  // const ret = () => {
  //   const resArray = Array.from(new Set(shoppingCart))
  //   setStat(resArray)
  // }
  // console.log(stat);


  return (
    <div className='hi' >
      <ul className="hi__shoppingcart-ul">
        {stat.map((item, i) => {
          return (
            <li key={i} className='hi__shoppingcart-list'>
              <div className="hi__shoppingcart-wrapper">
                <div className='hi__shoppingcart-list-name'>{item.name}</div>
                <div className='hi__shoppingcart-list-descr'>{item.description}</div>
                <img src={item.thumbnail} className='hi__shoppingcart-list-img'></img>
              </div>
              <div className="hi__shoppingcart-select">
                <div className="hi__shoppingcart-selector">
                  <div className="hi__shoppingcart-selector-incr">+</div>
                  <div className="hi__shoppingcart-selector-summ">0</div>
                  <div className="hi__shoppingcart-selector-decr">-</div>
                </div>
                <input
                  type='checkbox'
                  className='hi__shoppingcart-checkbox'
                  id={uuidv4()}
                  onChange={() => console.log('g')}
                  //checked={stat}
                  onClick={(e) => setStat(e)}
                  name="terms" />
              </div>

            </li>
          )
        })}

      </ul>
    </div>
  );
}



export default Hi;
