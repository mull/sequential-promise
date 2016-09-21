"use strict";

function runSeq(promises) {
  return new Promise((resolve, reject) => {
    const values = [];
    let i = 0;

    const save = value => values.push(value);
    const iterate = () => i++;

    const loop = () => {
      if (i < promises.length) {
        const entry = promises[i];
        const promise = typeof entry === "function" ? entry() : entry;

        return promise
          .then(save)
          .then(iterate)
          .then(() => setTimeout(loop, 0))
          .catch(e => {
            reject(e);
            return Promise.reject(e);
          });
      } else {
        return resolve(values);
      }
    };
    loop();
  });
}


module.exports = runSeq;
