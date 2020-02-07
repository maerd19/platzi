import React from 'react';
// Connect nos ayuda a conectar este componente a redux para disponer del estado o para enviar valores a nuestros actions
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 1.- Importamos de actions los metodos del action que se comunicaran con el reducer
import { Link } from 'react-router-dom';
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

const CarouselItem = props => {
    const { id, cover, title, year, contentRating, duration, isList, myList } = props;
    // 3.- Definimos los metodo que manejaran las acciones provenientes del actions
    const handleSetFavorite = () => {
        const exist = myList.find(item => item.id === id);
        (exist) ? alert('Ya has agregado este elemento a tus favoritos')
        :
        props.setFavorite({
            id, cover, title, year, contentRating, duration
        })
    }
    const handleDeleteFavorite = itemId => {
        props.deleteFavorite(itemId);
    }
    return (
    <div className="carousel-item">
        <img className="carousel-item__img" src={cover} alt={title} />
        <div className="carousel-item__details">
            <div>
                {/* El id se obtiene del render que se hace por cada uno de los elementos que se presenta en el carousel */}
                <Link to={`/player/${id}`}>
                    <img 
                        className="carousel-item__details--img" 
                        src={playIcon} 
                        alt="Play Icon" 
                    />
                </Link>
                

                {isList ?
                    <img 
                        className="carousel-item__details--img"
                        src={removeIcon}
                        alt="Remove Icon"
                        onClick={() => handleDeleteFavorite(id)}
                    />
                    :
                    <img 
                        className="carousel-item__details--img" 
                        src={plusIcon} 
                        alt="Plus Icon"
                        onClick={handleSetFavorite}
                    />
                }
                
            </div>
            <p className="carousel-item__details--title">{title}</p>
            <p className="carousel-item__details--subtitle">
                {`${year} ${contentRating} ${duration}`}
            </p>
        </div>
    </div>
    );
}
// propTypes nos ayudara a definir los tipos de valores que se esperan como props del componente.
CarouselItem.propTypes = {
    cover: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    contentRating: PropTypes.string,
    duration: PropTypes.number
}

// 2.1.- Traemos los elementos que necesitamos del estado inicial para pasarlos como props a nuestro componente.
const mapStateToProps = state => {
    return { myList: state.myList };
};
// 2.2.- Traemos las acciones que modificaran los valores del estado inicial para pasarlos como props a nuestro componente.
const mapDispatchToProps = {
    setFavorite,
    deleteFavorite
}

// 4.- Union de redux y del componente que se exporta.
// Este export reemplaza al export default HomeCarouselItem;
export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem)