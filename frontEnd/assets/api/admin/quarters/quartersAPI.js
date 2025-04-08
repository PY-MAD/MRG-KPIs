

function handleForm(event){
    event.preventDefault();
    const yearInput = event.target.children[0];
    const quarterInput = event.target.children[1];
    if(!yearInput.value || !quarterInput.value){
        !yearInput.value ? yearInput.classList.add("border-red-600"):"";
        quarterInput.value == "Select manager" ? quarterInput.classList.add("border-red-600"):"";
    }else{
        let year = yearInput.value;
        let quarter = quarterInput.value
        fetch("/Admin/quarter/add",{
            method:"POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                year:year,
                quarter:quarter
            })
        }).then(async(response)=>{
            const res = await response.json();
            console.log(res);
            if(res.status == 400){
                alert("error");
            }else{
                console.log(res);
                addNewQuarter(res.message)
            }
        })
    }
}