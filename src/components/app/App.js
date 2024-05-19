import { Header, Footer, Hi, Main, FormRegisr, About } from '../pages/ImportPages'
import { Routes, Route } from 'react-router-dom';
import './app.scss';

const App = () => {

    return (
        <main className="app">
            <Header />
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/hi' element={<Hi />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/register' element={<FormRegisr />} />
                </Routes>
            </div>

            <Footer />
        </main>
    )
}

export default App;
