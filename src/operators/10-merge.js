import {title, add} from '../helpers';
import {interval, fromEvent, merge} from 'rxjs';
import {take, map} from 'rxjs/operators';

title('merge()');

// merge - merges multiple streams together.


const button = document.getElementById('submit');

const streamOne$ = interval(1000).pipe(take(10));
const streamTwo$ = fromEvent(button, 'click')
    .pipe(
        map(() => 'clicked')
    );


merge(streamOne$, streamTwo$).subscribe(add.li)