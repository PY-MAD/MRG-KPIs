const addNewInput = async () => {
    // take the tableBody
    let tableBody = document.getElementById("tableBody");
    // custom  to create new row of inputs to add new department to backend
    const newInput = `
                <form action="/Admin/addTerms" onsubmit="handleForm(event)" class="w-full text-sm text-left rtl:text-right text-gray-500 bg-white border-b border-gray-200 flex flex-row w-full" method="post">
                                <input type="text" name="termsName"
                                    class="border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-fuchsia-300 w-1/2"
                                    placeholder="Name of Terms">

                                <select name="termsDepartments" id="termsDepartments" multiple class="w-full border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-blue-400">
                                    <option disabled selected hidden>Select departments</option>
                                </select>

                                <input type="number" min="0" max="100" name="termWight"
                                    class="border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-fuchsia-300 w-1/2"
                                    placeholder="term of wight">

                                <button type="submit" class="bg-blue-500 text-white px-4 py-2 px rounded hover:bg-blue-600">
                                    Save
                                </button>

                </form>
    `;
    // insert in last row
    tableBody.insertAdjacentHTML("beforebegin", newInput);
    // becaucse all the input's have the same id so that why i take the id's and make it the same
    let selectMangerId = document.querySelectorAll("#termsDepartments");
    fetch("/admin/getDepartments")
        .then((res) => {
            res.json().then((departments) => {
                departments.forEach((department) => {
                    // when create new row in the last put the the mangers there's
                    selectMangerId[
                        selectMangerId.length - 1
                    ].innerHTML += `<option value="${department._id}">${department.name}</option>`;
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

let clickInput = document.getElementById("addNewInput");
clickInput.addEventListener("click", addNewInput);
