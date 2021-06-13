var lists = document.querySelector(".lists");
const addBtn = document.getElementById("add-btn");
const remain = document.querySelector(".emphasis");
const done = document.getElementById("done").children[0];
const today = new Date().toISOString().substr(0,10);
var remainTasks = 0, doneTasks = 0;
// render
function render() {
    remain.innerHTML = remainTasks;
    done.innerHTML = doneTasks;
}

// checked function
function addChecked(checkBox, element) {
    checkBox.addEventListener("click", () => {
        let content = element.querySelector(".content");
        let deadLine = element.querySelector("input[type='date']").value;
        if (checkBox.checked == true) {
            remainTasks--;
            doneTasks++;
            content.classList.add("done-true");
            setTimeout(() => {
                lists.removeChild(element);
                addNewList(content, deadLine, false);
            }, 400);
        } else {
            remainTasks++;
            doneTasks--;
            content.classList.remove("done-true");
        }
        render();
    });
}

// show detail function 
function addShowDetail(element) {
    let listBar = element.querySelector(".list-bar");
    let dropDown = element.querySelector(".dropdown");
    listBar.addEventListener("click", () => {
        dropDown.classList.toggle("hide");
    })
}

// delete function
function addDelete(element) {
    let deleteItem = element.lastElementChild;
    deleteItem.getElementsByTagName("button")[0].addEventListener("click", () => {
        if(deleteItem.querySelector(".checkbox").checked == true) doneTasks--;
        else remainTasks--;
        render();
        element.removeChild(deleteItem);
    });
}
// add new list function 
function addNewList(task, deadline, condition) {
    if (task.value !== "") {
        let newList = document.createElement("TR");
        newList.classList.add("list-ctn");
        newList.innerHTML = `<td>
    <div class="list-bar">
    <input class="checkbox" type="checkbox">
        <input class="content" type="text" value="${task.value}">
    </div>
    <div class="dropdown hide">
        <input type="date" value="${deadline}">
        <button type="button">Delete</button>
    </div>
</td>`;
        // add checked
        if (condition) {
            remainTasks++;
            render();
        } else {
            newList.classList.add("hide");
        }
        lists.appendChild(newList);
        let checkBox = lists.lastElementChild.querySelector(".checkbox");
        if(!condition) {
            checkBox.checked = true;
            lists.lastElementChild.querySelector(".content").classList.add("done-true");
        }
        addChecked(checkBox, lists.lastElementChild);
        addShowDetail(lists.lastElementChild);
        addDelete(lists);
    }
}
// Add new list
const initDate = document.getElementById("initdate");
initDate.min = today;
document.getElementsByTagName("form")[0].addEventListener("submit", function(event) {
   event.preventDefault();
   const task = document.getElementById("task");
   addNewList(task, initDate.value, true);
   task.value = "";
});
addBtn.addEventListener("click", () => {
    const task = document.getElementById("task");
   addNewList(task, today, true);
   task.value = "";
});

// show done 
let show = false;
document.getElementById("done").addEventListener("click", function() {
    if(!show) {
        this.style.boxShadow = "none";
        this.style.transform = "translateY(4px) translateX(-4px)";
    } else {
        this.style.boxShadow = "-5px 9px rgb(21, 31, 30)";
        this.style.transform = "translateY(-4px) translateX(4px)";
    }
    let listCtn = lists.querySelectorAll(".list-ctn");
    listCtn.forEach(element => {
        if (element.querySelector(".checkbox").checked == true) {
            if(!show) element.classList.remove("hide");
            else element.classList.add("hide");
        }
    });
    show = !show;
});