const addNewInput = async () => {
    let tableBody = document.getElementById("tableBody");

    // generate unique id for this select
    const uniqueId = `departments-${Date.now()}`;

    const newInput = `
    <form action="/admin/addTerm" method="POST" class="grid grid-cols-5 bg-white text-gray-600 py-3 px-3 border-b hover:bg-slate-400">
        <div>
            <input type="text" name="name" placeholder="name of terms" class="w-full py-1 px-2 border-gray-300 border-2 rounded-lg"/>
        </div>
        <div>
            <select id="${uniqueId}" name="departments" class="w-full py-1.5 px-2 border-gray-300 border-2 rounded-lg" multiple></select>
        </div>
        <div>
            <input type="number" min="0" max="100" name="weight" placeholder="weight" class="w-full py-1 px-2 border-gray-300 border-2 rounded-lg text-black"/>
        </div>
        <div>
            <button type="submit" class="bg-blue-600 text-white px-3 py-2 w-32 rounded hover:brightness-50 transition delay-50 duration-300 ease-in-out">ADD</button>
        </div>
    </form>
    `;

    tableBody.insertAdjacentHTML("beforebegin", newInput);

    // الآن عب البيانات في السلكت الجديد
    const selectElement = document.getElementById(uniqueId);
        // الآن فعل slimSelect على العنصر الجديد
        new SlimSelect({
            select: `#${uniqueId}`
        });
    try {
        const res = await fetch("/admin/getDepartments");
        const departments = await res.json();

        departments.forEach(department => {
            const option = document.createElement("option");
            option.value = department._id;
            option.textContent = department.name;
            selectElement.appendChild(option);
        });



    } catch (error) {
        console.error("Error fetching departments:", error);
    }
};

let clickInput = document.getElementById("addNewInput");
clickInput.addEventListener("click", addNewInput);
