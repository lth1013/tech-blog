const deleteButton = document.querySelector("#deleteButton");
const editButton = document.querySelector("#editButton");
const postTitle = document.querySelector("#postTitle");
const postContent = document.querySelector("#postContent");
const postId = document.querySelector("#postId");

const deletePost = async (event) => {
  event.preventDefault();
  const id = postId.value;
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

const editPost = async (event) => {
  event.preventDefault();
  const id = postId.value;
  const title = postTitle.value.trim();
  const content = postContent.value.trim();
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to edit post");
  }
};

deleteButton.addEventListener("click", deletePost);
editButton.addEventListener("click", editPost);
