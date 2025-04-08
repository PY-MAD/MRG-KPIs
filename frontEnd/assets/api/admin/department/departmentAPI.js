

function handleForm(event){
    event.preventDefault();
    const departmentName = event.target.children[0];
    const departmentManager = event.target.children[1];
    if(!departmentName.value || !departmentManager.value){
        !departmentName.value ? departmentName.classList.add("border-red-600"):"";
        departmentManager.value == "Select manager" ? departmentManager.classList.add("border-red-600"):"";
    }else{
        let name = departmentName.value;
        let manger = departmentManager.value
        fetch("/Admin/addDepartments",{
            method:"POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                departmentName:name,
                departmentManager:manger
            })
        }).then(async(response)=>{
            const res = await response.json();
            if(res.status == 400){
                alert("error");
            }else{
                console.log(res);
                addNewDepartmentInTable(res.message)
            }
        })
    }
}