const path = require("path");
const fs = require("fs");

module.exports.GETReadFile = async (req, res, fileName) => {
    try {
        const filePlace = path.join(fileName);
        const isFileExist = fs.existsSync(filePlace);
        if (!isFileExist) {
            return res.json({
                status: 404,
                data: "file not found !"
            })
        }
        const readFile = fs.readFileSync(filePlace);
        return res.json(
            {
                status: 200,
                data: readFile
            }
        );
    } catch (error) {
        return res.json(
            {
                status: 400,
                data: error
            }
        )
    }

}