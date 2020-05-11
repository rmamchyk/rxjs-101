import {add, title} from '../helpers';
import {concat, interval, fromEvent} from 'rxjs';
import {take, map} from 'rxjs/operators';

title('concat()')

// concat - concats multiple streams together, but put them in sequence.
// (while stream one is emmiting values, before that completes,
// it doesn't care about what's happening on stream two) 


const button = document.getElementById('submit');

const streamOne$ = interval(1000).pipe(take(10));
const streamTwo$ = fromEvent(button, 'click')
    .pipe(
        map(() => 'clicked')
    );


concat(streamOne$, streamTwo$).subscribe(add.li)

