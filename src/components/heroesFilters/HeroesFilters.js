
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryFilter, buttonFilterFetch } from '../heroesFilters/filterSlice';

const HeroesFilters = () => {

    const { category, stateButtons } = useSelector(state => state.filter)
    const dispath = useDispatch()

    useEffect(() => {
        dispath(buttonFilterFetch());
    }, []);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {stateButtons.map((item) => {
                        return <button
                            onClick={(e) => dispath(categoryFilter(e.target.id))}
                            id={item.key}
                            key={item.key}
                            disabled={category === item.key}
                            className={item.className}
                        >{item.name}</button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
