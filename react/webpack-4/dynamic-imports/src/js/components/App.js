import React, { useState } from 'react'
import data from './data.json'
import Loader from './loader'
import logo from '../../images/platzi.png'
import video from '../../video/que-es-core.mp4'

import '../../sass/sass.scss'
import '../../less/less.less'
import '../../stylus/stylus.styl'

console.log(data);
const App = () => {
    const [loaderList, setLoaderList] = useState([])
    async function handleClick() {
        setLoaderList(data.loaders)
        const { alerta } = await import('./alert.js')
        alerta('este modulo ha cargado dinamicamente')
    }
return (
        <div>
            <p className="sass">
                esto es sass
            </p>
            <p className="less">
                estp es less
            </p>
            <p className="stylus">
                esto es stylus
            </p>
            <p className="post-css">
                esto es postcss
            </p>
            que linda aplicacion hecha en React.js
            <video src={video} width={360} controls poster={logo}></video>
            <p><img src={logo} alt="platzi logo" width={40}/></p>
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