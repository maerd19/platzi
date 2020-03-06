// Nace en junio de 2017
// Object.entries: Devuelve la clave y los valores de un objeto en forma de una matriz
const data = {
    frontend: 'Ivan',
    backend: 'Laura',
    design: 'Medel',
}

const entries = Object.entries(data);
console.log(entries);
console.log(entries.length);
// console.log(data.length); este valor regresa undefined

// Object.values: Devuelve los valores de un arreglo de strings.
const data = {
    frontend: 'Ivan',
    backend: 'Laura',
    design: 'Medel',
}

const values = Object.values(data);
console.log(values);
console.log(values.length);

// Padding: Agregar elementos a un string
const string = 'hello';
console.log(string.padStart(7, 'hi'));
console.log(string.padEnd(12, ' -----'));
console.log('food'.padEnd(12, ' -----'));

// Trailing commas
const obj = {
    name: 'Ivan',
}

// Async/Await
const helloWorld = () => {
    return new Promise((resolve, reject) => {
        (true)
        ? setTimeout(() => resolve('Hello World'), 3000)
        : reject(new Error('Test Error'))        
    })
};

const helloAsync = async () => {
    const hello = await helloWorld();
    console.log(hello);    
}

helloAsync();

// El correcto manejo del async/await viene acompanado de trycatch
const anotherFunction = async () => {
    try {
        const hello = await helloWorld();
        console.log(hello);        
    } catch (error) {
        console.log(error);        
    }
}
anotherFunction();