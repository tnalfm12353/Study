# Redux 기초

**액션**은 앱에서 스토어로 보내는 데이터 묶음. 액션이 스토어의 유일한 정보원 **store.dispatch()** 를 통해 이들을 보낼 수 있음.
액션의 예시
```
 const ADD_TODO = 'ADD_TODO'

{
	type: ADD_TODO,
	text: 'Build my first Redux app'
}
```
일반적으로 문자열 상수로 정의 되는 type 속성을 가져야 함.  
cf) 앱이 커지면 타입들을 별도의 모듈로 분리할 수도 있음.  
ex)import {ADD_TODO, REMOVE_TODO} from '../actionTypes'  
### 왜 문자열 상수로 정의되어야 하냐? (보일러플레이트)
>사실 꼭 상수로 정의할 필요는 없지만 규모가 커지면 상수를 정의해서 얻을 수 있는 장점이 있음.
>코드베이스를 깨끗하게 유지하기 위한 실용적인 팁임.

>베열 안에 저장되기 떄문에 우리는 특정한 TODO를 index를 통해 참조 가능. 유일한 **ID**를 부여하는게 더 좋음.
```
{
    type: COMPLETE_TODO,
    index: 5
}
```

## 액션 생성자는 액션을 만드는 함수.
Redux의 액션 생성자는 단지 액션을 반환함.  
ex) 
```
function addTodo(text){
 return {
   	type: ADD_TODO,
	text
          }
}
```
실제로 액션을 보내려면 결과값을 **dispatch()** 함수에 넘김  
ex)
```
dispatch(addTodo(text))
dispatch(completeTodo(index))
```
# OR 바인드 된 액션 생성자
```
const boundAddTodo = (text) => dispatch(addTodo(text))  
const boundCompleteTodo = (index) => dispatch(completeTodo(index))
```
바로 호출가능
보통 react-redux의 **connect()** 같은 헬퍼로 접근할 것임.  
여러 액션 생선자를 바인드하기 위해 **bindActionCreators()**를 사용할수도 있음.