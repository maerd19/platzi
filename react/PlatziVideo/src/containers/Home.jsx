import React, { Fragment } from 'react';
// Connect nos ayuda a conectar un componente a redux
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import '../assets/styles/Home.scss';

const Home = ({ myList, trends, originals }) => {

  return (
    <Fragment>
      <Search />
      {myList.length > 0 &&
        <Categories title="Mi Lista">
          <Carousel>
            {myList.map(item =>
              <CarouselItem key={item.id} {...item} />
            )}
          </Carousel>
        </Categories>
      }
      <Categories title="Tendencias">
        <Carousel>
          {trends.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
      <Categories title="Originales de Platzi Video">
        <Carousel>
          {originals.map(item =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>
    </Fragment>
  );
}

// Esta funcion nos traera los props del estado
// Los props que se solicitaran seran en funcion de la informacion que se usa dentro del componente.
// En este componente se usan mylist, trends, originals por lo que seran los mismos datos que importaremos de nuestro estado inicial.
const mapStateToProps = state => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals
  };
};

// Union del conector con el componente que se exporta.
// Este export reemplaza al export default Home;
// El 1er parametro de connect solicita al provider informacion del estado
// El 2do paramtro solicita las acciones 
export default connect(mapStateToProps, null)(Home)
