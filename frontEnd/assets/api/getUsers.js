import { fetchData } from "./fetchCode.js";

fetchData(url+"/salesKPIs/target/users")
.then((users)=>{
    users.forEach(element => {
        addUser(element.email,element.name);
    });
})
.catch((error)=>{
    console.log(error);
})

let addUser = (email,name)=>{
    let selectUsersContainer = document.getElementById("userResponse");
    return selectUsersContainer.innerHTML +=`<option value="${email}">${name}</option>`;
}