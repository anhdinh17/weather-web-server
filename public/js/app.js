console.log("Client side javascript file is loaded");

//Syntax of fetch: url that we want to fetch data
//".then()" function is that after we get data then do something
// in this case "response" parameter is the json data from the url
// response.json() is to parse the json data into javascript object
// 'then(data)' is to work with the data after we parsed it.
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

// get the whole 'form' into 1 variable
const weatherForm = document.querySelector('form')
// get the input text
const search = document.querySelector('input')
// get paragraph from index.hbs
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// when serach button is clicked syntax:
// addEventListneer takes 2 parameters, 'submit' is syntax when  
// we want to hit button, receive values and work with values,
// the second parameter is call back function that is what happens after the button is clicked
weatherForm.addEventListener('submit', (e) => { // e stands for event
    e.preventDefault(); // prevent brwowser to refresh the page 

    const location = search.value // get the value of input that is text users type

    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";

    // fetch data
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) { // if there's error
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })

})