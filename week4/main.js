//SEARCH.HTML EXAMPLES

//const input = document.forms.search;

//focus event
//input.addEventListener('focus', () => alert('focused'), false);

//blur event
//input.addEventListener('blur', () => alert('blurred'), false);

//change event
//input.addEventListener('change', () => alert('changed'), false);

//submit event
// const form = document.forms['search'];
// form.addEventListener ('submit', search, false);

// function search() {
//     alert(' Form Submitted');
// }

//prevents default
// const form = document.forms['search'];
// form.addEventListener ('submit', search, false);

// function search(event) {
//     alert(`You Searched for: ${input.value}`);
//     event.preventDefault();
// }

// //value

// input.value = 'Search Here';

// input.addEventListener('focus', function(){
//     if (input.value==='Search Here') {
//         input.value = '' 
//     }
// }, false);

// input.addEventListener('blur', function(){
//     if(input.value === '') {
//         input.value = 'Search Here';
//     } }, false);


//HERO.HTML CODE

document.forms.hero.heroName.focus();
const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

//turning the form into a json object
function makeHero(event) {

    event.preventDefault(); // prevent the form from being submitted

    const hero = {}; // create an empty object

    hero.name = form.heroName.value; // create a name property based on the input field's value

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}

hero.realName = form.realName.value;

hero.powers = [];
for (let i=0; i < form.powers.length; i++) {
    if (form.powers[i].checked) {
        hero.powers.push(form.powers[i].value);
    }
}



//Object Oriented Programming
// class Flower {
//     constructor(name){
//         this.name = name;
//         this.favorite = 'fav';
//     }
//     sayHi(){
//         console.log(`Hi, I am a ${this.favorite}`);
//     }
//     sayHello(){
//         console.log(`Hello, I am a ${this.fav}`);
//     }
// }

// const dandelion = new Flower('Dandelion');
// console.log(dandelion.sayHi())

