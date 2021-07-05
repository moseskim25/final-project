import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import Card from './components/Card';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <LandingPage/>
        </Route>
        <Route path='/testpath'>
          <Card/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
