import {title, add} from '../helpers';
import {fromEvent, BehaviorSubject, Subject, from, combineLatest} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {debounceTime, switchMap, tap, skipWhile, pluck} from 'rxjs/operators';

title('Weather App');

const googleApiKey = '';

const lastSearch = localStorage.getItem('lastSearch');
const firstTerm = lastSearch || ''; 

// Selectors for DOM elements
const searchInput = document.getElementById('search');
const resultsBox = document.getElementById('results-container');
const spinner = document.getElementById('spinner');

// Event handlers
const searchEvent$ = fromEvent(searchInput, 'keyup');
const resultsEvent$ = fromEvent(resultsBox, 'click');

// Subjects
const inputSub$ = new BehaviorSubject(firstTerm);
const placeSub$ = new Subject();
const weatherSub$ = new Subject();

inputSub$.pipe(
    skipWhile(searchTerm => !searchTerm || searchTerm.length < 3),
    tap(() => {
        spinner.className = 'spinner';
        resultsBox.innerHTML = '';
    }),
    debounceTime(1000),
    switchMap(searchTerm => {
        return ajax.getJSON(`http://localhost:3000/autocomplete/${searchTerm}/`)
            .pipe(
                tap(() => spinner.className = ''),
                switchMap(results => from(results))
            );
    })
).subscribe(
    result => {
        localStorage.setItem('lastSearch', searchInput.value);
        add.result(result.description, result.place_id);
    }
);

searchEvent$.subscribe(
    event => inputSub$.next(searchInput.value)
);

resultsEvent$.pipe(
    switchMap(event => {
        const placeId = event.target.getAttribute('data');
        return ajax.getJSON(`http://localhost:3000/place/${placeId}`)
    })
).subscribe(
    place => placeSub$.next(place)
);

const weatherData$ = placeSub$.pipe(
    pluck('geometry', 'location'),
    switchMap(coords => {
        return ajax.getJSON(`http://localhost:3000/weather/${coords.lat}/${coords.lng}`)
            .pipe(
                pluck('currently')
            )
    })
);

combineLatest(weatherData$, placeSub$).subscribe(
    results => {
        const weather = results[0];
        const temperatureCelsius = (5/9) * (weather.apparentTemperature - 32);
        const place = results[1];

        document.getElementById('image-container').innerHTML = '';

        if (place.photos && place.photos.length) {
            const photos = place.photos;
            const photoIndex = Math.floor(Math.random() * photos.length);
 
            add.div(`
                <div class="row">
                    <div class="col s12 m7">
                        <div class="card">
                            <div class="card-image">
                                <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[photoIndex].photo_reference}&key=${googleApiKey}">
                                <div class="bg-gradient"></div>
                                <span class="card-title">${Math.round(temperatureCelsius)}&deg;C</span>
                            </div>
                            <div class="card-content">
                                <p>Current Conditions: ${weather.summary}</p>
                                <p>Chance of Rain: ${weather.precipProbability}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        } else {
            add.div(`
                <div class="row">
                    <div class="col s12 m6">
                        <div class="card pink darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">${Math.round(temperatureCelsius)}&deg;C</span>
                                <p>Current Conditions: ${weather.summary}</p>
                                <p>Chance of Rain: ${weather.precipProbability}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
    }
)
