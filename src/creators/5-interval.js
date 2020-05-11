import { title } from '../helpers';
import { interval } from 'rxjs';

title('interval()');

const body = document.querySelector('body');

const counter = interval(1000);
counter.subscribe(
    () => {
        const red = Math.random() * 255;
        const green = Math.random() * 255;
        const blue = Math.random() * 255;
        body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
)