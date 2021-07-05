import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <LandingPage/>
        </Route>
        <Route path='/hello'>
          <p>why</p>
          <UserProfile/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
