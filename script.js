document.addEventListener("DOMContentLoaded", () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById("user-list");
            users.forEach(user => {
                const userDiv = document.createElement("div");
                userDiv.textContent = user.name;
                userDiv.classList.add("user-item");
                userDiv.onclick = () => {
                    window.location.href = `user-detail.html?userId=${user.id}`;
                };
                userList.appendChild(userDiv);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
});