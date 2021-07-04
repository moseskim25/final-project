import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import General from './components/Registration/General';
import { Switch, Route } from 'react-router-dom'
import {createUser} from './hooks/helper';
import {createUserGeneral} from './hooks/helper';

function App() {
  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <Registration createUser={createUser}/>
        </Route>
        <Route path='/register'>
          <Navbar />
          <General createUserGeneral={createUserGeneral}/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
