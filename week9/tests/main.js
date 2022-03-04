// //In a browser environment, the global object is the window object. This means that any global variable
// // created is actually a property of the window object, as can be seen in the example below:
// x = 6;  // global variable created
// //<< 6

// window.x // same variable can be accessed as a property of the window object
// //<< 6

// // both variables are exactly the same
// window.x === x;
// //<< true

// //Some functions we’ve already met, such as parseInt() and isNaN(), are actually methods of the global
// // object, which in a browser environment makes them methods of the window object:
// window.parseInt(4.2);
// //<< 4

// window.isNaN(4.2);
// //<< false

// //browers dialogs
// window.alert('Hello');
// //<< undefined
// window.confirm('Do you wish to continue?');
// //<< undefined
// window.prompt('Please enter your name:');

// //browser information
// window.navigator.userAgent
// //<< "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8"
// window.location.href 
// //<< "https://www.sitepoint.com/premium/books/javascript-novice-to-ninja"
// //The protocol property returns a string describing the protocol used
// window.location.protocol 
// //<< "https:"
// //The host property returns a string describing the domain of the current URL and the port number
// window.location.host
// << "www.sitepoint.com"
// //The hostname property returns a string describing the domain of the current URL:
// window.location.hostname
// << "www.sitepoint.com"
// //The port property returns a string describing the port number, although it will return an empty string if the port is not explicitly stated in the URL:
// window.location.port
// << ""
// //The pathname property returns a string of the path that follows the domain:
// window.location.pathname
// << "/premium/books/javascript-novice-to-ninja"
// //The search property returns a string that starts with a “?” followed by the query string parameters. It returns an empty string if there are no query string parameters.
// window.location.search
// << "?q=javascript&limit=24&offset=0&page=1&content_types[]=All&slugs[]=all&states[]=available&order="
// //The hash property returns a string that starts with a “#” followed by the fragment identifier. It returns an empty string if there is no fragment identifier:
// window.location.hash
// << ""
// //The origin property returns a string that shows the protocol and domain where the current page originated from. This property is read-only, so cannot be changed:
// window.location.origin
// << "https://www.sitepoint.com"
// //The assign() method can be used to load another resource from a URL provided as a parameter, for example:
// window.location.assign('https://www.sitepoint.com/')
// //The toString() method returns a string containing the whole URL:
// window.location.toString()
// << "https://www.sitepoint.com/javascript/"


// //The window.history.go() method can be used to go to a specific page, where 0 is the current page:
// window.history.go(1); // goes forward 1 page
// window.history.go(0); // reloads the current page
// window.history.go(-1); // goes back 1 page

// //A new window can be opened using the window.open() method. This takes the URL of the page to be opened as its first parameter, the window title as its second parameter, and a list of attributes as the third parameter. This can also be assigned to a variable, so the window can then be referenced later in the code:
// const popup = window.open('https://sitepoint.com','SitePoint','width=400,height=400,resizable=yes');
// //The close() method can be used to close a window, assuming you have a reference to it:
// popup.close();
// //It is also possible to move a window using the window.moveTo() method. This takes two parameters that are the X and Y coordinates of the screen that the window is to be moved to:
// window.moveTo(0,0); // will move the window to the top-left corner of the screen
// //You can resize a window using the window.resizeTo() method. This takes two parameters that specify the width and height of the resized window’s dimensions:
// window.resizeTo(600,400);



// //You can find out the height and width of the screen in pixels using the height and width properties respectively:
// window.screen.height
// << 1024
// window.screen.width
// << 1280
// //The availHeight and availWidth can be used to find the height and width of the screen, excluding any operating system menus:
// window.screen.availWidth
// << 1280
// window.screen.availHeight
// << 995
// //The colorDepth property can be used to find the color bit depth of the user’s monitor, although there are few use cases for doing this other than collecting user statistics:
// window.screen.colorDepth
// << 24


// //The write() method simply writes a string of text to the page. If a page has already loaded, it will completely replace the current document:
// document.write('Hello, world!');
// //To create a cookie, you assign it to JavaScript’s “cookie jar”, using the document.cookie property, like so:
// document.cookie = 'name=Superman'
// << "name=Superman"
// //The document.cookie property acts like a special type of string. Assigning another cookie to it won’t overwrite the entire property, it will just append it to the end of the string. So we can add more cookies by assigning them to document.cookie:
// document.cookie = 'hero=true'
// << "hero=true"
// document.cookie = 'city=Metropolis'
// << "city=Metropolis"
// //A cookie’s value can be changed by reassigning it to document.cookie using the same name but a different value. The following code will update the value of two of the cookies that we set in the previous section:
// document.cookie = 'name=Batman'
// << "name=Batman"
// document.cookie = 'city=Gotham'
// << "city=Gotham"
// //To see the current contents of the cookie jar, simply enter document.cookie:
// document.cookie;
// //<< "name=Batman; hero=true; city=Gotham"
// //We can use the split method to break the string into an array containing each name/value pair, then use a for of loop to iterate through the array:
// const cookies = document.cookie.split("; ");
// for (crumb of cookies){
//     const [key,value] = crumb.split("=");
//     console.log(`The value of ${key} is ${value}`);
// }
// // << The value of name is Batman
// // The value of hero is true
// // The value of city is Gotham
// // Cookies can be made persistent ― that is, lasting beyond the browser session ― by adding "; expires=date" to the end of the cookie when it’s set, where date is a date value in the UTC String format Day, DD-Mon-YYYY HH:MM:SS GMT
// const expiryDate = new Date(); 
// const tomorrow = expiryDate.getTime() + 1000 * 60 * 60 * 24;
// expiryDate.setTime(tomorrow);

