
/**
 * Created a new instance of a Promise
 * Requires 2 condition with use of resolve and reject parameters
 * resolve will capture the true statement
 * reject will capture the false statement
 * 
 * 
 * With that new instance object:
 * use a then/catch method (in the Promise class) to correspond with the resolve/reject
 * then handles 'result' , catch handles 'error' 
 */
let name = new Promise((resolve, reject) =>{ //Created a new instance of a Promise
    
    if('input' == 'input2'){
        resolve('Your inputs Match!!')
    }
    else{
        reject('Both input does not Match')
    }

})

console.log("Hi")
name.then((result) => {

    console.log(result)

}).catch((error) =>{
    console.log(error)
})
console.log("Bye")



const status = (result) => {
    return new Promise((resolve,reject) => {
        
        if(RegExp(/\d/g).test(result)){
            resolve("It's a number!")
        }
        else{
            reject("This is not a number...")
        }
    }
    )

}

status("four").then((result)=> {
    console.log(`Got it! ${result}`)
}
).catch((error)=>{
    console.log(`404: ${error}`)
})

const checkNumber = async () => { // Created an asyncronous function to use 'await'

   try{
    let result = status('1') // Waits for function to complete before proceeding
    console.log(`Done ${result}`)
   }catch(error){
    console.log(`${error}... Not a number`)
   }
}

checkNumber();



