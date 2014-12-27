/**
 * [supplant function for string interpolation]
 * @param  {Object} o [Object that contains the variable that must be supplant on the string]
 * @return {String}   [The value to supplant]
 * Usage:
 * console.log("I'm {age} years old!".supplant({ age: 29 }));
 * console.log("The {a} says {n}, {n}, {n}!".supplant({ a: 'cow', n: 'moo' }));
 */
String.prototype.supplant = function (o) {
  return this.replace(/{([^{}]*)}/g, function (a, b) {
    var r = o[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
};

// 27.12.2014 LFG Usage of supplant:
//console.log("I'm {age} years old!".supplant({ age: 29 }));
//console.log("The {a} says {n}, {n}, {n}!".supplant({ a: 'cow', n: 'moo' }));