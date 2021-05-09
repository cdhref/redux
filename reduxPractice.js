import {createStore} from 'redux'

export default function t(){

    var store = createStore(
        reducer
        //redux debugger
        ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    var root = document.getElementById('root');
    
    function reducer(state, action){
        // state 직접 변경하면 안됨.
        // 기본값으로 노란색
        if(state === undefined){
            return {color: 'yellow'};
        }
    
        var newState;
        if(action.type === 'CHANGE_COLOR'){
            newState = Object.assign({}, state, {color: action.color});
        }
        console.log(action.type, action, state, newState);
        return newState;
    }
    
    //버튼 추가
    function addButton(color){
        var btn = document.createElement('input');
        btn.type = 'button';
        btn.value = color;
        btn.addEventListener('click', () => {
            store.dispatch({type: 'CHANGE_COLOR', color: color});
        });
        root.appendChild(btn);
    }
    function addDiv(color){
        var div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.margin = '10px';
        div.id = color;
        div.style.backgroundColor = store.getState().color;
        root.appendChild(div);
    }
    function changeRed(){
        var state = store.getState();
        document.getElementById('red').style.backgroundColor = state.color;
    }
    function changeGreen(){
        var state = store.getState();
        document.getElementById('green').style.backgroundColor = state.color;
    }
    function changeBlue(){
        var state = store.getState();
        document.getElementById('blue').style.backgroundColor = state.color;
    }
    addButton('red');
    addButton('green');
    addButton('blue');
    
    addDiv('red');
    addDiv('green');
    addDiv('blue');
    
    // subscribe를 통해 등록 된 함수는 State가 변경 될때마다 호출 됨.
    store.subscribe(changeRed);
    store.subscribe(changeGreen);
    store.subscribe(changeBlue);
}