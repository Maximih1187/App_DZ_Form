import React from 'react';
import { useEffect, useState } from 'react'
import './scssPages/hi.scss'
import { useSelector, useDispatch } from 'react-redux';
import { deleteShoppingCart, addChardAfterDeleteChars } from './slicePages/aboutSlice';


const Cart = (props) => {

	const dispatch = useDispatch()
	const { v4: uuidv4 } = require('uuid');
	//const shoppingCart = useSelector(state => state.aboutSlice.shoppingCart)
	const [count, setCount] = useState(1)


	const deleteItem = (id) => {
		dispatch(addChardAfterDeleteChars(id))
		dispatch(deleteShoppingCart(id));

	}

	const incr = () => {
		if (count < 10)
			setCount(count + 1)
	}
	const decr = () => {
		if (count > 1)
			setCount(count - 1)
	}

	const { id = Number(id), thumbnail, description, name } = props.item;

	return (
		<>

			<li key={id} className='hi__shoppingcart-list'>
				<div className="hi__shoppingcart-wrapper">
					<div className='hi__shoppingcart-list-name'>{name}</div>
					<div className='hi__shoppingcart-list-descr'>{description}</div>
					<img src={thumbnail} className='hi__shoppingcart-list-img'></img>
					<div onClick={() => deleteItem(id)} id={id} className='hi__shoppingcart-delete'>❌
					</div>
				</div>
				<div className="hi__shoppingcart-select">
					<div className="hi__shoppingcart-selector">
						<div onClick={incr} id={id} className="hi__shoppingcart-selector-incr">+</div>
						<div id={id} className="hi__shoppingcart-selector-summ">{count}</div>
						<div onClick={decr} id={id} className="hi__shoppingcart-selector-decr">-</div>
					</div>
					<input
						type='checkbox'
						className='hi__shoppingcart-checkbox'
						id={id}
						//onChange={}
						//checked={stat}
						//onClick={(e) => setStat(e)}
						name="terms" />
				</div>

			</li>
		</>
	);
}

export default Cart;
