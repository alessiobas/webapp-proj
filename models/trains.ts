import config from "../config/config.json";

const trains = {
    getStations: async function getStations() {
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();

        return result.data;
    },

    getDelays: async function getDelays() {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();

        return result.data;
    },

    getDelaysFromStations: async function getDelaysFromStations() {
        let getStations = await this.getStations();
        let getDelays = await this.getDelays();
        let result = [];

        getDelays.forEach((element) => {
            if (element.FromLocation) {
                result.push(element);
            }
        })
        result = result.map(item => ({
            ...getStations.find(({LocationSignature }) => item.FromLocation[0].LocationName == LocationSignature ),
            ...item,
        }));

        return result;
    },
};

export default trains;