// 유저가 값을 입력한다.
// + 버튼을 클릭하면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.

// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만, 진행중탭은 진행중아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);


for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask() {
    
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    };
    taskList.push(task);
    render();    
}

// render : UI를 업데이트 해주는 함수
function render() {
    let resultHTML = '';
    let list = [];

    if(mode == "all") {
        list = taskList;
    } else if(mode == "ongoing" || mode == "done") {
        list = filterList;
    } 

    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task task-done">
            <div>${list[i].taskContent}</div>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
            </div>`;
        } else {
            resultHTML += ` <div class="task">
                <div>${list[i].taskContent}</div>
                <div class="button-box">
                     <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
                     <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
                </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id === id) {
            // 현재값의 반대값을 출력한다.
            // true였으면 false를 출력한다.
            taskList[i].isComplete= !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];
    
    if(mode == "all") {
        render();

    } else if(mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();

    } else if(mode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}