const shows = [
  { date: "Mon Sept 09 2024", venue: "Ronald Lane ", location: "San Francisco, CA" },
  { date: "Tue Sept 17 2024 ", venue: "Pier 3 East ", location: "San Francisco, CA" },
  { date: "Sat Oct 12 2024 ", venue: "View Lounge ", location: "San Francisco, CA" },
  { date: "Sat Nov 16 2024 ", venue: "Hyatt Agency ", location: "San Francisco, CA" },
  { date: "Fri Nov 29 2024", venue: "Moscow Center ", location: "San Francisco, CA" },
  { date: "Wed Dec 18 2024 ", venue: "Press Club ", location: "San Francisco, CA" },
];

let listEl = document.querySelector(".shows__list");

// create header
let showsHeader = newElement("li", "show", "show--header");
listEl.appendChild(showsHeader);

let dateHeader = newElement("div", "show__column", "", "Date");
showsHeader.appendChild(dateHeader);

let venueHeader = newElement("div", "show__column", "", "Venue");
showsHeader.appendChild(venueHeader);

let locationHeader = newElement("div", "show__column", "", "Location");
showsHeader.appendChild(locationHeader);

let buttonHeader = newElement("div", "show__column");
showsHeader.appendChild(buttonHeader);

// create show
shows.map((show) => {
  let showEl = newElement("li", "show", "show--row");
  listEl.appendChild(showEl);
  addInfo(show, showEl);
});

function newElement(type, class1, class2 = "", content = "") {
  let newEl = document.createElement(type);
  newEl.classList.add(class1);
  if (class2) {
    newEl.classList.add(class2);
  }
  if (content) {
    newEl.innerHTML = content;
  }
  return newEl;
}
function addInfo(showObject, parent) {
  let dateCol = newElement("div", "show__column");
  parent.appendChild(dateCol);
  let dateLabel = newElement("span", "show__label", "", "Date");
  dateCol.appendChild(dateLabel);
  let dateInfo = newElement("span", "show__info", "show__info--main", showObject.date);
  dateCol.appendChild(dateInfo);

  let venueCol = newElement("div", "show__column");
  parent.appendChild(venueCol);
  let venueLabel = newElement("span", "show__label", "", "Venue");
  venueCol.appendChild(venueLabel);
  let venueInfo = newElement("span", "show__info", "", showObject.venue);
  venueCol.appendChild(venueInfo);

  let locationCol = newElement("div", "show__column");
  parent.appendChild(locationCol);
  let locationLabel = newElement("span", "show__label", "", "Venue");
  locationCol.appendChild(locationLabel);
  let locationInfo = newElement("span", "show__info", "", showObject.location);
  locationCol.appendChild(locationInfo);

  let buttonCol = newElement("div", "show__column");
  parent.appendChild(buttonCol);
  let buttonEl = newElement("button", "show__button", "", "Buy Tickets");
  buttonCol.appendChild(buttonEl);
}
