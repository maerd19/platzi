// Nace en junio de 2018

// Operador de reposo: Puede extraer las propiedades de un objeto que aun no se ha construido
const obj = {
    name: 'Ivan',
    age: 29,
    country: 'MX'
};

let { country, ...all } = obj;
console.log(all);

// Utilizando el spread operator podemos unir uno o mas objetos a otro objeto
const obj = {
    name: "Ivan",
    age: 29,
}

const obj1 = {
    ...obj,
    country: "MX"
}

console.log(obj1);

// Promise.finally cuando ha terminado el llamado y ejecutar una funcion segun sea el caso
const helloWorld = () => {
    return new Promise((resolve, reject) => {
        (true)
        ? setTimeout(() => resolve('Hello World'), 3000)
        : reject(new Error('Test Error'))
    });
};

helloWorld()
    .then(response => console.log(response))
    .catch(error => console.log(error))
    .finally(() => console.log('Finalizado'))

// mejoras en el regex. Agrupar bloques de regex y acceder a cada uno de ellos 
const regexData = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const match = regexData.exec('2018-04-20');
const year = match[1]
const month = match[2]
const day = match[3]

console.log(year, month, day);
