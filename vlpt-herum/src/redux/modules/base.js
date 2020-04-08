import {Map} from 'immutable';
import {createAction, handleActions} from 'redux-actions';
//헤더 렌더링 여부 설정
const SET_HEADER_VISIBILITY = 'SET_HEADER_VISIBILITY';
//visible
export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY);

const initialState = Map({
    header: Map({
        visible:true
    })
});

export default handleActions({
    SET_HEADER_VISIBILITY: (state,action) =>state.setIn(['header','visible'], action.payload)
},initialState);

/* Duck구조 
    Reducer파일 안에 액션타입과 액션생성자 함수를 함께 넣어 관리함
    이를 모듈이라고 부름
*/