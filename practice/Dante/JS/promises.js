// let promise1 = new Promise((resolve, reject)=>{

//     if((1 + 1 == 2)) {
//         resolve("math")
//     }
//     else {
//         reject("no math");
//     }
// })

// console.log("hello")
// promise1.then((value)=>console.log(value)).catch((err)=>console.log(err))
// console.log("goodbye")








// function giveMe1() {
//     return 1
// }

// console.log( 2 + giveMe1())





const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const findUser = (uid) => {

    return new Promise((resolve, reject) => {
        if (users.includes(uid)) {
            resolve("user exist")
        }
        else {
            reject("user doesn't exist")
        }
    })
}

const getUsers = () => {
    findUser(10)
        .then((value) => { console.log(value) })
        .catch((err) => console.log(err))
}

getUsers();

const getUsersTwo = async () => {
    try {
        const result = await findUser(11);
        console.log(result)
    }
    catch(err) {
        console.log(err)
    }
}

getUsersTwo();