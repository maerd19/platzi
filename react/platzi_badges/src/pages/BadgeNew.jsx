import React, { Component, Fragment } from 'react';

import './styles/BadgeNew.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';

class BadgeNew extends Component {
    state = { form: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        twitter: ''
    } };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <Fragment>
                <div className="BadgeNew__hero">
                    <img className="BadgeNew__hero-image img-fluid" src={header} alt="Logo" />
                </div>

                <div className="container">
                    <div className="row">
                        {/* Badge */}
                        <div className="col-6">
                            <Badge 
                                avatar='https://www.gravatar.com/avatar?d=identicon'
                                firstName={this.state.form.firstName || 'FIRST_NAME'}
                                lastName={this.state.form.lastName || 'LAST_NAME'}
                                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                                email={this.state.form.email || 'EMAIL'}
                                twitter={this.state.form.twitter || 'twitter'}
                            />
                        </div>
                        {/* Badge Form */}
                        <div className="col-6">
                            <BadgeForm 
                                onChange={this.handleChange} 
                                formValues={this.state.form} 
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default BadgeNew;
