# redux 설치
npm i --save redux

# redux 실행
npm run dev

# dev-tools
크롬 웹 확장 기능에서 없어진 후 github의 내용을 보고 설치하는 방법으로 사용 가능.
다음 링크 참조
https://github.com/reduxjs/redux-devtools

# redux 개요

## render
state값이 변경 된 경우에 subscribe에 등록 된 함수를 호출하여 화면 rendering 처리

## state변경 시 자동으로 화면갱신
subscribe를 통해 등록가능

    function reducer(state, action){
        var newState = [];
        ................
        return newState;
    }
    var store = createStore(
        reducer
        //chrome redux 개발자 툴
        ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    store.subscribe('function name');

## state 변경 시의 처리 순서
action발생 > dispatch > reducer가 state를 변경 > state 변경callback 함수를 subscribe > callback 내부에서 getState함수 호출 > 변경 된 state참조 > rendering

