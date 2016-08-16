"use strict";
const expect = require('expect');
const runSeq = require('../index.js');

const generatePromise = (value, shouldResolve) => {
  shouldResolve = typeof shouldResolve === "undefined" ? true : shouldResolve;
	const timeout = (Math.floor(Math.random() * 9) + 1);

  return new Promise((resolve, reject) => {
    setTimeout(() => shouldResolve ? resolve(value) : reject(value), timeout);
  });
}


describe("runSeq", () => {
  describe("resolves with values in correct order", () => {
    it("for a flat array of promises", () => {
      const values = [1, 2, 3, 4, 5];
      const promises = values.map(v => generatePromise(v, true));

      return runSeq(promises)
        .then(result => expect(result).toEqual(values));
    });

    it("for nested runSeq", () => {
      const values = [['1.1', '1.2', '1.3'], ['2.1'], ['3.1', '3.2', '3.3']];
      const promises = values.map(group =>
        runSeq(group.map(entry => generatePromise(entry, true)))
      );

      return runSeq(promises)
        .then(result => expect(result).toEqual(values));
    });
  });

  describe("argument types", () => {
    it("accepts an array of promises", () => {
      const values = [1, 2, 3];
      const promises = values.map(v => generatePromise(v, true));

      return runSeq(promises)
        .then(result => expect(result).toEqual(values));
    });

    it("accepts an array of functions returning promises", () => {
      const values = [1,2,3];
      const promises = values.map(v => () => generatePromise(v, true));

      return runSeq(promises)
        .then(result => expect(result).toEqual(values));
    });

    it("accepts a mixture of promises and functions returning promises", () => {
      const promises = [
        generatePromise(1),
        () => generatePromise(2),
        () => generatePromise(3),
        generatePromise(4)
      ];

      return runSeq(promises)
        .then(result => expect(result).toEqual([1,2,3,4]));
    });
  })
})
