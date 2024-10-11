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

const commentListEl = document.querySelector(".comments__list");

function loadComments() {
  commentListEl.replaceChildren("");

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    commentListEl.appendChild(commentElement);
  });
}

function createComment(commentObj) {
  const commentEl = newElement("li", "comments__container");

  const avatarContainer = newElement("div", "avatar");
  const commentContainer = newElement("div", "comment");
  commentEl.appendChild(avatarContainer);
  commentEl.appendChild(commentContainer);

  const avatarImg = newElement("img", "avatar__image");
  if (commentObj.photoURL) {
    avatarImg.setAttribute("src", commentObj.photoURL);
  }
  avatarContainer.appendChild(avatarImg);

  const commentTop = newElement("div", "comment__top");
  const commentContent = newElement("p", "comment__content", commentObj.comment);
  commentContainer.appendChild(commentTop);
  commentContainer.appendChild(commentContent);

  const commentName = newElement("h3", "comment__name", commentObj.name);
  const commentDate = newElement("span", "comment__date", commentObj.date);
  commentTop.appendChild(commentName);
  commentTop.appendChild(commentDate);

  return commentEl;
}

function newElement(type, class1, content = "", class2 = "") {
  const newEl = document.createElement(type);
  newEl.classList.add(class1);
  if (class2) {
    newEl.classList.add(class2);
  }
  if (content) {
    newEl.innerText = content;
  }
  return newEl;
}

loadComments();

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentValue = event.target.comment.value;
  const nameValue = event.target.name.value;
  const nameEl = document.getElementById("name");
  const commentEl = document.getElementById("comment");
  if (!nameValue || !commentValue) {
    if (!nameValue) {
      nameEl.classList.add("form__input--error");
    }
    if (!commentValue) {
      commentEl.classList.add("form__input--error");
    }
  } else {
    if (nameEl.classList.contains("form__input--error")) {
      nameEl.classList.remove("form__input--error");
    }
    if (commentEl.classList.contains("form__input--error")) {
      commentEl.classList.remove("form__input--error");
    }
    let currentDate = Date.now();
    const newComment = { name: nameValue, date: currentDate, comment: commentValue };
    comments.unshift(newComment);
    loadComments();
  }
});
