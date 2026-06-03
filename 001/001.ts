interface User {
    id : number,
    username : string,
    isAdmin : boolean,
    skills : string[]
};

function formatUserMessage(user : User) {
    return "Welcome," 
        + (user.isAdmin ? " [ADMIN] " : " ")
        + user.username
        + "."
    ;
}

const myUser : User = {
    id : 2409,
    username : "Gustavo",
    isAdmin : true,
    skills : [
        "C#", "Typescript", "HTML", "CSS"
    ]
};

console.log(formatUserMessage(myUser));