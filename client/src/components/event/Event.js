import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import EventItem from '../event/EventItem';
import { getEvent } from '../../actions/eventActions';

class Event extends Component{
    componentDidMount(){
        this.props.getEvent(this.props.match.params.id);
    }
    
    render(){
        const {event, loading } = this.props.events;
        let eventContent;
        
        if(event === null || loading  || Object.keys(event).length === 0){
            eventContent = <Spinner />;
        }
        else{
            eventContent = (
                <EventItem event={event} />
            );
        }
        
        return(
            <div className="post">
                <div className="container">
                    <h1 className="text-center mt-2">{event.nameofevent}</h1>
                    <Link to="/events" className="btn btn-light mb-3">
                        Back
                    </Link>
                    {eventContent}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    events: state.events
});

export default connect(mapStateToProps, {getEvent})(Event);