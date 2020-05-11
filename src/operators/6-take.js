import {title, add} from '../helpers';
import {interval, fromEvent} from 'rxjs';
import {take, takeWhile, takeUntil, takeLast} from 'rxjs/operators';

title('take(), takeLast(), takeWhile()');

// takeWhile =========================
// interval(500)
//     .pipe(
//         takeWhile(x => x < 5)
//     )
//     .subscribe(add.li);



// takeLast =========================
// interval(500)
//     .pipe(
//         take(10),
//         takeLast(5)
//     )
//     .subscribe(add.li);



// takeUntil =========================
const button = document.getElementById('submit');
const buttonClicks$ = fromEvent(button, 'click');

interval(500)
    .pipe(
        takeUntil(buttonClicks$)
    )
    .subscribe(add.li);
