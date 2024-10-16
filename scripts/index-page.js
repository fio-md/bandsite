const commentListEl = document.querySelector(".comments__list");

async function loadComments() {
  commentListEl.replaceChildren("");
  const comments = await new BandSiteApi(myKey).getComments();
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
  avatarContainer.appendChild(avatarImg);

  const commentTop = newElement("div", "comment__top");
  const commentContent = newElement("p", "comment__content", commentObj.comment);
  commentContainer.appendChild(commentTop);
  commentContainer.appendChild(commentContent);

  console.log(commentObj);
  const commentName = newElement("h3", "comment__name", commentObj.name);
  const commentLikes = newElement("span", "comment__likes", String(commentObj.likes));
  const commentDate = newElement("span", "comment__date", commentObj.timestamp);
  commentTop.appendChild(commentName);
  commentTop.appendChild(commentLikes);
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

  if (!nameValue || !commentValue) {
    if (!nameValue) {
      event.target.name.classList.add("form__input--error");
    }
    if (!commentValue) {
      event.target.comment.classList.add("form__input--error");
    }
  } else {
    let errorEl = document.querySelector(".form__input--error");
    if (errorEl) {
      errorEl.classList.remove("form__input--error");
    }
    const newComment = {
      name: nameValue,
      comment: commentValue,
    };
    const addComment = new BandSiteApi(myKey).postComment(newComment);
    formEl.reset();
    loadComments();
  }
});
