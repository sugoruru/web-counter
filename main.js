document.getElementById("addCounterButton").addEventListener("click", addCounter);
document.getElementById("cancel").addEventListener("click", addCancel);
document.getElementById("add").addEventListener("click", add);
document.getElementById("minusCounterButton").addEventListener("click", delete_counter);
document.getElementById("delete_cancel").addEventListener("click", delete_cancel);
document.getElementById("delete").addEventListener("click", counter_delete);
let data = {
    "title": [],
    "number": []
}

function addCounter() {
    document.getElementById("addtitle").value = "";
    document.getElementById("add_ok").innerHTML = "";
    document.getElementById("addCounterOptions").style.visibility = "visible";
    document.getElementById("addCounterOptions").style.zIndex = "2";
    document.getElementById("addCounterOptions").style.opacity = 1;
}

function addCancel() {
    document.getElementById("addCounterOptions").style.zIndex = "-1";
    document.getElementById("addCounterOptions").style.opacity = 0;
    setTimeout(function() { document.getElementById("addCounterOptions").style.visibility = "hidden" }, 1000)
}

function add() {
    let add_title = document.getElementById("addtitle").value;
    if (add_title !== "" && data["title"].indexOf(add_title) === -1) {
        data["title"].push(add_title);
        data["number"].push(0);
        document.getElementById("add_ok").style.color = "#5ac8ab";
        document.getElementById("add_ok").style.fontSize = "15px";
        document.getElementById("add_ok").style.marginTop = "3px";
        document.getElementById("add_ok").innerHTML = "保存しました！";
        let new_ele = document.createElement("div");
        new_ele.style.width = "300px";
        new_ele.style.height = "300px";
        new_ele.style.borderRadius = "10px";
        new_ele.style.margin = "20px";
        new_ele.style.display = "inline-block";
        new_ele.style.position = "relative";
        new_ele.style.top = "100px";
        new_ele.style.left = "50px";
        new_ele.style.backgroundColor = "#666";
        new_ele.style.zIndex = "0";
        new_ele.style.border = "2px solid #000";
        new_ele.id = add_title;
        document.body.appendChild(new_ele);
        new_ele = document.createElement("h1");
        new_ele.style.textAlign = "center";
        new_ele.style.color = "#fff";
        if (String(add_title).length > 8) new_ele.style.fontSize = 200 / (String(add_title).length);
        new_ele.innerHTML = add_title;
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("button");
        new_ele.style.borderRadius = "100%";
        new_ele.style.width = "60px";
        new_ele.style.height = "60px";
        new_ele.style.border = "2px solid #000";
        new_ele.style.backgroundColor = "#8ab"
        new_ele.style.position = "relative";
        new_ele.id = `Button${add_title}`;
        new_ele.style.left = "90px";
        new_ele.style.fontSize = "40px";
        new_ele.innerHTML = "+";
        new_ele.onclick = counter_click.bind(add_title);
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("button");
        new_ele.style.borderRadius = "100%";
        new_ele.style.width = "60px";
        new_ele.style.height = "60px";
        new_ele.style.border = "2px solid #000";
        new_ele.style.backgroundColor = "#8ab"
        new_ele.style.position = "relative";
        new_ele.id = `Button${add_title}`;
        new_ele.style.top = "-5px";
        new_ele.style.left = "90px";
        new_ele.style.fontSize = "20px";
        new_ele.innerHTML = "reset";
        new_ele.onclick = counter_reset.bind(add_title);
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("div");
        new_ele.id = `div${add_title}`;
        new_ele.className = "counterDiv";
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("option");
        new_ele.textContent = add_title;
        new_ele.id = `option${add_title}`;
        document.getElementById("select_option").appendChild(new_ele);
        addCancel();
    } else {
        document.getElementById("add_ok").style.color = "red";
        document.getElementById("add_ok").style.fontSize = "15px";
        document.getElementById("add_ok").style.marginTop = "3px";
        if (add_title === "") document.getElementById("add_ok").innerHTML = "タイトルが指定されていません";
        if (data["title"].indexOf(add_title) !== -1) document.getElementById("add_ok").innerHTML = "同じタイトルが使用されています。";
    }
}

