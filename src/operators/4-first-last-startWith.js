import {title, add, sampleData$} from '../helpers';
import {pluck, first, last, startWith} from 'rxjs/operators';

title('first(), last(), startWith()');


const me = {
    name: 'Roman Mamchyk'
}

sampleData$
    .pipe(
        // startWith - works like an intializer for the first value;
        // when we want to start a stream with a specific value
        startWith(me), 
        pluck('name')
    )
    .subscribe(add.li);
