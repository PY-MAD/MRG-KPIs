const addNewInput = async () => {
    // take the tableBody
    let tableBody = document.getElementById("tableBody");
    // custom  to create new row of inputs to add new department to backend
    const newInput = `
                <form action="/Admin/quarter/add" onsubmit="handleForm(event)" class="w-full text-sm text-left rtl:text-right text-gray-500 bg-white border-b border-gray-200 flex flex-row w-full" method="post">
                                <input type="text" name="year" id="year"
                                    class="border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-fuchsia-300 w-1/2"
                                    placeholder="year">

                                <select name="quarter" id="departmentManager" class="w-full border border-gray-300 text-black rounded w-full px-2 py-2 focus:border-blue-400">
                                    <option disabled selected hidden>Select quarter</option>
                                    <option value="q1">Q1</option>
                                    <option value="q2">Q2</option>
                                    <option value="q3">Q3</option>
                                    <option value="q4">Q4</option>
                                </select>

                               <button type="submit" class="bg-blue-500 text-white px-4 py-2 px rounded hover:bg-blue-600">
                                    Save
                                </button>
                </form>
    `;
    // insert in last row
    tableBody.insertAdjacentHTML("beforebegin", newInput);
    let year = document.getElementById("year");
    year.value = new Date().getFullYear();
    year.setAttribute("readonly",true);
    year.classList.add(
        "bg-gray-100",
        "text-gray-500",
        "cursor-not-allowed")
}

let clickInput = document.getElementById("addNewInput");
clickInput.addEventListener("click", addNewInput);