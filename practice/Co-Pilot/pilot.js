const express = require("express"); // importing and using express 
const app = express(); // Creating an instance of express]


app.get('/cheese', function(req,res){
    res.sendDate; //Sending current sate to path cheese
})

// Make a get request that takes a name and returns the name backwards
app.get('/name/:name', function(req, res){
    let name = req.params.name;
    let reversedName = name.split('').reverse().join('');
    res.send(reversedName);
})

// Make a get request that prints the user local 12-hour clock format time and date
app.get('/time', function(req, res){
    let time = new Date();
    let timeString = time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
    res.send(timeString);
})

// Make a get request that prints the fibonacci sequence up to the number passed
app.get('/fibonacci/:number', function(req, res){
    let number = req.body.number;
    let fibonacciSequence = [0, 1];
    for(let i = 2; i <= number; i++){
        fibonacciSequence.push(fibonacciSequence[i-2] + fibonacciSequence[i-1]);
    }
    res.send(fibonacciSequence);
} )

// Make a get request that prints the prime numbers up to the number passed
app.get('/prime/:number', function(req, res){
    let number = req.body.number;
    let primeNumbers = [];
    for(let i = 2; i <= number; i++){
        let isPrime = true;
        for(let j = 2; j < i; j++){
            if(i % j === 0){
                isPrime = false;
            }
        }
        if(isPrime){
            primeNumbers.push(i);
        }
    }
    res.send(primeNumbers);
})

// Make a get request that prints the number one celebrity in america
app.get('/celebrity', function(req, res){
    let celebrity = "Justin Bieber";
    res.send(celebrity);
})

// Make a get request to print the first page of the new york times
app.get('/nyt', function(req, res){
    let nyt = "https://www.nytimes.com/";
    res.send(nyt);
})

// Make a get request to answer the secret of life that isnt 42
app.get('/life', function(req, res){
    let life = "Life is 42";
    res.send(life);
})

// Make a simple to understand get request that prints the number of times the word "hello" appears in the body of the request
app.get('/hello', function(req, res){
    let hello = req.body.hello;
    let helloCount = hello.split("hello").length - 1;
    res.send(helloCount);
})

