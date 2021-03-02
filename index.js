
const ip = document.getElementById("ip")
const local = document.getElementById("location")
const timezone = document.getElementById("timezone")
const isp = document.getElementById("isp")
const input = document.querySelector("input")
const button = document.querySelector(".search-bar div")


let myMap = L.map('mapid', {
    minZoom: 3,
    maxZomm: 0,
    zoomControl: false

})


L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(myMap);



let iconMarker = L.icon(({
    iconUrl: "images/icon-location.svg",
    iconSize: [37,45],
    iconAnchor:[24, 45]
}))


let marker = L.marker([0, 0], {icon: iconMarker}).addTo(myMap)


button.addEventListener("click", () => addUrl(input.value))

document.addEventListener("keypress", (e) => {
    if(e.key === "Enter" && input.value !== "") {
       addUrl(input.value)
    }
})

let url = `https://geo.ipify.org/api/v1?apiKey=at_SxXlqqKgtb63WZ3k2S2Pjiw9Vf7EH`

fetch(`${url}&ipAddress=1.1.1.1`)
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                addInformation(data)
                addLocation(data.location)  
            })
        } 
        else {
            window.alert("Error, result not found")
        }
})


function addUrl (value) {
    let domainOrIp = true
    let urlParam 
    let number = /[0-9]/;
    for (const v of value) {
        if ( number.test(v) || v == ".") {
            domainOrIp = true
        }
        else {
            domainOrIp = false
            break
        }
    }
    domainOrIp ? urlParam =  `&ipAddress=${value}` : urlParam = `&domain=${value}`
    fetch(`${url}${urlParam}`)
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                addInformation(data)
                addLocation(data.location)  
            })
        } 
        else {
            window.alert("Error, result not found")
            input.value = ""
        }
    })
   
}

function addLocation (loc) {
    myMap.removeLayer(marker)
    marker = L.marker([loc.lat, loc.lng], {icon: iconMarker}).addTo(myMap)
    myMap.setView([loc.lat, loc.lng], 8)
}


function addInformation (data) {
    ip.innerHTML = data.ip
    local.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
    timezone.innerHTML = `UTC ${data.location.timezone}`
    isp.innerHTML = data.isp

}







