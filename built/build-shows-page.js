"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bandsite_api_1 = require("./bandsite-api");
var listEl = document.querySelector(".shows__list");
// create header
var showsHeader = newElement("li", "show", "show--header");
var dateHeader = newElement("div", "show__column", "", "Date");
var venueHeader = newElement("div", "show__column", "", "Venue");
var locationHeader = newElement("div", "show__column", "", "Location");
var buttonHeader = newElement("div", "show__column");
listEl.appendChild(showsHeader);
showsHeader.appendChild(dateHeader);
showsHeader.appendChild(venueHeader);
showsHeader.appendChild(locationHeader);
showsHeader.appendChild(buttonHeader);
loadShows();
function loadShows() {
    return __awaiter(this, void 0, void 0, function () {
        var shows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new bandsite_api_1.BandSiteApi(bandsite_api_1.myKey).getShows()];
                case 1:
                    shows = _a.sent();
                    shows.map(function (show) {
                        var showEl = newElement("li", "show", "show--row");
                        listEl.appendChild(showEl);
                        addShow(show, showEl);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function addShow(showObject, parent) {
    var fullDate = new Date(showObject.date);
    var date = String(fullDate).substring(0, 15);
    var dateCol = newElement("div", "show__column");
    var dateLabel = newElement("span", "show__label", "", "Date");
    var dateInfo = newElement("span", "show__info", "show__info--main", "".concat(date));
    parent.appendChild(dateCol);
    dateCol.appendChild(dateLabel);
    dateCol.appendChild(dateInfo);
    var venueCol = newElement("div", "show__column");
    var venueLabel = newElement("span", "show__label", "", "Venue");
    var venueInfo = newElement("span", "show__info", "", showObject.place);
    parent.appendChild(venueCol);
    venueCol.appendChild(venueLabel);
    venueCol.appendChild(venueInfo);
    var locationCol = newElement("div", "show__column");
    var locationLabel = newElement("span", "show__label", "", "Venue");
    var locationInfo = newElement("span", "show__info", "", showObject.location);
    parent.appendChild(locationCol);
    locationCol.appendChild(locationLabel);
    locationCol.appendChild(locationInfo);
    var buttonCol = newElement("div", "show__column");
    var buttonEl = newElement("button", "show__button", "", "Buy Tickets");
    buttonEl.addEventListener("click", function () {
        alert("Sold out!");
    });
    parent.appendChild(buttonCol);
    buttonCol.appendChild(buttonEl);
}
function newElement(type, class1, class2, content) {
    if (class2 === void 0) { class2 = ""; }
    if (content === void 0) { content = ""; }
    var newEl = document.createElement(type);
    newEl.classList.add(class1);
    if (class2) {
        newEl.classList.add(class2);
    }
    if (content) {
        newEl.innerText = content;
    }
    return newEl;
}
