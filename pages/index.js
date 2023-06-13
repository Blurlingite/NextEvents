import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage(props) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

// getStaticProps() executes before the components do, so usse it to create the props those components, like HomePage, accept
// usually you accept a context object here but we don't need it in this case
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      // comes from firebase
      events: featuredEvents,
    },
  };
}
export default HomePage;
