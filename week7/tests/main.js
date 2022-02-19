// //functions are first-class objects means they can have properties and methods themselves. For example, 
// //all functions have a length property that returns the number of parameters the function has.
// function square(x) {
//     return x*x;
// }
// square.length
// // << 1


// //The call() method can be used to set the value of this inside a function to an object that is provided as the first argument.
// function sayHello(){
//     return `Hello, my name is ${ this.name }`;
// }
// const clark = { name: 'Clark' };
// const bruce = { name: 'Bruce' };

// sayHello.call(clark);
// //<< 'Hello, my name is Clarke'

// sayHello.call(bruce);
// //<< 'Hello, my name is Bruce'

// //If the function that’s called requires any parameters, these need to be provided as arguments after 
// //the first argument, which is always the value of this. For example, let's update the sayHello() function 
// //to give a more generalized greeting that’s provided as an argument:
// function sayHello(greeting='Hello'){
//     return `${ greeting }, my name is ${ this.name }`;
// }

// sayHello.call(clark, 'How do you do');
// //<< 'How do you do, my name is Clark'

// sayHello.call(bruce);
// //<< 'Hello, my name is Bruce'

// //you could add a description property to a function that describes what it does
// square.description = 'Squares a number that is provided as an argument'
// //<< 'Squares a number that is provided as an argument'

// //If a function takes some time to compute a return value, we can save the result in a cache property. 
// //Then if the same argument is used again later, we can return the value from the cache, rather than 
// //having to compute the result again
// function square(x){
//     square.cache = square.cache || {};
//     if (!square.cache[x]) {
//         square.cache[x] = x*x;
//     }
//     return square.cache[x]
// }
// //If we try calling the function a few times, we can see that the cache object stores the results:
// square(3);
// //<< 9

// square(-11);
// //<< 121

// square.cache;
// //<< {"3": 9, "-11": 121}

// //An Immediately Invoked Function Expression – or IIFE – (pronounced 'iffy') is an anonymous function that, 
// //as the name suggests, is invoked as soon as it’s defined. This is easily achieved by placing parentheses 
// //at the end of the function definition (remember we use parentheses to invoke a function). The function 
// //also has to be made into an expression, which is done by placing the whole declaration inside parentheses, 
// //as in this example:
// (function(){
//     const temp = 'World';
//     console.log(`Hello ${temp}`);
//     })();
//     //<< 'Hello World'

// //An IIFE can be used to set up any initialization code that there’ll be no need for again
// (function() {
//     const name = 'Peter Parker'; // This might be obtained from a cookie in reality
//     const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
//     const date = new Date(),today = days[date.getDay()];
//     console.log(`Welcome back ${name}. Today is ${today}`);

// })();
// //<< 'Welcome back Peter Parker. Today is Tuesday'

// //An IIFE can be used to enclose a block of code inside its own private scope so it doesn’t interfere with any other part of the program.
// (function() {
//     // block A
//     const name = 'Block A';
//     console.log(`Hello from ${name}`);
//     }());

//     (function() {
//     // block B
//     const name = 'Block B';
//     console.log(`Hello from ${name}`);
// }());

// //Hello from Block A 
// //Hello from Block B

// //The dynamic nature of JavaScript means that a function is able to not only call itself,
// // but define itself, and even redefine itself. This is done by assigning an anonymous function 
// //to a variable that has the same name as the function.
// function party(){
//     console.log('Wow this is amazing!');
//     party = function(){
//         console.log('Been there, got the T-Shirt');
//     }
// }
// //This logs a message in the console, then redefines itself to log a different message in the 
// //console. When the function has been called once, it will be as if it was defined like this:
// function party() {
//     console.log('Been there, got the T-Shirt');
// }
// party();
// //<< 'Wow this is amazing!' first time it is called

// party();
// //<< 'Been there, got the T-Shirt' after the first time it is called

// party();
// //<< 'Been there, got the T-Shirt'

// //Here’s an example of a function called wait() that accepts a callback. To simulate an operation that
// // takes some time to happen, we can use the setTimeout() function to call the callback after a given 
// //number of seconds:
// function wait(message, callback, seconds){
//     setTimeout(callback,seconds * 1000);
//     console.log(message);
// }
// //Now let’s create a callback function to use:
// function selfDestruct(){
//     console.log('BOOOOM!');
// }
// //If we invoke the wait() function then log a message to the console, we can see how JavaScript works asynchronously:
// wait('This tape will self-destruct in five seconds ... ', selfDestruct, 5);
// console.log('Hmmm, should I accept this mission or not ... ?');
// // << 'This tape will self-destruct in five seconds ... '
// // << 'Hmmm, should I accept this mission or not ... ? '
// // << 'BOOOOM!'
// //The setTimeout() function is asynchronous, which means that the callback provided as an argument is placed on top of a stack that gets cleared once the rest of the program has run. This means that control is handed back to the program and the next line in the program is run, which displays the message ‘Hmmm, should I accept this mission or not ... ?’ Then, after five seconds, the callback is retrieved from the stack and invoked. This demonstrates that the setTimeout() function did not block the rest of the program from running. This is known as the JavaScript event-loop,

