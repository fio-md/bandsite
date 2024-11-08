import { BandSiteApi, myKey } from "./bandsite-api";

const listEl = document.querySelector(".shows__list");

// create header
const showsHeader = newElement("li", "show", "show--header");
const dateHeader = newElement("div", "show__column", "", "Date");
const venueHeader = newElement("div", "show__column", "", "Venue");
const locationHeader = newElement("div", "show__column", "", "Location");
const buttonHeader = newElement("div", "show__column");

listEl.appendChild(showsHeader);
showsHeader.appendChild(dateHeader);
showsHeader.appendChild(venueHeader);
showsHeader.appendChild(locationHeader);
showsHeader.appendChild(buttonHeader);

loadShows();

async function loadShows() {
  const shows = await new BandSiteApi(myKey).getShows();
  shows.map((show: object) => {
    const showEl = newElement("li", "show", "show--row");
    listEl.appendChild(showEl);
    addShow(show, showEl);
  });
}

function addShow(showObject, parent) {
  const fullDate = new Date(showObject.date);
  const date = String(fullDate).substring(0, 15);
  let dateCol = newElement("div", "show__column");
  let dateLabel = newElement("span", "show__label", "", "Date");
  let dateInfo = newElement(
    "span",
    "show__info",
    "show__info--main",
    `${date}`
  );
  parent.appendChild(dateCol);
  dateCol.appendChild(dateLabel);
  dateCol.appendChild(dateInfo);

  let venueCol = newElement("div", "show__column");
  let venueLabel = newElement("span", "show__label", "", "Venue");
  let venueInfo = newElement("span", "show__info", "", showObject.place);
  parent.appendChild(venueCol);
  venueCol.appendChild(venueLabel);
  venueCol.appendChild(venueInfo);

  let locationCol = newElement("div", "show__column");
  let locationLabel = newElement("span", "show__label", "", "Venue");
  let locationInfo = newElement("span", "show__info", "", showObject.location);
  parent.appendChild(locationCol);
  locationCol.appendChild(locationLabel);
  locationCol.appendChild(locationInfo);

  let buttonCol = newElement("div", "show__column");
  let buttonEl = newElement("button", "show__button", "", "Buy Tickets");
  buttonEl.addEventListener("click", () => {
    alert("Sold out!");
  });
  parent.appendChild(buttonCol);
  buttonCol.appendChild(buttonEl);
}

function newElement(type, class1, class2 = "", content = "") {
  let newEl = document.createElement(type);
  newEl.classList.add(class1);
  if (class2) {
    newEl.classList.add(class2);
  }
  if (content) {
    newEl.innerText = content;
  }
  return newEl;
}
