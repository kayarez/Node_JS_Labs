var util = require("util");
var ee = require("events");
let db_data = [{id: 1, name: "Керезь", bday: "2000-06-30"}];

function Bd() {
    this.users = [{id: 1, name: "Керезь", bday: "2001-06-30"}];
}

Bd.prototype.getAll = function () {
    return this.users;
};

Bd.prototype.post = function (user) {
    this.users.push(user);
};

Bd.prototype.put = function (user) {
    this.users.map((value) => {
        if (user.id == value.id) {
            this.users[this.users.indexOf(value)] = user;
        }
    });
};

Bd.prototype.delete = function (user) {
    console.log("in delete");
    this.users.map((value) => {
        if (user.id == value.id) {
            this.users.splice(this.users.indexOf(value), 1);

        }
    });
};
Bd.prototype.commit = function (){

}
util.inherits(Bd, ee.EventEmitter);
module.exports.Bd = Bd;
