import input from './src/input.js';
import { error, active } from './src/theme.js';
import model from './src/model.js'
import { stringify } from 'csv/sync'
import fs from 'fs'

const App = () => {
    const sampleRate = +input('enter sample rate : ');

    let x = [];
    let shouldRepeatInput = true;

    while (shouldRepeatInput) {
        const enteredInput = input('enter 6 x value seperated by space : ');
        x = enteredInput.split(' ');
        shouldRepeatInput = x.length !== 6
        if (shouldRepeatInput) console.log(error('failed, try again : '))
    }

    const [x1, x2, x3, x4, x5, x6] = x;

    const times = { x1, x2, x3, x4, x5, x6 };

    let currentTime = 0;
    const result = [];

    for (const [key, value] of Object.entries(times)) {
        const data = model[key];
        const length = value / sampleRate;
        for (let i = 0; i < length; i++) {
            result.push({
                time: currentTime,
                ...data
            })
            currentTime += sampleRate
        }
    }

    try {
        const outputRecords = stringify(result, { header: true });
        fs.writeFileSync(`./output/output.csv`, outputRecords)
        console.log(active('file has been successfully created in ./output/output.csv'))
    }
    catch (err) {
        console.log(err);
        console.log(error('something went wrong!'));
    }

}

App();