import stationsModel from './stations';

const delays = {
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

    // getStarDelay: function getStarDelay(ActivityId: string, delays:Array<any>) {
    //     return delays.find(delay => delay.ActivityId == ActivityId);
    // },

    getDelaysListAsync: async function getDelaysList () {
        const stations = await stationsModel.getStations();
        const delays = await this.getDelays();

        const delaysAtStations = [];
        const locationDelays = [];
        const namesOfLocations = [];

        for (let i=0; i < delays.length; i++) {
            locationDelays.push(delays[i].FromLocation);
        }

        for (let i=0; i < locationDelays.length; i++) {
            if (locationDelays[i] !== undefined) {
                namesOfLocations.push(locationDelays[i][0].LocationName);
            }
        }

        stations.filter((station) => {
            if (namesOfLocations.includes(station.LocationSignature)) {
                delaysAtStations.push(station);
            }
        })

        return delaysAtStations;

    },

    getDelaysList: function getDelaysList(station: string, delayed) {
        const delayedInfo = [];
        for (let i=0; i < delayed.length; i++) {
            if (delayed[i].FromLocation !== undefined) {
                if (delayed[i].FromLocation[0].LocationName == station) {
                    delayedInfo.push(delayed[i]);
                }
            }
        }

        const result = {
            "delay": delayedInfo
            // "time": this.getTime(delayedInfo[0].AdvertisedTimeAtLocation, delayedInfo[0].EstimatedTimeAtLocation)
        }
        return result;
    },

    // getDelayFromStation: function getDelayFromStation(delay: Object, stations:Array<any>) {
    //     let fLocation = "null";
    //     let tLocation = "null";
    //     let location:Boolean = false;

    //     if (delay.FromLocation !== undefined) {
    //         fLocation = this.getDelay(delay.FromLocation[0].LocationName, stations);
    //         location = true;
    //     } else {
    //         fLocation = "info saknas";
    //     }

    //     if (delay.ToLocation !== undefined) {
    //         tLocation = this.getDelay(delay.ToLocation[0].LocationName, stations);
    //     } else {
    //         tLocation = "info saknas";
    //     }
        
    //     const result = {
    //         "delay": delay,
    //         "locations":
    //         [
    //             {
    //             "fLocation": fLocation,
    //             "tLocation": tLocation,
    //             },
    //         ],
    //         "locationBool": location,
    //         "time": this.getTime(delay.AdvertisedTimeAtLocation, delay.EstimatedTimeAtLocation)
    //     }

    //     return result;
    // },
};

export default delays;