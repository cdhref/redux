import {$CombinedState, createStore} from 'redux'
import practice from './reduxPractice'


//practice();
var root = document.getElementById('root');

var store = createStore(
    reducer
    //chrome redux 개발자 툴
    ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
drawUI();    

function reducer(state, action){
    // state 직접 변경하면 안됨.
    // 기본값으로 노란색
    if(state === undefined){
        return {rows: []};
    }

    var newState = {rows: []};
    if(action.type === 'CREATE_DATA'){
        var rows = [...state.rows];
        var is_dup = false;
        rows.map((v) => {
            if(v.title == action.title){
                is_dup = true;
            }
        });
        if(is_dup){
            return state;
        }
        rows.push({title: action.title});
        console.log(rows);
        newState = Object.assign({}, state, {rows: rows});
    }
    else if(action.type === 'DELETE_DATA'){
        var result = [];
        var cnt = 0;
        state.rows.map((v) => {
            if(v.title !== action.title){
                result.push({title: v.title});
            }
            else{
                if(cnt > 0){
                    result.push({title: v.title});
                }
                cnt++;
            }
        });
        newState.rows = result;
    }
    else if (action.type === 'UPDATE_DATA'){
        var result = [];
        state.rows.map((v) => {
            if(v.title !== action.selVal){
                result.push({title: v.title});
            }
            else{
                result.push({title: action.title});   
            }
        });
        newState.rows = result;
    }
    console.log(action.type, action, state, newState);
    return newState;
}

// 화면에 UI출력. redux와 무관한 내용.
function drawUI(){
    var title = document.createElement('h2');
    title.innerText = 'Redux CRUD';
    root.appendChild(title);

    makeTable();
    drawData();
    drawInput();
    drawBtnGroup();
}

// redux state변경 시 호출 될 function
function drawData(){
    var state = store.getState();
    var tb = document.getElementById('table');
    var rows = state.rows;
    tb.innerHTML = '';
    if(rows.length === 0){
        var li = document.createElement('li');
        li.innerHTML = `<h3>등록 된 데이터가 없습니다.</h3>`;
        tb.appendChild(li);
    }
    else{
        rows.map((v, i) => {
            var li = document.createElement('li');
            console.log(v.title);
            li.innerHTML = `<a href="#" id="title${i}">${v.title}</a>`;
            li.addEventListener('click', function (){
                document.getElementById('selected_val').value = this.children[0].innerHTML;
            });
            tb.appendChild(li);
        });
    }
}
// UI 관련..
function makeTable(){
    var ul = document.createElement('ul');
    ul.id = 'table';
    var li = document.createElement('li');
    
    ul.appendChild(li);
    root.appendChild(ul);
}
// UI 관련..
function drawInput(){
    var div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.marginLeft = '7px';
    root.appendChild(div);
    var label = document.createElement('label');
    label.innerText = '입력 : ';
    div.appendChild(label);
    var inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'title';
    inputText.style.paddingTop = '2px';
    inputText.style.width = '210px';
    div.appendChild(inputText);
    div.appendChild(document.createElement('br'));

    var label2 = document.createElement('label');
    label2.innerText = '선택 된 값 : ';
    div.appendChild(label2);
    var inputText2 = document.createElement('input');
    inputText2.type = 'text';
    inputText2.id = 'selected_val';
    inputText2.readOnly = true;
    inputText2.style.paddingTop = '2px';
    inputText2.style.width = '167px';
    div.appendChild(inputText2);
    div.appendChild(document.createElement('br'));
    var inputText3 = inputText2.cloneNode();
    var label3 = label2.cloneNode();
    inputText3.id = 'updt_val';
    inputText3.readOnly = false;
    label3.innerText = '수정 될 값 : ';
    div.appendChild(label3);
    div.appendChild(inputText3);
}
// UI 관련..
function drawBtnGroup(){
    var btnCreate = document.createElement('input');
    btnCreate.type = 'button';
    btnCreate.value = '등록';
    btnCreate.style.cursor = 'pointer';
    btnCreate.classList.add('btn-navy');
    btnCreate.addEventListener('click', () => {
        createData();
    });
    var btnUpdate = btnCreate.cloneNode(true);
    btnUpdate.addEventListener('click', () => {
        updateData();
    });
    btnUpdate.value = '수정';
    var btnDelete = btnCreate.cloneNode(true);
    btnDelete.value = '삭제';
    btnDelete.classList.remove('btn-navy');
    btnDelete.classList.add('btn-remove');
    btnDelete.addEventListener('click', () => {
        deleteData();
    });
    root.appendChild(btnCreate);
    root.appendChild(btnUpdate);
    root.appendChild(btnDelete);
}

// redux state에 데이터 추가 요청
function createData(){
    var elemTitle = document.getElementById('title');
    if(elemTitle.value === ''){
        alert('등록 할 데이터를 입력 해 주세요.');
        elemTitle.focus();
        return;
    }
    else{
        store.dispatch({type: 'CREATE_DATA', title: elemTitle.value});
        document.getElementById('title').value = '';
    }
}

// redux state에 데이터 수정 요청
function updateData(){
    var elemSelVal = document.getElementById('selected_val');
    var elemUpdtVal = document.getElementById('updt_val');
    if(elemSelVal.value === ''){
        alert('수정 할 데이터를 선택 해 주세요.');
        return;
    }
    else if(elemUpdtVal.value === ''){
        alert('수정 될 값을 입력 해 주세요.');
        elemUpdtVal.focus();
        return;
    }
    else{
        store.dispatch({type: 'UPDATE_DATA', selVal: elemSelVal.value, title: elemUpdtVal.value});
        elemSelVal.value = '';
        elemUpdtVal.value = '';
    }
}

// redux state에 데이터 삭제 요청
function deleteData(){
    var selVal = document.getElementById('selected_val').value;
    if(selVal === ''){
        alert('삭제 할 데이터를 선택 해 주세요.');
        return;
    }
    else{
        store.dispatch({type: 'DELETE_DATA', title: selVal});
        document.getElementById('selected_val').value = '';
    }
}
// state변경 시 자동으로 drawData함수가 호출 되도록 설정
store.subscribe(drawData);