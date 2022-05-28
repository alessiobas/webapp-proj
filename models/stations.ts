const stations = {
    getStations: async function getStations() {
        const response = await fetch(`https://trafik.emilfolino.se/stations`);
        const result = await response.json();

        return result.data;
    },

    getStation: function getStation(station: string, stations: Array<any>) {
        for (let i=0; i < stations.length; i++) {
            if (stations[i].LocationSignature == station) {
                return stations[i].AdvertisedLocationName;
            }
        }
        return station;
    },

    getStarStations: function getStarStations(LocationSignature: string, stations: Array<any>) {
        return stations.find(station => station.LocationSignature == LocationSignature);
    },

    getCoordinates: function getCoordinates(station) {
        return station.Geometry.WGS84.split("(")[1].split(")")[0].split(" ");
    },

};

export default stations;