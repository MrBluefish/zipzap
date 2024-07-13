
// Initialize the map centered over the Carolinas
const map = L.map('map').setView([34.0, -80.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example GeoJSON data for counties and zip codes
const countiesGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-80.0, 35.0],
                        [-80.1, 35.0],
                        [-80.1, 35.1],
                        [-80.0, 35.1],
                        [-80.0, 35.0]
                    ]
                ]
            },
            "properties": {
                "name": "Example County"
            }
        }
    ]
};

const zipCodesGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-80.2, 35.0],
                        [-80.3, 35.0],
                        [-80.3, 35.1],
                        [-80.2, 35.1],
                        [-80.2, 35.0]
                    ]
                ]
            },
            "properties": {
                "zip": "12345"
            }
        }
    ]
};

// Adding counties to the map
L.geoJson(countiesGeoJson).addTo(map);

// Adding zip codes to the map
const zipLayer = L.geoJson(zipCodesGeoJson, {
    style: function(feature) {
        return { color: '#0000ff' }; // Default color, can change based on logic
    }
}).addTo(map);

function highlightZipCodes(zipCodes, color) {
    zipLayer.eachLayer(function (layer) {
        if (zipCodes.includes(layer.feature.properties.zip)) {
            layer.setStyle({ color: color });
        } else {
            layer.setStyle({ color: '#0000ff' }); // Reset others to default
        }
    });
}

function applyHighlight() {
    const input = document.getElementById('zipInput').value;
    const zipCodes = input.split(',').map(zip => zip.trim());
    highlightZipCodes(zipCodes, '#ff0000'); // Change color as needed
}
