import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <Registration/>
        </Route>
        <Route path='/hello'>
          <p>why</p>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
