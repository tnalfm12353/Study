# 데이터의 흐름  
Redux는 일방향 데이터 흐름을 따라 전개됨  
> 앱 내의 모든 데이터가 같은 생명주기 패턴을 따름  
> 앱의 로직을 좀 더 예측가능하게 하고 이해하기도 쉽게 만듦  
> 데이터 정규화를 도와서 같은 데이터의 복제본들이 서로를 모르는 여럿으로 나줘지고 말지 않도록 해줌 ..?  


## Redux의 4단계 생명주기

### 1.store.dispatch(action)을 호출  
우리가 ```store.dispatch(action)```을 앱 내의 어디서나 호출할 수 있음.


### 2.Redux 스토어는 내가 지정한 리듀서 함수들을 호출함  
스토어는 리듀서에 현재의 상태 트리와 액션 두 가지 인수를 넘김.  
Ex)
```
// 앱의 현재 상태(할일 목록과 선택된 필터)
let previousState={
    visibleTodoFilter:'SHOW_ALL',
    todos:[{
        text: 'Read the docs.',
        complete: false
    }]
};

// 실행되는 액션(할일 추가)
let action ={
    type: 'ADD_TODO',
    text: 'Understand the flow.'
};

//리듀서가 다음 상태를 반환함
let nextState = todoApp(previousState,action);

```

리듀서는 단지 다음 상태를 **계산**하는 순수 함수  
완전히 예측 가능해야함!  
절대로 API호출이나 라우터 전환 같은 사이드 이팩트를 일으켜서는 안됌!  
-> 이런 일들은 **액션이 전달되기 전에** 행해야함

## 3.루트 리듀서가 각 리듀서의 출력을 합쳐서 하나의 상태 트리로 만듦.

Redux는 루트 리듀서를 각각이 상태트리의 가지 하나씩을 다루는 함수들로 나눌 수 있도록 ```combineReducers()``` 헬퍼 함수를 제공함  
Ex)  
```
function todos(state = [], action){
    //할일 목록
    return nextState;
}

function visibleTodoFilter(state = 'SHOW_ALL',action){
    //선택된 필터 설정
    return nextState;
}

let todoApp = combinReducers({
    todos,
    visibleTodoFilter
});
```
액션을 보내면, ```combineReducers```가 반환한 todoApp은 두 리듀서를 모두 호출함
```
let nextTodos = todos(state.todos, action);
let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter,action);
```
이 두 결과를 합쳐서 하나의 상태 트리로 만듦.
```
return {
    todos:nextTodos,
    visibleTodoFilter: nextVisivleTodoFilter
};
```
## Redux 스토어가 루트 리듀서에 의해 반환된 상태 트리를 저장함
```store.subscribe(listener)```를 통해 등록된 모든 리스너가 불러지고  
이들은 현재 상태를 얻기위해 ```store.getState()```를 호출함.