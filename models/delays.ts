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
        }
        return result;
    },

    getDelayFromStation: async function getDelayFromStation() {
        let allStations = await stationsModel.getStations();
        let allDelays = await this.getDelays();
        const res = [];

        for (let i=0; i < allDelays.length; i++) {
            if (allDelays[i].FromLocation !== undefined) {
                res.push(allDelays[i]);
            }
        }


        const result = res.map(item => ({
            ...allStations.find(({ LocationSignature }) => item.FromLocation[0].LocationName == LocationSignature),
            ...item,
        }));

        return result;
    },
};

export default delays;