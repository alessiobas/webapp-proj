import config from '../config/config.json';
import storage from './storage';
import delayModel from '../models/delays';

const fav = {
    addFav: async function addFav(station) {
        const token = await storage.readToken();
        const newFav = {
            api_key: config.api_key,
            artefact: station
        };

        await fetch(`${config.base_url}/data`, {
            method: 'POST',
            body: JSON.stringify(newFav),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });
        console.log(token);
    },

    showFav: async function showFav() {
        const token = await storage.readToken();
        const response = await fetch(`${config.base_url}/data?api_key=${config.api_key}`, {
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
            method: 'GET'
        });
        // console.log(token);
        const result = await response.json();
        const delays = await delayModel.getDelayFromStation();
        let arry = [];

        const mapRes = result.data.map(item => ({
            ...delays.find(({ LocationSignature }) => item.artefact === LocationSignature ),
            ...item,
        }));

        for (let i=0; i < mapRes.length; i++) {
            if (mapRes[i] !== undefined) {
                arry.push(mapRes[i]);
            }
        }

        // const returner = arry.filter((obj, index, self) =>
        // index === self.findIndex((l) => (l.save === obj.save && l.State === obj.State))
        // );

        return arry;
    },

    getUsers: async function getUsers() {
        const response = await fetch(`${config.base_url}/users?api_key=${config.api_key}`);
        const result = await response.json();

        return result;
    },

}

export default fav;