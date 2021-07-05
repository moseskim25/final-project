import Registration from './components/Registration';
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage';
import { Switch, Route } from 'react-router-dom'
import helper from './hooks/helper';

function App() {

  const { createUser, createUserGeneral } = helper();

  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <Navbar/>
          <Registration createUser={createUser}/>
        </Route>
        <Route path='/register'>
          <Navbar />
          <Registration createUser={createUser} createUserGeneral={createUserGeneral}/>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
