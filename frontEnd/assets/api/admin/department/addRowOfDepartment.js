function addNewDepartmentInTable(data){
    let tableBody = document.getElementById("departmentTable");
    let tableRow = `
        <tr class="bg-white border-b border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                     ${data.name}
                </th>
                <td class="px-6 py-4">
                    ${data.mangerName}
                </td>
                <td class="px-6 py-4 flex">
                    <a href="/Admin/changeDepartment/${data._id}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-250 font-medium" type="submit">
                        <span class='material-symbols-outlined'>edit</span>
                    </a>
                    <form action="/Admin/deleteDepartment/${data._id}?_method=DELETE" method="POST">
                        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-250 font-medium" type="submit">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </form>
                </td>
        </tr>
    `
    return tableBody.innerHTML += tableRow
}