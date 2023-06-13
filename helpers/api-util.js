// get all events and filter them here (which is not ideal). Usually, you would filter the results on Firebase using queries
export async function getAllEvents() {
  // ".json" is specific to Firebasse
  const response = await fetch(
    "https://newevents-db-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  // Firebase returns data as an object, so transform it into an array of objects
  const events = [];

  // the key are the fields you created:  e1, e2, etc
  for (const key in data) {
    events.push({
      id: key,
      ...data[key], // for the data of this key, take the remaining fields and use them as keys and assign them their given value from Firebase Ex. title: Programming for everyone
    });
  }
  return events;
}

// used in index.js
export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured); // filter out non-featured events
}
