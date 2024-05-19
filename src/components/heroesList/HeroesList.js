

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes, selectAll } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from '@reduxjs/toolkit';


const HeroesList = () => {
    const { heroesLoadingStatus } = useSelector(state => state.heroes);

    const filterHeroesSelector = createSelector(
        (state) => state.filter.category,
        selectAll,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    const [stateDelete, setStateDelete] = useState(false);
    const dispatch = useDispatch();

    const res = useSelector(filterHeroesSelector)



    useEffect(() => {
        setStateDelete(true);
        dispatch(fetchHeroes());

    }, [stateDelete]);



    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    };



    const renderHeroesList = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({ id, ...props }) => {
            return <HeroesListItem id={id} key={id} setStateDelete={setStateDelete} {...props} />
        })
    };


    const elements = renderHeroesList(res);



    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
