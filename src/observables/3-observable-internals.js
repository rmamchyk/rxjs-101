import { add, title } from '../helpers';
import { Observable, observable } from 'rxjs';

title('Observable Internals');

// 1 - Observable function ============================================
// Observable just calls next, error and complete methods of Observer object.

// function Observable(subscriber) {
//     subscriber.next('Hello Universe!');
// }

// const observer = {
//     next: add.li,
//     error: add.li,
//     complete: () => add.li('There are no more values!')
// };

// Observable(observer);




// 2 - Observable class ================================================

// class Observable {
//     constructor(subscribeObserver) {
//         this.subscribeObserver = subscribeObserver;
//     }

//     subscribe(observer) {
//         return this.subscribeObserver(observer);
//     }
// }

// const obs = new Observable(
//     observer => {
//         observer.next('Hello from the Observable class');
//     }
// )

// const observer = {
//     next: add.li,
//     error: add.li,
//     complete: () => add.li('There are no more values!')
// };

// obs.subscribe(observer);




// 3 - Observable from RxJS =============================================
// RxJS Observable also stops calling next method after complete call.

 const obs = new Observable(
    observer => {
        observer.next('Hello from the RxJS Observable');
        observer.complete();
        observer.next('something I forgot');
    }
);

const observer = {
    next: add.li,
    error: add.li,
    complete: () => add.li('There are no more values!')
};

obs.subscribe(observer);
