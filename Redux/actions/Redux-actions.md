https://velopert.com/3358

# Redux-actions
```redux-actions``` 패키지에는 리덕스의 액션들을 관리하기 위한 유용한 ```createAction```과 ```handleActions```가 있음.

## createAction을 통한 액션 생성 자동화
기존 우리가 만드는 액션 코드
```
export const increment = (index) => ({
    type: type.INCREMENT,
    index
});

export const decrement = (index) => ({
    type: type.DECREMENT,
    index
});
```
파라미터로 전달받은 값을 객체에 넣어주는 것 뿐임.  

createAction을 사용하면 위 작업을 자동화 시켜줌.
```
export const increment = createAction(types.INCREMENT);
export const decrement = createAction(types.DECREMENT);
```
파라미터로 전달받은 값을 액션의 **payload** 값으로 설정해줌  

## switch문 대신 handleAction 사용
switch문을 사용하면 **scope**가 리듀서 함수로 설정되어있음.  
때문에 서로 다른 case에서 let이나 const를 통해 이름이 같은 변수를 만들시 에러가 발생함.  
이것을 해결해주는게 **handleActions** 임.
```
const reducer = handleActions({
  INCREMENT: (state, action) => ({
    counter: state.counter + action.payload
  }),

  DECREMENT: (state, action) => ({
    counter: state.counter - action.payload
  })
}, { counter: 0 });
```
첫번째 파라미터로는 액션에 따라 실행 할 함수들을 가지고 있는 객체  
두번째 파라미터로는 상태의 기본 값(initialState)를 넣어주면 됨.
