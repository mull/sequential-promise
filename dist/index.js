"use strict";

function runSeq(promises) {
  return new Promise(function (resolve, reject) {
    var values = [];
    var i = 0;

    var save = function save(value) {
      return values.push(value);
    };
    var iterate = function iterate() {
      return i++;
    };

    var loop = function loop() {
      if (i < promises.length) {
        var entry = promises[i];
        var promise = typeof entry === "function" ? entry() : entry;

        return promise.then(save).then(iterate).then(function () {
          return setTimeout(loop, 0);
        }).catch(function (e) {
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

