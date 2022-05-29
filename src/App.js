import { BrowserRouter as Router, Routes , Route, Link} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from 'react-query'
import './App.css';
import {HomePage} from './components/Home.page'
import {RQSuperHeroesPage} from './components/RQSuperHeroes.page'
import {SuperHeroesPage} from './components/SuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
