const lists = document.querySelector(".lists");
var listCtn = document.querySelectorAll(".list-ctn");
const showDone = document.getElementById("done");
// checked function
function addChecked(x) {
    x.children[0].children[0].addEventListener("click", () => {
        if (x.children[0].children[0].checked == true) {
            x.classList.add("hide");
        }
    });
}

// show details function
function showDetails(x) {
    x.children[2].addEventListener("click", () => {
        x.lastElementChild.classList.toggle("hide");
    });
}
// Add list
document.getElementById("add-ctn-button").addEventListener("click", function () {
    const task = document.getElementById("task");
    var newlist = document.createElement("TR");
    newlist.classList.add("list-ctn");
    newlist.innerHTML = `<td>
    <input type="checkbox">
    <input type="text" value="${task.value}">
    <button type="button">
    <img class="arrow" src="arrow-down.svg" alt="">
</button>
    <div class="dropdown hide">
        <textarea></textarea>
        <input type="date"> 
    </div>
</td>`;
    lists.appendChild(newlist);
    addChecked(lists.lastChild);
    showDetails(lists.lastChild.children[0]);
});

// hide when checked
for (let i = 0; i < listCtn.length; i++) {
    addChecked(listCtn[i]);
}

// show notes and date
for (let i = 0; i < listCtn.length; i++) {
    showDetails(listCtn[i].children[0]);
}

// show done lists
var show = false;
showDone.addEventListener("click", () => {
    listCtn = document.querySelectorAll(".list-ctn");
    if (!show) {
        listCtn.forEach(element => {
            element.classList.remove("hide");
        });
        show = true;
    } else {
        listCtn.forEach(element => {
            if (element.children[0].children[0].checked == true) element.classList.add("hide");
        });
        show = false;
    }
});
