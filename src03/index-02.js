/*
 id: 00
 evernote-tag: rxjs-mergeScan
 desc-00: Example 1: Accumulating Values with Asynchronous Updates
 desc-01: Example 2: Fetching Data Sequentially and Accumulating Results
 desc-02: Example 1: Accumulating Results from Asynchronous API Calls
*/
const {of, from, interval} = require('rxjs');
const {tap, map, filter, delay, take, mergeScan, switchMap, concatMap, combineAll} = require('rxjs/operators');

// desc-00
const initialState = {count: 0, data: null};
const source00$ = of(1,2,3,4,5);
const result00$ = source00$.pipe(
	mergeScan((state, value) => of({
		count: state.count + value,
		data: {id: value}
	}), initialState)
);
// result00$.subscribe(console.log);

// desc-01
const source01$ = of(1,2,3,4,5);
const result01$ = source01$.pipe(
	mergeScan((state, value) => {
		const user = []

		state.id = value;
		state.name = 'test';
		user.push(state);
		
		return of(user)
	}, [])
);
const result01a$ = source01$.pipe(
	mergeScan((state, value) => {
		state = {id: value, name: 'test'}	;
		return of(state)
	}, {})
);
const result01b$ = source01$.pipe(
	mergeScan((state, value) => {
		return of([value, ...state, 99]);
		//return of([...state, value])
	}, [])
);
const result01c$ = source01$.pipe(
	mergeScan((state, value) => {
		state.id = value;
		state.name = 'test';

		return of(state)
	}, [])
);
// result01b$.subscribe(console.log);

// desc-02
const fakeRequest00$ = offset => {
	return of({
		addItems: [offset, offset + 1, offset + 2],
		mulItems: [offset * 2, offset * 3]
	}).pipe(delay(1000))
}
const source02$ = of(1,2,3,4,5);
const result02$ = source02$.pipe(
	mergeScan((acc, curr) => fakeRequest00$(curr).pipe(
		map(res99 => of([...acc, res99.addItems]))
	), []),
	combineAll()
);
result02$.subscribe(console.log);
