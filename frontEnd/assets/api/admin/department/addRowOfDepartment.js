function addNewDepartmentInTable(data){
    let tableBody = document.getElementById("departmentTable");
    let tableRow = `
            <div class="grid grid-cols-5 bg-white text-gray-600 py-3 px-3 border-b hover:bg-slate-400 hover:text-white ">
                <div>${data.name}</div>
                <div>${data.mangerName}</div>
                <form action="/Admin/deleteDepartment/${data._id}?_method=DELETE" method="post">
                <button type="submit" class= "bg-red-600 text-white px-3 py-2 rounded hover:brightness-50 transition delay-50 duration-300 ease-in-out">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
                </form>
                <form action="/Admin/updateDepartment/${data._id}?_method=PUT" method="post">
                <button type="submit" class= "bg-blue-600 text-white px-3 py-2 rounded hover:brightness-50 transition delay-50 duration-300 ease-in-out">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>
                </form>
            </div>

    `
    return tableBody.innerHTML += tableRow
}