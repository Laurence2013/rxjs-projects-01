/*
 id: 00
 evernote-tag: rxjs-concatmap
 desc-00: Some chaining observable examples
 desc-01: 3. Game Logic with Turn-Based Actions
*/
const {of, from, interval} = require('rxjs');
const {tap, map, filter, delay, concatMap, switchMap, take} = require('rxjs/operators');

// desc-00
const source00$ = interval(1000).pipe(take(5));
const doubleNum00$ = val00 => of(val00).pipe(
	map(val00 => val00 * 2),
	delay(500)
);
const doubleNum01$ = val00 => new Promise(res => res(val00 * 2));
const result00$ = source00$.pipe(concatMap(val => doubleNum01$(val)));
const result01$ = source00$.pipe(
	concatMap(val => from(doubleNum01$(val))),
	concatMap(val => of(val).pipe(delay(5000)))
);

// desc-01
const players = ['Player-1', 'Player-2'];

const getPlayer$ = of(players[1]);


