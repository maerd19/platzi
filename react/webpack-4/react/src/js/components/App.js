import React, { useState } from 'react';
import data from './data.json';
import Loader from './loader';

console.log(data);


const App = () => {
    const [loaderList, setLoaderList] = useState([])
    function handleClick() {
        setLoaderList(data.loaders)
    }
return (
        <div>
            que linda aplicacion hecha en React.js
            <ul>
                {
                    loaderList.map(item => <Loader {...item} key={item.id}/>)
                }
            </ul>
            <button onClick={handleClick}>Mostrar lo aprendido hasta el momento</button>
        </div>
    )
}

export default App;