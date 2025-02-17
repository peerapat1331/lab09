document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const userName = urlParams.get("userName");
    document.getElementById("user-name").textContent = userName;

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            const postsList = document.getElementById("posts-list");
            posts.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.classList.add("post-item");
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button class="toggle-comments" data-post-id="${post.id}">ดูความคิดเห็น</button>
                    <div class="comments" id="comments-${post.id}" style="display:none;"></div>
                `;
                postsList.appendChild(postDiv);
            });

            document.querySelectorAll(".toggle-comments").forEach(button => {
                button.addEventListener("click", event => {
                    const postId = event.target.dataset.postId;
                    const commentsDiv = document.getElementById(`comments-${postId}`);

                    if (commentsDiv.style.display === "none") {
                        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                            .then(response => response.json())
                            .then(comments => {
                                commentsDiv.innerHTML = comments.map(comment => `
                                    <p><strong>${comment.name}</strong>: ${comment.body}</p>
                                `).join("");
                                commentsDiv.style.display = "block";
                                event.target.textContent = "ซ่อนความคิดเห็น";
                            });
                    } else {
                        commentsDiv.style.display = "none";
                        event.target.textContent = "ดูความคิดเห็น";
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching posts:", error));
});