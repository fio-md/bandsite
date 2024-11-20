import { BandSiteApi, myKey } from "./bandsite-api.ts";

const commentListEl = document.querySelector(".comments__list") as HTMLElement;
const formEl = document.querySelector(".form") as HTMLFormElement;

// inputs
const nameInput = document.querySelector("#name") as HTMLInputElement;
const commentInput = document.querySelector("#comment") as HTMLTextAreaElement;

// comment posted in the last 24 hours
let isRecent: boolean = true;

type PostedComment = {
  name: string;
  comment: string;
  id: string;
  likes: number;
  timestamp: number;
};

loadComments();

async function loadComments() {
  commentListEl.replaceChildren("");
  const comments: PostedComment[] = await new BandSiteApi(myKey).getComments();
  comments.forEach((comment: PostedComment) => {
    const commentElement = createComment(comment);
    commentListEl.appendChild(commentElement);
  });
}

function createComment(commentObj: PostedComment) {
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

  const formattedDate = dynamicTimestamp(commentObj.timestamp);
  const commentName = newElement("h3", "comment__name", commentObj.name);
  const commentDate = newElement("span", "comment__date", `${formattedDate}`);

  commentTop.appendChild(commentName);
  commentTop.appendChild(commentDate);
  if (isRecent) {
    const commentDelete = newElement("button", "comment__delete", "x");
    commentDelete.addEventListener("click", () => {
      deleteComment(commentObj.id);
    });
    commentTop.appendChild(commentDelete);
  }

  return commentEl;
}

function newElement(
  type: string,
  class1: string,
  content: string = "",
  class2: string = ""
) {
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

formEl.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const comment = commentInput.value;
  const name = nameInput.value;

  // validation
  if (!name || !comment) {
    if (!name) {
      nameInput.classList.add("form__input--error");
    }
    if (!comment) {
      commentInput.classList.add("form__input--error");
    }
  } else {
    const newComment = {
      name,
      comment,
    };
    let errorEl = document.querySelector(".form__input--error");
    errorEl?.classList.remove("form__input--error");
    postComment(newComment);
  }
});

async function postComment(comment: { name: string; comment: string }) {
  await new BandSiteApi(myKey).postComment(comment);
  formEl.reset();
  loadComments();
}

async function deleteComment(id: string) {
  await new BandSiteApi(myKey).deleteComment(id);
  loadComments();
}

async function likeComment(id: string) {
  await new BandSiteApi(myKey).likeComment(id);
  loadComments();
}

function dynamicTimestamp(timestamp: number) {
  const currentDate = Date.now();
  const secondsAgo = (currentDate - timestamp) / 1000;
  isRecent = true;

  if (secondsAgo > 7 * 24 * 3600) {
    isRecent = false;
    return "over a week ago";
  }
  // more that two days
  if (secondsAgo > 2 * 24 * 3600) {
    isRecent = false;
    return "a few days ago";
  }
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
  return "just now";
}
