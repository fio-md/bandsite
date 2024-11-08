import { BandSiteApi, myKey } from "./bandsite-api";

const commentListEl = <HTMLElement>document.querySelector(".comments__list");
const formEl = <HTMLFormElement>document.querySelector(".form");

loadComments();

async function loadComments() {
  commentListEl.replaceChildren("");
  const comments: Object[] = await new BandSiteApi(myKey).getComments();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    commentListEl.appendChild(commentElement);
  });
}

function createComment(commentObj) {
  const commentEl = newElement("li", "comments__container");

  const avatarContainer = newElement("div", "avatar");
  const avatarImg = newElement("img", "avatar__image");
  avatarContainer.appendChild(avatarImg);
  commentEl.appendChild(avatarContainer);

  const commentContainer = newElement("div", "comment");
  commentEl.appendChild(commentContainer);

  const commentTop = newElement("div", "comment__top");
  const commentContent = newElement(
    "p",
    "comment__content",
    commentObj.comment
  );
  const commentLikes = newElement(
    "button",
    "comment__likes",
    `👍 ${String(commentObj.likes)}`
  );
  commentLikes.addEventListener("click", () => {
    likeComment(commentObj.id);
  });
  commentContainer.appendChild(commentTop);
  commentContainer.appendChild(commentContent);
  commentContainer.appendChild(commentLikes);

  const formattedDate = formatDate(commentObj.timestamp);
  const commentName = newElement("h3", "comment__name", commentObj.name);
  const commentDate = newElement("span", "comment__date", `${formattedDate}`);
  const commentDelete = newElement("button", "comment__delete", "x");
  commentDelete.addEventListener("click", () => {
    deleteComment(commentObj.id);
  });
  commentTop.appendChild(commentName);
  commentTop.appendChild(commentDate);
  commentTop.appendChild(commentDelete);

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

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentValue = (event.target as HTMLInputElement).comment.value;
  const nameValue = (event.target as HTMLInputElement).name.value;

  // if (!nameValue || !commentValue) {
  //   if (!nameValue) {
  //     event.target.name.classList.add("form__input--error");
  //   }
  //   if (!commentValue) {
  //     event.target.comment.classList.add("form__input--error");
  //   }
  // } else {
  //   const newComment = {
  //     name: nameValue,
  //     comment: commentValue,
  //   };
  //   let errorEl = document.querySelector(".form__input--error");
  //   if (errorEl) {
  //     errorEl.classList.remove("form__input--error");
  //   }
  //   postComment(newComment);
  // }
});

async function postComment(comment: Object) {
  await new BandSiteApi(myKey).postComment(comment);
  formEl.reset();
  loadComments();
}

async function deleteComment(id) {
  await new BandSiteApi(myKey).deleteComment(id);
  loadComments();
}

async function likeComment(id) {
  await new BandSiteApi(myKey).likeComment(id);
  loadComments();
}

function formatDate(timestamp) {
  const currentDate = Date.now();
  const secondsAgo = (currentDate - timestamp) / 1000;

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
