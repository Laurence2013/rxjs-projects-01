/*
 id: 00
 evernote-tag: rxjs-mergemap
 desc-00: Example 1: Array Destructuring with mergeMap
 desc-01: Example 2: Array Destructuring with mergeMap and Asynchronous Operations
 desc-02: Example 5: Destructuring Nested Arrays and Using mergeMap
*/
const {of, from, interval} = require('rxjs');
const {tap, map, filter, delay, take, mergeMap, combineAll} = require('rxjs/operators');

// desc-001
const source00$ = of([1, 2, 3], [4, 5, 6]);
const result00$ = source00$.pipe(
	mergeMap(([first, sec, third]) => of([first, sec, third]).pipe(
		map(([first, sec, third]) => first + sec + third)
	))
);
// result00$.subscribe(console.log);

// desc-01
const asyncOperation00 = num => of(num * 5).pipe(delay(1000))
const source01$ = of([1, 2, 3], [4, 5, 6]);
const result01$ = source01$.pipe(
	mergeMap(([first, sec, third]) => from([asyncOperation00(first), asyncOperation00(sec), asyncOperation00(third)]).pipe(
		mergeMap(result => result)
	))
)
// result01$.subscribe(console.log);

// desc-02
const asyncOperation01 = num => of(num * 5).pipe(delay(1000))
const source02$ = of([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
const result02$ = source02$.pipe(
	mergeMap(([arrFirst, arrSec]) => from([arrFirst, arrSec]).pipe(
		mergeMap(([first, sec]) => from([asyncOperation01(first), asyncOperation01(sec)]).pipe(
			map(result => result)
		))
	)),
	combineAll()
);
const result02a$ = source02$.pipe(
	mergeMap(([arrOne, arrTwo]) => of([
		...arrOne.map(arr99 => asyncOperation01(arr99)),
		...arrTwo.map(arr98 => asyncOperation01(arr98))
	]).pipe(
		map(result => result),
	)),
)
result02a$.subscribe(console.log);
