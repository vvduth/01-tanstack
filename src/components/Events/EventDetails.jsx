import { Link, Outlet, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { fetchEvent } from '../../utils/http.js';
import {useQuery} from "@tanstack/react-query"
export default function EventDetails() {

  const {id} = useParams();
  const {data: event, isLoading, isError} = useQuery({
    queryKey: ['event', {id}],
    queryFn: ({signal}) => fetchEvent({id, signal})
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading event details</p>;
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {event && (
        <article id="event-details">
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt={event.title}/>
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{event.date} @ {event.time}</time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </article>
      )}
    </>
  );
}
