let map = L.map('SunClassMap').setView([51.217, 4.411], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let Sunclassicon = L.icon({
    iconUrl: './assets/icons/sunclass-pointer.png',

    iconSize:     [40, 80], 
    iconAnchor:   [20, 80],
});

L.marker([51.2178, 4.4110], {icon: Sunclassicon}).addTo(map);