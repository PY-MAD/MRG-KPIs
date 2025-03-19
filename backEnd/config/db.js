const mongoose = require("mongoose");
mongoose.connect(process.env.MONOGODB_URL)
.then((item)=>{
    console.log(item.connection.host);
})
.catch((error)=>{
    console.log(error);
})

module.exports = mongoose