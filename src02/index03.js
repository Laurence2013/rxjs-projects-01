/*
 id: 00
 evernote-tag: rxjs-expand
 desc-00: Scenario 3: Generating Fibonacci Sequence up to a Limit
 desc-01: Example 2: Factorial Sequence
*/
const {of, from, interval} = require('rxjs');
const {tap, map, filter, delay, take, expand, reduce, concatMap, takeWhile} = require('rxjs/operators');

// desc-00
const source00$ = of([0,1]);
const result00$ = source00$.pipe(
	expand(([prev, curr]) => {
		const next = prev + curr;
		return of([curr, next])
	}),
	takeWhile(([_, curr]) => curr <= 100),
	map(([_, val99]) => val99)
);
// result00$.subscribe(console.log);

// desc-01
const source01$ = of([1,1]);
const result01$ = source01$.pipe(

)
