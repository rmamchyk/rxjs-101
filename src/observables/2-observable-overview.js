import { add, title } from '../helpers';
import { Observable } from 'rxjs';

title('Observable Overview')


const o = new Observable(
    observer => {
        setInterval(() => {
            observer.next('Observable every second');
        }, 1000);
    }
);


const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise');
    }, 5000);
})


// Promise - emits an event which happens at later point of time but only once.
p.then(message => {
    add.li(message);
});

// Observable - emits series of events which happen over time.
// subscribe(next, error, complete)
// or
// subscribe({ next: func, error: func, complete: func })
const subscription = o.subscribe({
    next: message => {
        add.li(message);
    },
    error: error => {
        console.error(error);
    },
    complete: () => {
        add.li('This Observable is complete');
    }
});

setTimeout(() => {
    subscription.unsubscribe();
}, 4000)
 