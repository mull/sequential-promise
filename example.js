const runSeq = require("./index");

const genPromise = (value) =>
  new Promise((resolve) => {
    console.log(`${value} start`);
    const timeout = (Math.floor(Math.random() * 10) + 1) * 100;

    setTimeout(() => {
      console.log(`${value} finish`);
      resolve(value)
    }, timeout);
  });


runSeq([
  runSeq([
    genPromise('1.1'),
    () => genPromise('1.2'),
    genPromise('1.3')
  ]),
  () => runSeq([
    () => genPromise('2.1'),
    genPromise('2.2'),
  ])
]).then(v => console.log(v));


/* OUTPUT:
1.1 start
1.3 start
1.3 finish
1.1 finish
1.2 start
1.2 finish
2.2 start
2.1 start
2.1 finish
2.2 finish
[ [ '1.1', '1.2', '1.3' ], [ '2.1', '2.2' ] ]
*/
