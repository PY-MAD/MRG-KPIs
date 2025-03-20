let validateForm = document.querySelectorAll("#validateForm input");
let faucesInput = 0;

validateForm.forEach((item) => {
    item.addEventListener('keydown', (event) => {
        // if user keydown the keyboard and he didn't press the backspace then assign the value and go to next input
        if(faucesInput >= 0 && event.key != "Backspace"){
            if (item.value.length == 1) {
                if(item.hasAttribute("index")){
                    let position = parseInt(item.getAttribute("index"));
                    document.getElementById("index"+position).value = item.value;
                    faucesInput = position < 6 && position >= 1 ? position + 1 : 6;
                    document.getElementById("index"+faucesInput).focus();
                }
            }
        }
        // if user keydown the keyboard and he press the backspace then remove the value and go to back input
        if(faucesInput >= 0 && event.key == "Backspace"){
            let position = parseInt(item.getAttribute("index"));
            document.getElementById("index"+position).value = null;
            faucesInput = position <= 6 && position > 1 ? position - 1 : 1;
            document.getElementById("index"+faucesInput).focus();
        }
    })


})
