function addNewQuarter(data){
    let tableBody = document.getElementById("departmentTable");
    let tableRow = `
            <div class="grid grid-cols-5 bg-white text-gray-600 py-3 px-3 border-b hover:bg-slate-400 hover:text-white ">
                <div>${data.year}</div>
                <div>${data.quarter}</div>
                <a href='/Admin/quarter/update/${data._id}' class="bg-blue-600 text-white px-3 py-2 rounded hover:brightness-50 transition delay-50 duration-300 ease-in-out">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </a>
                <form action="/Admin/quarter/delete/${data._id}?_method=DELETE" method="post">
                    <button type="submit" class= "bg-red-600 text-white px-3 py-2 rounded hover:brightness-50 transition delay-50 duration-300 ease-in-out">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </form>
            </div>

    `
    return tableBody.innerHTML += tableRow
}