
const map = L.map('map', {
    gestureHandling: true
}).setView([39.8376017, -4.3978819], 5);

L.tileLayer.provider('CartoDB.Voyager').addTo(map);

const markers = [];

let popup = null;

const iconOk = L.icon({
    iconUrl: 'img/marker-icon-magenta.png', iconAnchor: [12.5, 41]
});
const iconGrey = L.icon({
    iconUrl: 'img/marker-icon-grey.png', iconAnchor: [12.5, 41]
});

d3.csv("data/localizaciones.csv", (data) => {
    const date = new Date(data.fecha);
    const icon = date > new Date() || isNaN(date) ? iconOk : iconGrey;
    const popupClaim = data['lema'] ? `<span class="claim">${data['lema']}</span>` : '';
    const popupAddress = `<span class="address">${data['direccion']}</span>`;
    const popupDate = isNaN(date)
        ? '<span class="date grey"></span>'
        : `<span class="date">${date.getUTCDate()}.${date.getUTCMonth()+1}.${date.getFullYear()} - ${date.toLocaleTimeString()}</span>`;
    const marker = L.marker([+data.latitud, +data.longitud], { icon });
    marker.addTo(map);
    marker.bindPopup(`${popupClaim}${popupAddress}${popupDate}`);
    markers.push(marker);
});
