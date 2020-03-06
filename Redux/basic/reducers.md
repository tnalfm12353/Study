# 리듀서

**액션**은 무언가 일어난다는 사실을 기술하지만,  
**리듀서**는 앱의 상태가 어떻게 바뀌는지 특정함.

# 상태 설계하기!

Todo 앱을 위해 두 가지를 저장하고 싶음  
> 현재 선택된 필터

> 할일의 실제 목록

# 액션 다루기  
리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 **순수 함수**  
```
(previousState, action) => newState
```
이 형태의 함수를  
```
Array.prototype.reduce(reducer, ?initialValue)
```
로 넘길 것이기 때문에 리듀서라고 부름.

### Cf) 리듀서에서 하지 말아야 할 것들!
> 인수들을 변경(mutate)하면 안됨.  
> API 호출이나 라우팅 전환같은 사이드이팩트를 일으키면안됨!!  
> Date.now() 나 Math.random() 같이 순수하지 않은 함수를 호출하면 안됨!  
**인수가 주어지면 다음 상태를 계산해서 반환하면 됨.**  
**사이드 이팩트 x, API호출 x, 변경 x, 계산 o**

## 초기 상태  
Redux는 처음에 리듀서를 undefined 상태로 호출함.  
```
import {VisibilityFilters} from './actions'

const initialState ={
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
}
//ES6
function todoApp(state = initialState, action){
    // 지금은 아무 액션도 다루지 않고
    // 주어진 상태를 그대로 반환합니다.
    return state
}
```
## 액션 다루기
SET_VISIBILITY_FILTER 처리 -> 상태에서 visibilityFilter을 바꾸는 것뿐.
```
function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({},state,{
                visibilityFilter: action.filter
            });
    default:
        return state
    }
}
  //state를 변경하지 않고 Object.assign()을 통해 본사본을 만듦.
  //default 케이스에 대해 이전의 state를 반환함.
```

>#### Object.assign()은 ES6의 일부이지만, 대부분 브라우저에 구현되지 않음. Babel플러그인 사용할것.  concat 함수를 사용한적 있는것 같음.  

>####  Switch문은 보일러플레이트가 아님. [보일러플레이트 줄이기](https://deminoth.github.io/redux/recipes/ReducingBoilerplate.html)

## 더 많은 액션 다루기
```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
        return Object.assign({}, state, {
            visibilityFilter: action.filter
    });
    case ADD_TODO:
        return Object.assign({}, state, {
            todos: [...state.todos, {
                text: action.text,
                completed: false
            }]
    });
    case COMPLETE_TODO:
        return Object.assign({}, state, {
            todos: [
            ...state.todos.slice(0, action.index),
            Object.assign({}, state.todos[action.index], {
                completed: true
            }),
            ...state.todos.slice(action.index + 1)
            ]
    });    
  default:
    return state;
  }
}
```
이런 코드를 자주 작성 해야 한다면 React.addons.update, updeep 같은 헬퍼나  
Immutable같이 깊은 수정을 지원하는 라이브러리를 사용하는 걸 추천.  
**state를 복사하기 전엔 그 안의 무엇에도 할당하지 말아야함!**

## 리듀서 쪼개기!  
```
//관리할 상태의 조각만을 넘기고
function todoApp(state = initialState, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    });
  case ADD_TODO:
  case COMPLETE_TODO:
    return Object.assign({}, state, {
      todos: todos(state.todos, action)
    });
  default:
    return state;
  }
}

//조각을 어떻게 수정할지
function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}
```
**Redux앱을 만드는 기본 패턴**  

visibilityFilter만 관리하는 리듀서로 쪼개기
```
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}
```

각각의 리듀서는 전체 상태에서 **자신의 부분**만을 관리함.  
=> 앱이 커지면 리듀서를 별도의 파일로 분리해서 완전히 독립적이고 다른 데이터 도메일을 관리할 수 있음.  

### Cf)combineReducer() (보일러플레이트)
이를 이용하면 todoApp을 이렇게 재작성 할 수 있음.  
```
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
```
이는 아래와 완전히 의미가 같은 코드임.  
```
export default function todoApp(state, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
```
이들에게 서로 다른 키를 주거나, 다른 함수를 호출할 수도 있음.
```
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
});
```
이는 아래와 완전히 의미가 같은 코드임.
```
function reducer(state, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  };
}
```
```combineReducers()```은 리듀서들을 **키에 따라 선택해서 잘라낸 상태들**로 호출하고  
그 결과를 하나의 객체로 합쳐주는 함수를 만드는 것 뿐임

### Cf) 관계에 대한 한마디 
> 앱의 상태를 가능한 중첩되지 않도록 정규화를 해야함.  
> 모든 개채가 ID를 키로 가지고, ID로 개체나 목록을 참조!  
> Ex)
>```
>todosById: {id -> todo} 
>```
>Or
>```
>todos:array<id>    
>```

