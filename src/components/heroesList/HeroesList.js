import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const [stateDelete, setStateDelete] = useState(false);
    const { heroes, heroesLoadingStatus, filterHeroes } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        setStateDelete(true);
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, [stateDelete]);


    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    };

    const renderHeroesList = (arr = heroes) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({ id, ...props }) => {
            return <HeroesListItem id={id} key={id} setStateDelete={setStateDelete} {...props} />
        })
    };

    const res = filterHeroes.length < 1 ? heroes : filterHeroes;
    const elements = renderHeroesList(res);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