// //A promise is created using a constructor function. This takes a function called an executor as an argument.
// // The executor initializes the promise and starts the asynchronous operation. It also accepts two functions 
// //as arguments: the resolve() function is called if the operation is successful, and the reject() function 
// //is called if the operation fails. The general layout of a promise can be seen in the code below:
// const promise = new Promise( (resolve, reject) => {
//     // initialization code goes here
//     if (success) {
//         resolve(value);
//     } else {
//         reject(error);
//     }
// });
// //The then() and catch() methods can be chained together to form a succinct description of how to deal with the outcome of the promise:
// promise.then( result => console.log(`I rolled a ${result}`) )
//             .catch( result => console.log(`Drat! ... I rolled a ${result}`) );

// // We've just seen that functions can accept another function as an argument (a callback), but they can also return a function.
// // The example below shows a function called returnHello() that returns a 'Hello World' function:
// function greeter(greeting = 'Hello') {
//     return function() {
//         console.log(greeting);
//     }
// }

// const englishGreeter = greeter();
// englishGreeter();
// //<< Hello

// const frenchGreeter = greeter('Bonjour');
// frenchGreeter();
// //<< Bonjour


// const germanGreeter = greeter('Guten Tag');
// germanGreeter();
// //<< Guten Tag

// //A closure is a reference to a variable that was created inside the scope of another function, but is then kept alive and used in another part of the program.
// //One of the key principles in creating closures is that an 'inner' function, which is declared inside another function, has full access to all of the variables declared inside the scope of the function in which it’s declared (the 'outer' function). This can be seen in the example below:
// function outer() {
//     const outside = 'Outside!';
//     function inner() {
//         const inside = 'Inside!';
//         console.log(outside);
//         console.log(inside);
//     }
//     console.log(outside);
//     inner();
// }

// //The Fetch API provides a global fetch() method that only has one mandatory argument, which is the URL of the resource you wish to fetch. A very basic example would look something like the following piece of code:
// fetch('https://example.com/data')
// .then( // code that handles the response )
// .catch( // code that runs if the server returns an error )

// //response object
// const url = 'https:example.com/data';

// fetch(url)
// .then((response) => {
//     if(response.ok) {
//         return response;
//     }
//     throw Error(response.statusText);
// })
// .then( response => // do something with response )
// .catch( error => console.log('There was an error!') )

// //Here is an example of how a JSON response promise would be resolved:
// fetch(url)
// .then( response => response.json() ); // transforms the JSON data into a JavaScript object
// .then( data => console.log(Object.entries(data)) )
// .catch( error => console.log('There was an error: ', error))

// //A constructor function is used to create a new Request object
// const request = new Request('https://example.com/data', {
//     method: 'GET',
//     mode: 'cors',
//     redirect: 'follow',
//     cache: 'no-cache'
// });

// //Once the Request object is assigned to a variable, it can then be used as the parameter of the fetch() method:
// fetch(request)
// .then( // do something with the response )
// .catch( // handle any errors)

// //Alternatively, you can enter the URL and object directly as arguments of the fetch() method, without having to create a Request object:
// fetch('https://example.com/data', {
//     method: 'GET',
//     mode: 'cors',
//     redirect: 'follow',
//     cache: 'no-cache'
// })
// .then( // do something with the response )
// .catch( // handle any errors)

// //A new Headers instance is created using a constructor function, as seen in the example below:
// const headers = new Headers({ 'Content-Type': 'text/plain', 'Accept-Charset' : 'utf-8', 'Accept-Encoding':'gzip,deflate' })


// //buttons example test page for html
// const textButton = document.getElementById('number');
// const apiButton = document.getElementById('chuck');
// const outputDiv = document.getElementById('output');

// const textURL = 'http://numbersapi.com/random';
// const apiURL = 'https://api.chucknorris.io/jokes/random';

// //event handlder for textURL
// textButton.addEventListener('click', () => {
//     fetch(textURL)
//     .then( response => {
//         outputDiv.innerHTML = 'Waiting for response...';
//     if(response.ok) {
//         return response;
//     }
//         throw Error(response.statusText);
//     })
//     .then( response => response.text() )
//     .then( text => outputDiv.innerText = text )
//     .catch( error => console.log('There was an error:', error))
// },false);

// //other button event listener
// apiButton.addEventListener('click', () => {
//     fetch(apiURL)
//     .then( response => {
//         outputDiv.innerHTML = 'Waiting for response...';
//     if(response.ok) {
//         return response;
//     }
//     throw Error(response.statusText);
//     })
//     .then( response => response.json() )
//     .then( data => outputDiv.innerText = data.value )
//     .catch( error => console.log('There was an error:', error))
// },false);


//getting and sending in API example
const form = document.forms['todo'];

form.addEventListener('submit', addTask, false);

function addTask(event) {
    event.preventDefault();
    const task = new FormData(form);
    const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url,
    {
        method: 'POST',
        mode: 'cors',
        header: headers,
        body: JSON.stringify(task)
    }
    )

    fetch(request)
    .then( response => response.json() )
    .then( data => console.log(`${data.title} saved with an id of ${data.id}`) )
    .catch( error => console.log('There was an error:', error))

}