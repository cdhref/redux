# redux 설치
npm i --save redux

# dev-tools
크롬 웹 확장 기능에서 없어진 후 github의 내용을 보고 설치하는 방법으로 사용 가능.
다음 링크 참조
https://github.com/reduxjs/redux-devtools

# redux 개요

## render
state값이 변경 된 경우에만 rendering

## state변경 시 자동으로 화면갱신
subscribe를 통해 등록가능

## state수정
action발생 > dispatch > reducer가 state를 변경 > 변경 된 state를 subscribe >
render호출 > getState함수 호출 > state참조 > rendering

