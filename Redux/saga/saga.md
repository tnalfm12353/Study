https://jeonghwan-kim.github.io/dev/2019/07/22/react-saga-ts-1.html   

https://github.com/reactkr/learn-react-in-korean/blob/master/translated/deal-with-async-process-by-redux-saga.md
# SAGA

### 비동기
> *_REQUEST: 비동기 요청        --> 데이터 로딩시까지 화면에 로딩중 메세지  
> *_SUSSESS: 비동기 요청 성공   --> 데이터를 화면에 보여줄 수 있는 단계  
> *_FAILURE: 비동기 요청 실패   --> 실패 원인이나 다음 행동을 유저에게 안내  

## Cycle
> 컴포넌트는 요청 액션을 디스패치해서 스토어에게 비동기 요청을 알림  
> 사가는 스토어로 들어오는 액션을 감시하고 있다가 요청 액션을 발견하면 특정 함수를 실행  
> call() 함수로 API 호출하고 결과 받고 put() 함수로 받은 데이터를 저장하는 액션 발행  
> 리듀서는 이 액션을 받아 스토어에 갱신  

### Function
``` takeLatest()``` 함수는 스토어에 들어오는 액션을 보고 있다가 특정 액션만 잡아서 로직을 수행

``` call() ``` 함수는 인자로 받은 함수를 실행

``` put() ``` 함수로 받은 데이터를 저장하는 액션을 발행

