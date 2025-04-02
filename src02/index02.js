/*
 id: 00
 evernote-tag: rxjs-expand
 desc-00: 1.  Traversing a Linked List:
 desc-01: Scenario: Imagine you have a file system represented as a nested JSON object. You want to flatten this 
	structure and get a list of all files, including their paths.
 desc-02: Write an RxJS code snippet that utilizes expand and takeWhile to output the text of each comment and 
	its replies in a flattened sequence.
*/
const {of, from, interval} = require('rxjs');
const {tap, map, filter, delay, take, expand, reduce, concatMap, takeWhile} = require('rxjs/operators');

// desc-00
const linkedList = {   
	value: 1,   
	next: {     
		value: 2,     
		next: {       
			value: 3,       
			next: {         
				value: 4,         
				next: null,       
}}}};
const result00$ = of(linkedList).pipe(
	expand(val99 => val99.next !== null ? of(val99.next) : of(null)),
	takeWhile(val98 => val98.next !== null),
	map(val97 => val97.value)
);
//result00$.subscribe(console.log);

// desc-01
const fileSystem = {
  name: "root",
  type: "directory",
  children: [
    {
      name: "documents",
      type: "directory",
      children: [
        { name: "report.pdf", type: "file" },
        { name: "notes.txt", type: "file" }
      ]
    },
    {
      name: "images",
      type: "directory",
      children: [
        { name: "vacation.jpg", type: "file" }
      ]
    }
  ]
};
const result01$ = of(fileSystem).pipe(
	expand(file99 => file99.type === 'directory' ? from(file99.children) : of(null)),
	takeWhile(file98 => file98 !== null),
	map(file97 => ({name: file97.name, type: file97.type}))
);
//result01$.subscribe(console.log);

// desc-02
const comments = [
  { text: "This is a great post!", 
		replies: [{ text: "I agree!" }, 
			{ text: "I have a question...", 
				replies: [{ text: "Here is the answer." }] 
			}] 
	},
  { text: "Another comment here.", 
		replies: [{ text: "Thanks for sharing!" }] 
	},
];
const result02$ = from(comments).pipe(
	concatMap(comms99 => of(comms99).pipe(
		expand(reps99 => reps99.replies ? from(reps99.replies) : of(null)),
		takeWhile(reps98 => reps98 !== null)
	)),
	map(text => text.text)
);
result02$.subscribe(console.log);
