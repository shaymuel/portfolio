// export function getJSON(url) {
//     return fetch(url)
//       .then(function(response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         } else {
//           //console.log(response.json());
//           return response.json();
//         }
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }

//   export const getLocation = function(options) {
//     return new Promise(function(resolve, reject) {
//       navigator.geolocation.getCurrentPosition(resolve, reject, options);
//     });
//   };

// import { getJSON } from "./utilities.js";
// // Quake Model
// export default class Quake {
//   constructor() {
//     this.baseUrl =
//       "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02";
//     // store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
//     this._quakes = [];
//   }
//   async getEarthQuakesByRadius(position, radius = 100) {
//     // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
//     const query =
//       this.baseUrl +
//       `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
//     console.log(query);
//     this._quakes = await getJSON(query);
//     return this._quakes;
//   }
// }