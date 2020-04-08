import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Home,Auth} from './pages';
import HeaderContainer from './containers/Base/HeaderContainer.jsx';

function App() {
  return (
    <Router>
      <HeaderContainer/>
      <Route exact path="/" component={Home}/>
      <Route path="/auth" component={Auth}/>
    </Router>
  );
}

export default App;
