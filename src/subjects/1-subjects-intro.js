import {title, add} from '../helpers';
import {Subject, Observable} from 'rxjs';
import {} from 'rxjs/operators';

title('Subjects Intro');

// Subject - is both an Observable and an Observer, so we can push values into it,
// and subscribe to these values. Subjects are HOT observables.


// HOT observables - are MULTICAST observables.
// (they emit the same value for all subscribers)

const sub = new Subject();

setTimeout(() => {
    sub.subscribe(x => add.li('Sub: ' + x));
}, 1000);
setTimeout(() => {
    sub.subscribe(x => add.li('Sub: ' + x));
}, 1000);
setTimeout(() => {
    sub.subscribe(x => add.li('Sub: ' + x));
}, 1000);

setTimeout(() => {
    sub.next(new Date());
}, 1500);




// COLD observables - are UNICAST observables.
// (every time something new subscribes to them - they produce a new value)

// const obs = new Observable(
//     observer => {
//         observer.next(new Date());
//     }
// );

// setTimeout(() => {
//     obs.subscribe(add.li)
// }, 1000);
// setTimeout(() => {
//     obs.subscribe(add.li)
// }, 2000);
// setTimeout(() => {
//     obs.subscribe(add.li)
// }, 3000);
