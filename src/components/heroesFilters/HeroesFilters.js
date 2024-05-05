
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFilter, categoryFilter } from '../heroesFilters/filterSlice';

const HeroesFilters = () => {

    const { request } = useHttp();
    const [stateButtons, setStateButtons] = useState([])
    const { heroes } = useSelector(state => state.heroes)
    const { category } = useSelector(state => state.filter)

    const dispath = useDispatch()

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setStateButtons(data))
            .catch(() => console.log("Ошибка загрузки"))
        dispath(heroesFilter(heroes))
    }, [category]);


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {stateButtons.map((item) => {
                        return <button disabled={category === item.key} onClick={(e) => dispath(categoryFilter(e.target.id))} id={item.key} key={item.key} className={item.className}>{item.name}</button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
