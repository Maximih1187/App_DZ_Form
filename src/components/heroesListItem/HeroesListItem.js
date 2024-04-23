
const HeroesListItem = ({ id, name, description, element, setStateDelete }) => {

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const closeHero = (e) => {
        const deleteHero = e.target.id
        fetch(`http://localhost:3001/heroes/${deleteHero}`, { method: 'DELETE' })
            .then(setStateDelete(false))
    }

    return (
        <li key={id}
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="https://avatars.mds.yandex.net/i?id=6d55156a048d6d3663ec379823ed3e410d06df87-12421823-images-thumbs&n=13"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ 'objectFit': 'cover', "scale": "1.1" }} />
            <div className="card-body">

                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={closeHero} id={id} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;
