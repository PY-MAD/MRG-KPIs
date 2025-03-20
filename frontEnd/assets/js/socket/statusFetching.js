const socket = io();
const statusElement = document.getElementById("serverMsg");
const countUsers = document.getElementById("totalUsersFromServer")
const doneUsers = document.getElementById("doneUsers")
const components = document.getElementById("spinnerComponents");

socket.on("serverConnection",(status)=>{
    if(status){
        components.classList.remove("hidden")
    }
    if(!status){
        components.classList.add("hidden");
    }
})

socket.on("serverMsg",(message)=>{
    statusElement.innerText = message;
})
socket.on("totalFromServer",(message)=>{
    countUsers.innerText = message;
})
socket.on("doneFromServer",(message)=>{
    doneUsers.innerText = message;
})