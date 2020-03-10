import React from 'react';
import Footer from './jsx/components/footer.jsx'
import AddTodo from './jsx/components/AddTodo.jsx'
import VisibleTodoList from './jsx/containers/VisibleTodoList.jsx'
class App extends React.Component{
  render(){
    return(
      <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
      </div>
    );
  }
}

export default App;