function mainloop() {
    if (data["number"].indexOf(1000000000000) !== -1) data["number"][data["number"].indexOf(1000000000000)] = 0;
    for (const property of data["title"]) {
        document.getElementById(`div${property}`).innerHTML = data["number"][data["title"].indexOf(property)];
    }
    localStorage.setItem("title", data["title"]);
    localStorage.setItem("number", data["number"]);
}

function counter_click() {
    data["number"][data["title"].indexOf(String(this))]++;
}

function counter_reset() {
    data["number"][data["title"].indexOf(String(this))] = 0;
}

function delete_counter() {
    if (data["title"].length !== 0) {
        document.getElementById("select_option_box").style.zIndex = "2";
        document.getElementById("select_option_box").style.visibility = "visible";
        document.getElementById("select_option_box").style.opacity = 1;
    } else {
        document.getElementById("not_delete").style.visibility = "visible";
        document.getElementById("not_delete").style.opacity = "1";
        setTimeout(function() { document.getElementById("not_delete").style.opacity = "0" }, 1000);
    }
}

function delete_cancel() {
    document.getElementById("select_option_box").style.zIndex = "-1";
    document.getElementById("select_option_box").style.visibility = "hidden";
    document.getElementById("select_option_box").style.opacity = 0;
}

function counter_delete() {
    let id = document.getElementById("select_option").value;
    let id_num = data["title"].indexOf(id);
    let id2 = document.getElementById(id);
    id2.remove();
    data["title"].splice(id_num, 1);
    data["number"].splice(id_num, 1);
    document.getElementById(`option${id}`).remove();
    delete_cancel();
}
setInterval(mainloop, 20);
window.onload = function() {
    let data_title = JSON.parse(localStorage.getItem("title"));
    let data_number = JSON.parse(localStorage.getItem("number"));
    for (let i = 0; i < data_title.length; i++) {
        let add_title = data_title[i];
        data["title"].push(data_title[i]);
        data["number"].push(data_number[i]);
        let new_ele = document.createElement("div");
        new_ele.style.width = "300px";
        new_ele.style.height = "300px";
        new_ele.style.borderRadius = "10px";
        new_ele.style.margin = "20px";
        new_ele.style.display = "inline-block";
        new_ele.style.position = "relative";
        new_ele.style.top = "100px";
        new_ele.style.left = "50px";
        new_ele.style.backgroundColor = "#666";
        new_ele.style.zIndex = "0";
        new_ele.style.border = "2px solid #000";
        new_ele.id = add_title;
        document.body.appendChild(new_ele);
        new_ele = document.createElement("h1");
        new_ele.style.textAlign = "center";
        new_ele.style.color = "#fff";
        if (String(add_title).length > 8) new_ele.style.fontSize = 200 / (String(add_title).length);
        new_ele.innerHTML = add_title;
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("button");
        new_ele.style.borderRadius = "100%";
        new_ele.style.width = "60px";
        new_ele.style.height = "60px";
        new_ele.style.border = "2px solid #000";
        new_ele.style.backgroundColor = "#8ab"
        new_ele.style.position = "relative";
        new_ele.id = `Button${add_title}`;
        new_ele.style.left = "90px";
        new_ele.style.fontSize = "40px";
        new_ele.innerHTML = "+";
        new_ele.onclick = counter_click.bind(add_title);
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("button");
        new_ele.style.borderRadius = "100%";
        new_ele.style.width = "60px";
        new_ele.style.height = "60px";
        new_ele.style.border = "2px solid #000";
        new_ele.style.backgroundColor = "#8ab"
        new_ele.style.position = "relative";
        new_ele.id = `Button${add_title}`;
        new_ele.style.top = "-5px";
        new_ele.style.left = "90px";
        new_ele.style.fontSize = "20px";
        new_ele.innerHTML = "reset";
        new_ele.onclick = counter_reset.bind(add_title);
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("div");
        new_ele.id = `div${add_title}`;
        new_ele.className = "counterDiv";
        document.getElementById(add_title).appendChild(new_ele);
        new_ele = document.createElement("option");
        new_ele.textContent = add_title;
        new_ele.id = `option${add_title}`;
        document.getElementById("select_option").appendChild(new_ele);
    }
}
