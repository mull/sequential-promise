A simple way to run promises in a sequence.


## How to use
[See example.js which is a runnable example](/example.js)

There's essentially two ways to run promises. The function expects an array of either type:
- promise
- function returning a promise

Which one to use boils down to:
- should the async operations start all at once
- should the next operation only start when the previous one finishes?


## TODO
- better example of exception handling
<<<<<<< HEAD
- tests for when promise rejects
=======
>>>>>>> e315e0bd256629e993bfdebac386377cd963a645
- option to stop on first failure


