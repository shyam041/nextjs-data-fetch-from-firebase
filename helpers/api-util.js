export async function getAllRecords() {
  try {
    //console.log("this is response");
    const response = await fetch(
      "http://internal-gmaapps-test3-lb-2109958951.us-east-2.elb.amazonaws.com:7801/accounts",
      {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      }
    );
    const data = await response.json();
    // console.log("this is response", data.items);
    // const events = [];
    // for (const key in data) {
    //   events.push({
    //     id: key,
    //     ...data[key],
    //   });
    // }
    return data.items;
  } catch (error) {
    console.log("error occured while fetching data : ", error);
    return [];
  }
}

export async function processData() {
  const allRecords = await getAllRecords();
  // if (allEvents.length) {
  //   return allEvents.filter((event) => event.isFeatured);
  // }
  // return allEvents;
  return allRecords.map((record) => {
    const { accountId, firstName, lastName, dateCreated } = record;
    return {
      id: accountId,
      title: firstName,
      location: lastName,
      date: dateCreated,
      image: "",
    };
  });
}

export async function getEventById(id) {
  const allEvents = await getAllRecords();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllRecords();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
