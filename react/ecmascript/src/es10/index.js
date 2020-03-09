// Nace en junio de 2019

// array.flat permite devolver una matriz con cualquier submatriz aplanada
Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});
let array = [1,2,3, [1,2,3, [1,2,3]]];

console.log(array.flat(2));

// flat map mapea cada elemento, pasarle una funcion y aplanarlo segun el resultado
let array = [1,2,3,4,5];
console.log(array.flatMap(value => [value, value * 2]));

// trimStart(): Elimina los espacios en blanco al inicio de los strings
let hello = '                 hello world';
console.log(hello);
console.log(hello.trimStart());

// trimEnd(): Elimina los espacios en blanco al final de los strings
let hello = 'hello world                 ';
console.log(hello);
console.log(hello.trimEnd());

// optional catch error
// ES5
try {

} catch (error) {
    console.log(error);    
}
// ES10
try {

} catch {
    error
}

// From entries transforma clave y valor en un objeto
let entries = [["name", "oscar"], ["age", 32]];
console.log(Object.fromEntries(entries));

// 
let mySymbol = `My Symbol`;
let symbol = Symbol(mySymbol);
console.log(symbol.description);
