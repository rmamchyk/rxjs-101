import {title, add, animate} from '../helpers';
import {fromEvent, interval} from 'rxjs';
import {exhaustMap, switchMap, map, take} from 'rxjs/operators';

title('exhaustMap()');

// exhaustMap - projects each source value to an Observable which is merged
// in the output Observable only if the previous projected Observable has completed.


// Example 1 ================================================================

// interval(1000)
//     .pipe(
//         take(3),
//         map(value => `source(${value * 100})`),
//         exhaustMap(
//             x => {
//                 add.li(`Source: ${x}`) 
//                 // This generated Observable has to complete
//                 // Before any value to the source is listened to.
//                 // If the values from the source complete before the 
//                 // generated Observable, they will be ignored.
//                 return interval(1000).pipe(
//                     take(5),
//                     map(
//                         value => `inner(${value})`
//                     )
//                 )
//             }
//         )
//     )
//     .subscribe(
//         value => add.li(`Emitted Value: ${value}`)
//     );




// Example 2 ================================================================

const startButton = document.getElementById('start');
const startClick$ = fromEvent(startButton, 'click');
const circle = document.getElementById('circle');

startClick$.pipe(
    exhaustMap(() => {
        return animate(5000)
    })
).subscribe(t => {
    circle.style.marginLeft = `${t*450}px`
})
