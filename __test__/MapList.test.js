import { render } from '@testing-library/react-native';
import MapList from '../components/map/MapList';

test('component MapView exists', async () => {
    const testIdName = "MapView";
    const { getByTestId } = render(<MapList />);

    const found = getByTestId(testIdName)

    expect(found).toBeTruthy();
});

test('component View that shows info text exists', async () => {
    const testIdName = "infoText";
    const { getByTestId } = render(<MapList />);

    const found = getByTestId(testIdName)

    expect(found).toBeTruthy();
});

test('header and text in info box should exist containing correct text', async () => {
    const { getByText } = render(<MapList />);
    const header = await getByText("I väntan på tåget")
    const rowOne = await getByText('Markerat på kartan finner du en grön cirkel vid stationens pin som visar vart du hinner promenera medan du väntar.');
    const rowTwo = await getByText('Zooma in på kartan för att se markeringen.');


    expect(header).toBeDefined();
    expect(rowOne).toBeDefined();
    expect(rowTwo).toBeDefined();
});