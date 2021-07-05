import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile'
import { Switch, Route } from 'react-router-dom'
import Card from './components/Card';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <LandingPage/>
        </Route>
        <Route path='/testpath'>
          <UserProfile/>
          <Card/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
