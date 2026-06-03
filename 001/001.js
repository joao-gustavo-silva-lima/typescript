"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function formatUserMessage(user) {
    return "Welcome,"
        + (user.isAdmin ? " [ADMIN] " : " ")
        + user.username
        + ".";
}
const myUser = {
    id: 2409,
    username: "Gustavo",
    isAdmin: true,
    skills: [
        "C#", "Typescript", "HTML", "CSS"
    ]
};
console.log(formatUserMessage(myUser));
//# sourceMappingURL=001.js.map