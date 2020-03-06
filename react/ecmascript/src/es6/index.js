// Parametros por defecto: Establecemos valores que se pasan a una funcion por defecto.
// ES5
function newFunction(name, age, country) {
    var name = name || 'ivan';
    var age = age || 29;
    var country = country || 'MX';

    console.log(name, age, country);
    
}

// ES6
function newFunction2(name = 'Ivan', age = 29, country = 'MX') {
    console.log(name, age, country);
}
newFunction2();
newFunction2('Adrian', 12);

// Template literals: Permiten separar o unir varios elementos.
// ES5
let hello = "Hello";
let world = "World";
let epicPhrase = hello + ' ' + world;
console.log(epicPhrase);

// ES6
let epicPhrase2 = `${hello} ${world}`
console.log(epicPhrase2);


// Multilínea
// ES5
let lorem = "Qui conseguatur. Commodi. Ipsum vel duis yet minima \n"
+ "otra frase epica que necesitamos."

// ES6
let lorem2 = `otra frase epica que necesitamos
ahora es otra frase epica`;

console.log(lorem);
console.log(lorem2);


// Destructuring: Se obtienen elementos dentro de un objeto o arreglo.
let person = {
    'name': 'oscar',
    'age': 29,
    'country': 'MX'
}
// ES5
console.log(person.name, person.age);

// ES6
let { name, age, country } = person;
console.log(name, age);

// Spread Operator: Permite expandir varios elementos
let team1 = ['Ivan', 'Alejandra', 'Adri'];
let team2 = ['Faus', 'Rafa', 'Alejandro'];

// ES5
let education = ['David', 'Ivan', 'Alejandra', 'Adri', 'Faus', 'Rafa', 'Alejandro'];

// ES6
let education2 = ['David', ...team1, ...team2];
console.log(education);
console.log(education2);

// let, const y var
// let solo esta disponible en el bloquede codigo donde fue definido .
// global no permite que cambie su valor.
// var tiene una accesibilidad global.
{
    var globalVar = 'Global Var'
}

{
    let globalLet = 'Global Let'
    console.log(globalLet);

}

console.log(globalVar);
// console.log(globalLet);
const a = 'b';
a = 'a';

// Propiedad de objetos mejorada
let name = 'Ivan';
let age = 29;

// ES5
obj = { name: name, age: age };
console.log(obj);

// ES6
obj2 = { name, age };
console.log(obj2);


// Arrow functions: Sintaxis más reducida y this no vinculable
const names = [
    {name: 'Ivan', 'age': 29},
    {name: 'Alejandra', 'age': 29}
]

// funcion anonima dentro de map
let listOfNames = names.map(function (item) {
    console.log(item.name);    
})

let listOfNames2 = names.map(item => console.log(item.name));

const listOfNames3 = (name, age, country) => {
    // ...
}

// Cuando solo se pasa un parametro a una funcion se pueden omitir los parentesis.
const listOfNames4 = name => {
    // ...
}
// Los arrow functions pueden tener un return implicito si se omite la palabra reservada return.
const square = num => num * num;


// Promesas: Trabajan el asincronismo, ya que JS no es un lenguaje sincronico (no puede ejecutar varios elementos a la vez sino que los ejecuta uno por uno)
// Esto resuelve el callback hell
const helloPromise = () => {
    // La promesa espera la respuesta de una logica a resolverse 
    return new Promise((resolve, reject) => {
        if(false) {
            resolve('Hey!');
        } else {
            reject('Ups!!');
        }
    })
}
``
// Resolver y manejar promesas
helloPromise()
    .then(response => console.log(response))
    .then(() => console.log('hola'))
    .catch(error => console.log(error))


// Clases: 
class calculator {
    // Inicializacion de variables disponibles en un scope global
    constructor() {
        this.valueA = 0;
        this.valueB = 0;
    }
    sum(valueA, valueB) {
        this.valueA = valueA;
        this.valueB = valueB;
        return this.valueA + this.valueB;
    }
}

const calc = new calculator();
console.log(calc.sum(2,2));

// Modulos: Utiliza import y export para importar modulos que estan siendo exportados de otros archivos
// Esto significa que podemos separar nuestra logica 
// Si usas export default al hacer el import debes omitir las llaves e importarlo así: import hello from ./module.
// En cambio si no le pones default deberia ser así: import { hello } from ./module.
import { hello, diag } from './module';
hello();
diag();

// Generators: Es una funcion especial que retorna una serie de valores segun el algoritmo definido
// Util para fibonacci
function* helloWorld() {
    if (true) {
        yield 'Hello, ';
    }
    if (true) {
        yield 'World';
    }
    if (true) {
        yield 'Ahhhh peeerrro'
    }
};

const generatorHello = helloWorld();
console.log(generatorHello.next().value);
console.log(generatorHello.next().value);
console.log(generatorHello.next().value);
