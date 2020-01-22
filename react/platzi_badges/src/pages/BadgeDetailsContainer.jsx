import React, { Component } from 'react';

import BadgeDetails from './BadgeDetails';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';

// Cuando un componente hace demasiado es mejor dividirlo en dos.
// Esta técnica de componentes presentacionales y componentes container es común, útil y hace parte de las buenas prácticas.
// Si un componente va a trabajar con la logica es mejor llamarlo container.
export class BadgeDetailsContainer extends Component {
    state = {
        loading: true,
        error: null,
        data: undefined,
        modalIsOpen: false
    };

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null });

        try {
            const data = await api.badges.read(
                this.props.match.params.badgeId
            )
            this.setState({ loading: false, data: data })
        } catch (error) {
            this.setState({ loading: false, error: error })
        }
    };

    handleOpenModal = e => {
        this.setState({ modalIsOpen: true })
    }

    handleCloseModal = e => {
        this.setState({ modalIsOpen: false })
    }

    handleDeleteBadge = async e => {
        this.setState({ loading: true, error: null })

        try {
            await api.badges.remove(
                this.props.match.params.badgeId
            )

            this.props.history.push('/badges');
        } catch (error) {
            this.setState({ loading: false, error: error })            
        }
    }

    render() {
        if(this.state.loading) {
            return <PageLoading />
        }

        if(this.state.error) {
            return <PageError error={this.state.error} />
        }        

        return (
            <BadgeDetails 
                onCloseModal={this.handleCloseModal}
                onOpenModal={this.handleOpenModal}
                modalIsOpen={this.state.modalIsOpen}
                onDeleteBadge={this.handleDeleteBadge}
                badge={this.state.data} 
            />
        );
    }
}

export default BadgeDetailsContainer;