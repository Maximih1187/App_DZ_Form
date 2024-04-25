

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров'

//import { useDispatch } from "react-redux";
//import { heroesFetched } from '../../actions';
import { useState } from "react";


const HeroesAddForm = () => {
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [element, setElement] = useState('')
    const { v4: uuidv4 } = require('uuid');

    const hendelSubmit = () => {
        const res = {
            id: uuidv4(),
            name: name,
            description: text,
            element: element,
        }
        console.log(res);
        fetch("http://localhost:3001/heroes", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(res)
        })

    }

    return (
        <form onSubmit={hendelSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <input
                    required
                    onChange={(e) => setText(e.target.value)}
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    value={text}
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    onChange={(e) => setElement(e.target.value)}
                    className="form-select"
                    id="element"
                    value={element}
                    name="element">

                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )

}
export default HeroesAddForm;
