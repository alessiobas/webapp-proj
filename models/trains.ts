import config from "../config/config.json";
import Stations from "../interfaces/stations";
import Delays from "../interfaces/delays";


const trains = {
    getStations: async function getStations() {
        const response = await fetch(`https://trafik.emilfolino.se/stations`);
        const result = await response.json();

        return result.data;
    },

    getStarStations: function getStarStations(LocationSignature: string, stations: Array<any>) {
        return stations.find(station => station.LocationSignature == LocationSignature);
    },

    getDelays: async function getDelays() {
        const response = await fetch(`https://trafik.emilfolino.se/delayed`);
        const result = await response.json();

        return result.data;
    },

    getTime: function getTime(adTime: string, esTime: string) {
        const adTimeObj:Date = new Date(adTime)
        const esTimeObj:Date = new Date(esTime)
        const mins = Math.abs(esTimeObj.getTime() - adTimeObj.getTime()) / (1000 * 60) % 60;
        const getTimeRes = {
            "adtime": adTimeObj.toLocaleString('se-SV'),
            "estime": esTimeObj.toLocaleString('se-SV'),
            "mins": mins,
        };
        return getTimeRes;
    },

    getDelay: function getDelay(LocationSignature: string, stations:Array<any>) {
        return stations.find(station => station.LocationSignature == LocationSignature);
    },

    getStarDelay: function getStarDelay(ActivityId: string, delays:Array<any>) {
        return delays.find(delay => delay.ActivityId == ActivityId);
    },

    getDelayFromStation: function getDelayFromStation(delay: Object, stations:Array<any>) {
        const fLocation = this.getDelay(delay.FromLocation[0].LocationName, stations);
        const tLocation = this.getDelay(delay.ToLocation[0].LocationName, stations);

        const result = {
            "delay": delay,
            "locations": {
                "fLocation": fLocation,
                "tLocation": tLocation,
            },
            "time": this.getTime(delay.AdvertisedTimeAtLocation, delay.EstimatedTimeAtLocation)
        }

        return result;
    },

    // getDelaysFromStations: async function getDelaysFromStations() {
    //     let getStations = await this.getStations();
    //     let getDelays = await this.getDelays();
    //     let result = [];

    //     getDelays.forEach((element) => {
    //         if (element.FromLocation) {
    //             result.push(element);
    //         }
    //     })
    //     result = result.map(item => ({
    //         ...getStations.find(({ LocationSignature }) => item.FromLocation[0].LocationName == LocationSignature ),
    //         ...item,
    //     }));

    //     return result;
    // },
};

export default trains;