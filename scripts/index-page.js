const comments = [
  {
    name: "Victor Pinto",
    date: "11/02/2023",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    photoURL: "https://placecats.com/300/300?fit=contain&position=top",
  },
  {
    name: "Christina Cabrera",
    date: "10/28/2023",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    photoURL: "https://placecats.com/400/400?fit=contain&position=top",
  },
  {
    name: "Isaac Tadesse",
    date: "10/20/2023",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    photoURL: "https://placecats.com/250/250?fit=contain&position=top",
  },
];

let commentListEl = document.querySelector(".comments__list");

comments.forEach((comment) => {
  let commentEl = newElement("li", "comments__container");
  commentListEl.appendChild(commentEl);
  addComment(comment, commentEl);
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
function addComment(commentObj, parent) {
  let avatarContainer = newElement("div", "avatar");
  parent.appendChild(avatarContainer);

  let avatarImg = newElement("img", "avatar__image");
  if (commentObj.photoURL) {
    avatarImg.setAttribute("src", commentObj.photoURL);
  }
  avatarContainer.appendChild(avatarImg);

  let commentContainer = newElement("div", "comment");
  parent.appendChild(commentContainer);

  let commentTop = newElement("div", "comment__top");
  commentContainer.appendChild(commentTop);

  let commentName = newElement("h3", "comment__name", "", commentObj.name);
  commentTop.appendChild(commentName);
  let commentDate = newElement("span", "comment__date", "", commentObj.date);
  commentTop.appendChild(commentDate);

  let commentContent = newElement("p", "comment__content", "", commentObj.comment);
  commentContainer.appendChild(commentContent);
}
