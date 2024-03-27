const TASK_STATUS={
    COMPLETED: `completed`,
    NOT_COMPLETED: `notCompleted`
}

let taskList=[];
let inputValue;

function inputValueChangeHandler (value) {
    inputValue=value;
    console.log(inputValue);
}

function addNewTask () {
    if(!inputValue || inputValue==='')
    {
        alert("Please enter some value!");
        return;
    }
    console.log(taskList);
    taskList.push({task: inputValue, status: TASK_STATUS.NOT_COMPLETED});
    console.log(`taskList: ${taskList}`);
    localStorage.setItem('data', JSON.stringify(taskList));
    addTaskElement();
    document.getElementById("input-box").value='';
    inputValue='';
    console.log(`addNewTask: ${inputValue}`);
}

function addTaskElement () {
    if(taskList.length===0)
        return;
    const listContainer= document.getElementById(`list-container`);
    removeAllTaskElements(listContainer);
    taskList.map((task)=>{
        const li = document.createElement('li');
        const img= document.createElement('img');
        const clsButton= document.createElement('button');

        img.classList.add('icon');
        li.appendChild(img);
        const sp=document.createElement('span');
        sp.append(document.createTextNode(task.task));
        sp.classList.add('text');
        if(task.status===TASK_STATUS.NOT_COMPLETED)
        {
            img.src='./images/unchecked.png';
        }
        else
        {
            img.src='./images/checked.png';
            sp.classList.add('complete');
        }
        li.appendChild(sp); // Text content of the new list item

        clsButton.textContent='X';
        clsButton.classList.add('closeButton');
        li.appendChild(clsButton);

        li.addEventListener('click', function(event) {console.log("clicked"); elementClicked(event)});
        listContainer.appendChild(li);
    });

}

function clearButtonHandler(event) {
    const element=event.target.parentNode;
    console.log(element.children);
    const span=element.children[1];
    selectedText=span.textContent;
    const newTaskList=taskList.filter((task)=>{return task.task!==selectedText});
    taskList=newTaskList;
    localStorage.setItem('data', JSON.stringify(taskList));
}

function elementClicked(event) {
    const element=event.target.parentNode;
    console.log(element.children);
    const img=element.children[0];
    const span=element.children[1];
    console.log(img);
    console.log(span);
    const imgSrc= img.src.substring(img.src.lastIndexOf("/") + 1);
    console.log(imgSrc);
    if(imgSrc==='unchecked.png')
        {
            span.classList.add('complete');
            img.src='./images/checked.png';
            console.log(`if: ${img.src}`);
            for(let task of taskList)
            {
                if(task.task===span.textContent)
                    task.status=TASK_STATUS.COMPLETED;
            }
        }
    else
        {
            span.classList.remove('complete');
            img.src='./images/unchecked.png';
            console.log(`else: ${img.src}`);
            for(let task of taskList)
            {
                if(task.task===span.textContent)
                    task.status=TASK_STATUS.NOT_COMPLETED;
            }
        }
    console.log(taskList);
    localStorage.setItem('data', JSON.stringify(taskList));
}

function loadTaskList(){
    taskList=JSON.parse(localStorage.getItem('data'));
    console.log(typeof taskList);
    addTaskElement();
}

function removeAllTaskElements(listContainer) {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
}

loadTaskList();