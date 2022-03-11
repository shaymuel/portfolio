import { getJSON, getLocation } from './utilities.js'

const baseUrl =
  'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-02-02'

let quakes = []

showQuakes()

async function initPos() {
  const data = await getLocation()
  return data.coords
}

async function getQuakesForLocation({ longitude, latitude }) {
  const geoUrl = baseUrl + `&latitude=${latitude}&longitude=${longitude}&maxradiuskm=760`
  const quakes = await getJSON(geoUrl)
  return quakes
}

const earthquakeListTemplate = (quake) => `
  <li data-id="${quake.id}">
    <b>${quake.properties.title}</b>
    ${new Date(quake.properties.time)}
  </li>
`

const generateListMarkup = (quakes, template) => `
  <ul>
    ${quakes.map((quake) => template(quake)).join('')}
  </ul>
`

async function showQuakes() {
  const location = await initPos()
  quakes = await getQuakesForLocation(location)
  const listElement = document.querySelector('#quakeList')
  listElement.innerHTML = generateListMarkup(quakes.features, earthquakeListTemplate)

  listElement.addEventListener('click', (event) => {
    if (!event.target.matches('ul')) {
      const target = event.target.closest('li')
      const quakeId = target.dataset.id
      const quake = quakes.features.find((item) => item.id === quakeId)
      const detailsElement = document.querySelector('#quakeDetails')
      const quakeProperties = Object.entries(quake.properties)
      detailsElement.innerHTML = quakeProperties
        .map((item) => {
          if (item[0] === 'time' || item[0] === 'updated') {
            return `${item[0]}: ${new Date(item[1])}`
          } else {
            return `${item[0]}: ${item[1]}`
          }
        })
        .join('')
    }
  })
}
