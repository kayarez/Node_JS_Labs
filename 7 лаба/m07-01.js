const fs = require("fs");
class Stat {
    constructor(sfn = './static') {
        this.STATIC_FOLDER = sfn;
        let pathStatic = (fn) => { return `${this.STATIC_FOLDER}${fn}`; };
        
        this.isStatic = (ext, fn) => {
            let reg = new RegExp(`^\/.+\.${ext}$`);
            return reg.test(fn);
        };

        this.sendFile = (req, res, headers) => {
            fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
                if (err) {      //file not found
                    res.statusCode = 404;
                    res.statusMessage = "Resourse not found";
                    res.end("Resourse not found");
                }
                else {      //found
                    res.writeHead(200, headers);
                    fs.createReadStream(pathStatic(req.url)).pipe(res);
                }
            });
        }
        
    }
}
module.exports = (parm) => { return new Stat(parm); }