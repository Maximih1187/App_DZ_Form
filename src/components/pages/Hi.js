
import { useEffect, useState } from 'react'
import './scssPages/hi.scss'
import { useSelector, useDispatch } from 'react-redux';
import Cart from './Cart';

const Hi = () => {

  //const dispatch = useDispatch()
  const shoppingCart = useSelector(state => state.aboutSlice.shoppingCart)





  // const [stat, setStat] = useState([])

  // useEffect(() => {
  //   resArray()
  // }, [shoppingCart]);
  // console.log(stat.length);

  // const resArray = (() => {
  //   //const filteredArray = Array.from(new Set(shoppingCart));
  //   /// setStat(filteredArray)
  // })

  return (
    <div className='hi' >
      <ul className="hi__shoppingcart-ul">
        {shoppingCart.length < 1 ?
          <div className='hi__shoppingcart-empty'>
            Список пуст!! Добавь в карзину товар!
          </div> :
          shoppingCart.map((item, i) => {

            return <Cart key={item.id} item={item} />
          })}
      </ul>
    </div>
  );
}



export default Hi;
