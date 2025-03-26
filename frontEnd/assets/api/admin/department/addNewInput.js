const addNewInput = async () => {
    // take the tableBody
    let tableBody = document.getElementById("tableBody");
    // custom  to create new row of inputs to add new department to backend
    const newInput = `
                <form action="/Admin/addDepartments" onsubmit="handleForm(event)" class="w-full text-sm text-left rtl:text-right text-gray-500 bg-white border-b border-gray-200 flex flex-row w-full" method="post">
                                <input type="text" name="departmentName"
                                    class="border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-fuchsia-300 w-1/2"
                                    placeholder="Name of department">

                                <select name="departmentManager" id="departmentManager" class="w-full border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-blue-400">
                                    <option disabled selected hidden>Select manager</option>
                                </select>

                               <button type="submit" class="bg-blue-500 text-white px-4 py-2 px rounded hover:bg-blue-600">
                                    Save
                                </button>

                </form>
    `;
    // insert in last row
    tableBody.insertAdjacentHTML("beforebegin", newInput);
    // becaucse all the input's have the same id so that why i take the id's and make it the same
    let selectMangerId = document.querySelectorAll("#departmentManager")
    fetch("/admin/users").then((res) => {
        res.json()
            .then((users) => {
                users.forEach((user) => {
                    // when create new row in the last put the the mangers there's
                    selectMangerId[selectMangerId.length - 1].innerHTML += `<option value="${user._id}">${user.name}</option>`
                })
            })
    }).catch((error) => {
        console.log(error);
    })
}

let clickInput = document.getElementById("addNewInput");
clickInput.addEventListener("click", addNewInput);