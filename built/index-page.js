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
var commentListEl = document.querySelector(".comments__list");
var formEl = document.querySelector(".form");
loadComments();
function loadComments() {
    return __awaiter(this, void 0, void 0, function () {
        var comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commentListEl.replaceChildren("");
                    return [4 /*yield*/, new bandsite_api_1.BandSiteApi(bandsite_api_1.myKey).getComments()];
                case 1:
                    comments = _a.sent();
                    comments.forEach(function (comment) {
                        var commentElement = createComment(comment);
                        commentListEl.appendChild(commentElement);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function createComment(commentObj) {
    var commentEl = newElement("li", "comments__container");
    var avatarContainer = newElement("div", "avatar");
    var avatarImg = newElement("img", "avatar__image");
    avatarContainer.appendChild(avatarImg);
    commentEl.appendChild(avatarContainer);
    var commentContainer = newElement("div", "comment");
    commentEl.appendChild(commentContainer);
    var commentTop = newElement("div", "comment__top");
    var commentContent = newElement("p", "comment__content", commentObj.comment);
    var commentLikes = newElement("button", "comment__likes", "\uD83D\uDC4D ".concat(String(commentObj.likes)));
    commentLikes.addEventListener("click", function () {
        likeComment(commentObj.id);
    });
    commentContainer.appendChild(commentTop);
    commentContainer.appendChild(commentContent);
    commentContainer.appendChild(commentLikes);
    var formattedDate = formatDate(commentObj.timestamp);
    var commentName = newElement("h3", "comment__name", commentObj.name);
    var commentDate = newElement("span", "comment__date", "".concat(formattedDate));
    var commentDelete = newElement("button", "comment__delete", "x");
    commentDelete.addEventListener("click", function () {
        deleteComment(commentObj.id);
    });
    commentTop.appendChild(commentName);
    commentTop.appendChild(commentDate);
    commentTop.appendChild(commentDelete);
    return commentEl;
}
function newElement(type, class1, content, class2) {
    if (content === void 0) { content = ""; }
    if (class2 === void 0) { class2 = ""; }
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
formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var commentValue = event.target.comment.value;
    var nameValue = event.target.name.value;
    if (!nameValue || !commentValue) {
        if (!nameValue) {
            event.target.name.classList.add("form__input--error");
        }
        if (!commentValue) {
            event.target.comment.classList.add("form__input--error");
        }
    }
    else {
        var newComment = {
            name: nameValue,
            comment: commentValue,
        };
        var errorEl = document.querySelector(".form__input--error");
        if (errorEl) {
            errorEl.classList.remove("form__input--error");
        }
        postComment(newComment);
    }
});
function postComment(comment) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new bandsite_api_1.BandSiteApi(bandsite_api_1.myKey).postComment(comment)];
                case 1:
                    _a.sent();
                    formEl.reset();
                    loadComments();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteComment(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new bandsite_api_1.BandSiteApi(bandsite_api_1.myKey).deleteComment(id)];
                case 1:
                    _a.sent();
                    loadComments();
                    return [2 /*return*/];
            }
        });
    });
}
function likeComment(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new bandsite_api_1.BandSiteApi(bandsite_api_1.myKey).likeComment(id)];
                case 1:
                    _a.sent();
                    loadComments();
                    return [2 /*return*/];
            }
        });
    });
}
function formatDate(timestamp) {
    var currentDate = Date.now();
    var secondsAgo = (currentDate - timestamp) / 1000;
    // more that two days
    if (secondsAgo > 2 * 24 * 3600) {
        return "a few days ago";
    }
    // a day
    if (secondsAgo > 24 * 3600) {
        return "yesterday";
    }
    if (secondsAgo > 3600) {
        return "a few hours ago";
    }
    if (secondsAgo > 1800) {
        return "Half an hour ago";
    }
    if (secondsAgo > 60) {
        return Math.floor(secondsAgo / 60) + " minutes ago";
    }
    if (secondsAgo < 5) {
        return "just now";
    }
}
