document.addEventListener("DOMContentLoaded", function () {  
    const taskForm = document.getElementById("task-form");  
    const newTaskInput = document.getElementById("new-task");  
    const taskList = document.getElementById("task-list");  
  
    taskForm.addEventListener("submit", function (event) {  
        event.preventDefault();  
        const taskText = newTaskInput.value.trim();  
        if (taskText) {  
            addTask(taskText);  
            newTaskInput.value = "";  
        }  
    });  
  
    function addTask(taskText) {  
        const li = document.createElement("li");  
        li.textContent = taskText;  
  
        const completeButton = document.createElement("button");  
        completeButton.textContent = "Complete";  
        completeButton.addEventListener("click", function () {  
            li.classList.toggle("task-complete");  
            // li.classList.
            // alert("thanks")
        });  
  
        const deleteButton = document.createElement("button");  
        deleteButton.textContent = "Delete";  
        deleteButton.addEventListener("click", function () {  
            taskList.removeChild(li);  
        });  
  
        li.appendChild(completeButton);  
        li.appendChild(deleteButton);  
        taskList.appendChild(li);  
    }  
});  
