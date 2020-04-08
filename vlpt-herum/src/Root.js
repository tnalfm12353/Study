import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import App from './App';
/* 
    props로 리덕스 스토어를 받음
    index.js에서 리덕스 스토어를 생성 한 후 Root 컴포넌트에 전달해주고
    Provider컴포넌트를 이 파일에서 설정
*/
class Root extends React.Component{
  
    render(){
        return(
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
            );
    }
}

export default Root;