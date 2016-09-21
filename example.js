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


function successfulExample() {
  return runSeq([
    runSeq([
      genPromise('1.1'),
      () => genPromise('1.2'), // this'll be called only when 1.1 finishes
      genPromise('1.3') // this is called immediately
    ]),
    () => runSeq([
      () => genPromise('2.1'),
      genPromise('2.2'),
    ])
  ]).then(v => console.log("return value: ", v));

  /* OUTPUT:
  1.1 start
  1.3 start
  1.3 finish
  1.1 finish
  1.2 start
  1.2 finish
  2.2 start // note how this started before 2.1
  2.1 start // and this started after
  2.1 finish // yet the return value is in the correct order
  2.2 finish // and this one comes after 2.2

  return value: [ [ '1.1', '1.2', '1.3' ], [ '2.1', '2.2' ] ]
  */
}

function rejectExample() {
  return runSeq([
    () => genPromise('first'),
    () => new Promise((resolve, reject) => reject("no dice")),
    () => genPromise('third'),
  ])
    .then(v => console.log(v))
    .catch(e => console.error("failed: ", e));
}

console.log("Successful example: ")
successfulExample()
  .then(() => console.log("------------\nExample with rejecting promise:"))
  .then(rejectExample);
