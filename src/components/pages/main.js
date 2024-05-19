import './scssPages/main.scss'
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

const Main = () => {


      return (
            <div>
                  <div className="contents">
                        <HeroesList />
                        <div className="content__interactive">
                              <HeroesAddForm />
                              <HeroesFilters />
                        </div>
                  </div>
            </div>
      );
}

export default Main;
