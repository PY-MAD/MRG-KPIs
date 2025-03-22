const path = require("path");
const fs = require("fs");

function isExistFile(fileName){
    const findPath = path.join(__dirname , "../api/data/"+fileName);
    if(!findPath){
        return {
            status:404,
            data:"file not found !"
        };
    }
    return {
        status:200,
        data:findPath
    };
}
function deleteFile(fileName){
    const {data,status} = isExistFile(fileName);
    if( status == 404){
        throw data;
    }
    try {
        fs.unlinkSync(data);
        return{
            status: 200,
            data: "The file has been deleted!"
        }
    } catch (error) {
        return{
            status: 400,
            data: error.message
        }
        
    }
}

module.exports = {deleteFile,isExistFile};