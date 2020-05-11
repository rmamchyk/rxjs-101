import {title, add} from '../helpers';
import {from, fromEvent, interval} from 'rxjs';
import {skip, skipWhile, skipLast, skipUntil, take} from 'rxjs/operators';

title('skip(), skipLast(), skipWhile()')

// skipLast =======================
from(['apples', 'grapes', 'oranges', 'pears'])
    .pipe(
        skipLast(2)
    )
    .subscribe(add.li);


// skipWhile =======================
interval(1000)
    .pipe(
        take(10),
        skipWhile(x => x < 4)
    )
    .subscribe(add.li)


// skipUntil =======================
const button = document.getElementById('submit');
const buttonClicks$ = fromEvent(button, 'click');


interval(1000)
    .pipe(
        skipUntil(buttonClicks$)
    )
    .subscribe(add.li)
