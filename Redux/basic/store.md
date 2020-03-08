# 스토어  
**스토어**는 "무엇이 일어날지" 나타내는 **액션**과 이 액션에 따라 상태를 수정하는 **리듀서**를 함께 가져오는 객체임.  
> 앱의 상태를 저장  
>```getState()```를 통해 상태에 접근함  
>```dispatch(action)```를 통해 상태를 수정할 수 있음  
>```subscribe(listener)```를 통해 리스너를 등록함  

#### Redux는 단 하나의 스토어만 가질 수 있음!
만약 데이터를 다루는 로직을 쪼개고 싶다면, 여러개의 스토어대신 **리듀서**조합을 사용할 수 있음  

```combineReducers()```를 통해 여러 리듀서를 합쳤는데  
이것을 가져와서 ```createStore()```에 넘김  
```
import {creatStore} from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp);
// 두번째 인수로 초기 상태를 지정해줄 수도 있음.  
// redux앱의 상태와 일치하도록 클라의 상태를 채워줄때 유용  
// let store = creatStore(todoApp, window.STATE_FROM_SERVER)