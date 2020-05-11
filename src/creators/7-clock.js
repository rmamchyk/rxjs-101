import {title, add, update, Clock, moveTime} from '../helpers';
import {interval, range} from 'rxjs';
import {map} from 'rxjs/operators';

title('Building the Clock');


/**
 *  Create an instance of the Clock Class
 *  This will create an SVG element, and attach it to the DOM
 *  Inside the SVG will be all the elements we will be manipulating
 */
const clock = new Clock('chart');

const secondMarks$ = range(1, 60);
secondMarks$.subscribe(
    tickMark => add.line(tickMark, 'seconds')
);

const hourMarks$ = range(1, 12);
hourMarks$.subscribe(
    tickMark => add.line(tickMark, 'hours')
);

const timeTick$ = interval(1000).pipe(
  map(() => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    return {
      hours,
      minutes,
      seconds
    };
  })
);

const secondHand = document.getElementById('seconds');
const minuteHand = document.getElementById('minutes');
const hourHand = document.getElementById('hours');

timeTick$.pipe(moveTime(60, 'minutes')).subscribe(angle => {
  update.line(minuteHand, angle, 'minute');
});

timeTick$.pipe(moveTime(60, 'seconds')).subscribe(angle => {
  update.line(secondHand, angle, 'second');
});

timeTick$.pipe(moveTime(12, 'hours')).subscribe(angle => {
  update.line(hourHand, angle, 'hour');
});