// document.cookie = `name=Batman; expires=${ expiryDate.toUTCString()}`;
// //The path can be changed so that any page in the root directory can read the cookie. It’s done by adding the string ; path=/ to the end of the cookie when it is set:
// document.cookie = 'name=Batman; path=/'
// //It’s also possible to set the domain by adding "; domain=domainName" to the end of the cookie:
// document.cookie = 'name=Batman; domain=sitepoint.com';
// //Adding the string ; secure to the end of a cookie will ensure it’s only transmitted over a secure HTTPS network:
// document.cookie = 'name=Batman; secure';
// //To remove a cookie, you need to set it to expire at a time in the past:
// document.cookie = 'name=Batman; expires=Thu, 01 Jan 1970 00:00:01 GMT';



// //The window.setTimeout() method accepts a callback to a function as its first parameter and a number of milliseconds as its second parameter.
// window.setTimeout( () => alert("Time's Up!"), 3000);
// //<< 4


// //The window.setInterval() method works in a similar way to window.setTimeout(), except that it will repeatedly invoke the callback function after every given number of milliseconds.
// function chant(){ console.log('Beetlejuice'); }
// const summon = window.setInterval(chant,1000);
// << 6



// //The data- attribute is a way of embedding data in a web page using custom attributes that are ignored by the browser.
// data-powers = 'flight superSpeed'
// data-rating = '5' 
// data-dropdown 
// data-user = 'DAZ' 
// data-max-length = '32'

// //Each element has a dataset property that can be used to access any data- attributes it contains. Here’s an example of some markup:
// <div id='hero' data-powers='flight superSpeed'>
//     Superman
// </div>
// //how to access this
// const superman = document.getElementById('hero');
// const powers = superman.dataset.powers;
// //<< 'flight superSpeed'


// //local storage: Here is a basic example of storing information. To save a value locally, use:
// localStorage.setItem('name', 'Walter White');
// //To illustrate that it’s being saved locally, try completely closing your browser, reopening it, and entering the following code in the console:
// localStorage.getItem('name'); 
// << "Walter White"
// //Rather than using the getItem() and setItem() methods, assignment can be used instead. In the next example, we simply reference localStorage.name as if it was a variable to change its value:
// localStorage.name = 'Heisenberg'; 

// console.log(localStorage.name); 
// << "Heisenberg";
// //To remove an entry from local storage, use the removeItem method:
// localStorage.removeItem('name');
// //Alternatively, this can be done using the delete operator:
// delete localStorage.name;
// //To completely remove everything stored in local storage, use the clear() method:
// localStorage.clear();
// //The code following will add an event listener that logs information about any changes to the Web Storage (note that this example won't work locally as it needs to be running on a server):
// addEventListener('storage', (event) => {
//     console.log(`The ${event.key} was updated from ${event.oldValue} to ${event.newValue} and saved in 
//     ${event.storageArea}`) }, false);
// //by using JSON, we can store any JavaScript object in local storage.
// localStorage.setItem('superman', JSON.stringify(hero);
// superman = JSON.parse(localStorage.getItem('superman'));


// //geolocation
// navigator.geolocation.getCurrentPosition(youAreHere);
// //The position object passed to the youAreHere() function has a coords property with a latitude and longitude property, which together give the coordinates of the device. These coordinates can then be used in conjunction with other applications or web services (such as a mapping service) to obtain the user’s exact location. In this example, we simply show an alert dialog that displays the user’s coordinates:
// function youAreHere(position) {
//     console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`); 
// }



// //To get started, use the Worker() constructor function to create a new worker:
// const worker = new Worker('task.js');
// //The postMessage() method can be used to send a message and start the worker working.
// worker.postMessage('Hello');
// //To post a message from the worker, the following is used in the worker script:
// self.postMessage('Finished');



// //An audio clip can be inserted into a page with the <audio> tag, using the src attribute to point to the audio file:
// <audio src='/song.mp3' controls>
// Your browser does not support the audio element.
// </audio>
// //A video clip can be inserted with the <video> tag, using the src attribute to point to the movie file:
// <video src='http://movie.mp4' controls>
//     Your browser does not support the video element.
// </video>
// //The audio or video element can be referenced by a variable using one of the DOM methods we saw in Chapter 6:
// const video = document.getElementsByTagName('video')[0];
// //The play() method will start the clip playing from its current position:
// video.play();
// //The pause() method will pause the clip at its current position:
// video.pause();
// //The volume property is a number that can be used to set the audio volume:
// video.volume = 0.9;
// //The muted property is a boolean value that can be used to mute the audio:
// video.muted = true;
// //The currentTime property is a number value that can be used to jump to another part of the clip:
// video.currentTime += 10; // jumps forward 10 seconds
// //The playbackRate property is used to fast-forward or rewind the clip by changing its value. A value of 1 is playback at normal speed:
// video.playbackRate = 8; // fast-forward at 8 times as fast
// //The loop property is a boolean value that can be set to true to make the clip repeat in a loop:
// video.loop = true;
// //The duration property can be used to see how long the clip lasts:
// video.duration;
// << 52.209



