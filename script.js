var lists = document.querySelector(".lists");
const addBtn = document.getElementById("add-btn");
const remain = document.querySelector(".emphasis");
const done = document.getElementById("done").children[0];
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
        if (checkBox.checked == true) {
            remainTasks--;
            doneTasks++;
            content.classList.add("done-true");
            setTimeout(() => {
                lists.removeChild(element);
                addNewList(content, false);
            }, 400);
        } else {
            remainTasks++;
            doneTasks--;
            content.classList.remove("done-true");
        }
        render();
    });
}

// add new list function 
function addNewList(task, condition) {
    if (task.value !== "") {
        let newList = document.createElement("TR");
        newList.classList.add("list-ctn");
        newList.innerHTML = `<td>
    <div class="list-bar">
    <input class="checkbox" type="checkbox">
        <input class="content" type="text" value="${task.value}">
    </div>
    <div class="dropdown hide">
        <input type="date">
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
    }
}
// Add event for add
addBtn.addEventListener("click", () => {
    const task = document.getElementById("task");
    addNewList(task, true);
    task.value = "";
});

// show done 
let show = false;
document.getElementById("done").addEventListener("click", function() {
    if(!show) {
        this.style.fontWeight = "bold";
        this.style.color = "black";
        this.style.fontSize = "4em";
    } else {
        this.style.fontWeight = "500";
        this.style.color = "#aaa";
        this.style.fontSize = "3em";
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