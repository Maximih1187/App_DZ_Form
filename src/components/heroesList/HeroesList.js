
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const [stateDelete, setStateDelete] = useState(false);
    const { heroes, heroesLoadingStatus, } = useSelector(state => state.heroes);
    const { filterHeroes } = useSelector(state => state.filter)
    const dispatch = useDispatch();

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

    const res = filterHeroes.length === 0 ? heroes : filterHeroes;
    const elements = renderHeroesList(res);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
