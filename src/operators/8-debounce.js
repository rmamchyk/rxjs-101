import {title, add} from '../helpers';
import {fromEvent, interval} from 'rxjs';
import {debounce, debounceTime, take} from 'rxjs/operators';

title('debounce()')


const inputBox = document.getElementById('input');
const renderBox = document.getElementById('display-content');
const submitButton = document.getElementById('submit');

const content$ = fromEvent(inputBox, 'keyup');
const submit$ = fromEvent(submitButton, 'click');


// debounce ===============================================
content$
    .pipe(
        debounce(() => submit$)
    )
    .subscribe(
        () => {
            renderBox.innerHTML = inputBox.value;
        }
    );


// debounceTime ===============================================
content$
    .pipe(
        debounceTime(2000)
    )
    .subscribe(
        () => {
            renderBox.innerHTML = inputBox.value;
        }
    );
