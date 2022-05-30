import { render } from '@testing-library/react-native';
import Home from '../components/home/Home';

test('header should exist containing text Tågförseningar i Sverige', async () => {
    const { getByText } = render(<Home />);
    const header = await getByText('Tågförseningar i Sverige');

    expect(header).toBeDefined();
});

test('button should exist containing text Trafikinfo', async () => {
    const { getByText } = render(<Home />);
    const button = await getByText('Se förseningar...');

    expect(button).toBeDefined();
});