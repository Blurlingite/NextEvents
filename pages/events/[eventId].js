import { Fragment } from "react";

import { getEventById, getAllEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // the eventId matches the name of the file in pages>event>[eventId].js (minus the square brackets)
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

// since this is a dynamic page with multiple possible outcomes, we also need getStaticPaths to
// tell NextJS for which parameters (event IDs) it should pre-render this page and
// therefore, which event IDs it should call getStaticProps() & this component function
export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  // an object with a paths key must be returned that holds an array of objects where we specify our param values
  // we will use the getAllEvents() to find all the event IDs we need to pre-generate their pages
  // fallback must be specified to let NextJS know if there are more possible event ID values that we didn't pre-generate, so that it may pre-generate on the fly (a 404 page will be generated if we enter an event ID that doesn't exist)
  // fallback is set to false since we specified all possible paths (using the obtained eventss from the database)
  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
