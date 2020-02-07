import React, { Fragment } from 'react';
// 1.- 'Connect' conecta este componente a redux para disponer del estado o para enviar valores a nuestros actions
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/Home.scss';

// 3.- Destructuramos de los props los elementos que usaremos.
const Home = ({ myList, trends, originals }) => {

  return (
    <Fragment>
      <Search />
      {/* 4.- Hacemos render de los elementos mapeados del estado inicial */}
      {myList.length > 0 &&
        <Categories title="Mi Lista">
          <Carousel>
            {myList.map(item =>
              <CarouselItem 
                key={item.id} 
                {...item} 
                // isList solo se asigna como verdadero. Si se quiere asignar como falso se hace de la sig. forma isList={false}
                isList
              />
            )}
          </Carousel>
        </Categories>
      }
      <Categories title="Tendencias">
        <Carousel>
          {trends.map(item =>
            <CarouselItem 
              key={item.id} 
              {...item} 
            />
          )}
        </Carousel>
      </Categories>
      <Categories title="Originales de Ivan Video">
        <Carousel>
          {originals.map(item =>
            <CarouselItem 
              key={item.id} 
              {...item} 
            />
          )}
        </Carousel>
      </Categories>
    </Fragment>
  );
}

// 2.- Traemos los elementos que necesitamos del estado inicial para pasarlos como props a nuestro componente.
// La informacion sera solicitada en funcion de la informacion que se usa dentro del componente.
const mapStateToProps = state => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals
  };
};

// 5.- Union de redux y del componente que se exporta.
// Este export reemplaza al export default Home;
// El 1er parametro de connect solicita al provider los valores que se mapean del estado.
// El 2do paramtro solicita las acciones 
// Si no se tiene alguno de los parametros se envia null
export default connect(mapStateToProps, null)(Home)