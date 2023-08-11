const deleteCommentHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete comment");
    }
    };

document.querySelectorAll(".delete-comment-btn").forEach((btn) => {
    btn.addEventListener("click", deleteCommentHandler);
});

const editCommentHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute("data-id");
    const comment_text = document.querySelector(`#comment-${id}`).value.trim();
    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({ comment_text }),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to edit comment");
    }
};

document.querySelectorAll(".edit-comment-form").forEach((form) => {
    form.addEventListener("submit", editCommentHandler);
});

const addCommentHandler = async (event) => {
    event.preventDefault();
    const post_id = event.target.getAttribute("data-id");
    const comment_text = document.querySelector(`#comment-${post_id}`).value.trim();
    const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ post_id, comment_text }),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to add comment");
    }
};

document.querySelectorAll(".add-comment-form").forEach((form) => {
    form.addEventListener("submit", addCommentHandler);
}
);