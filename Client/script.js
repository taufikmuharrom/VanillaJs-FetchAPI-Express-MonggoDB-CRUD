const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn");
let output = "";
const url = "http://localhost:5000/api/posts";

//Read all post
//Method: GET
fetch(url)
  .then((res) => res.json())
  .then((data) => showCards(data))
  .catch((error) => console.log(error));

//Insert new post
//Method: POST
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      showCards(dataArr);
      titleValue.value = "";
      bodyValue.value = "";
    });
});

postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";

  let id = e.target.parentElement.dataset.id;

  // Delete the existing post
  // Method: DELETE
  if (delButtonIsPressed) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        alert("the post was successfully deleted!");
        location.reload();
      });
  }

  if (editButtonIsPressed) {
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-text").textContent;
    console.log(titleContent);
    console.log(bodyContent);
    titleValue.value = titleContent;
    bodyValue.value = bodyContent;

    // Update the existing post
    // Method: PUT
    btnSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleValue.value,
          body: bodyValue.value,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("the post was successfully updated!");
          location.reload();
        });
    });
  }
});

const showCards = (posts) => {
  posts.forEach((post) => {
    output += `
      <div class="card mt-5 mr-3 bg-light" style="width: 45%"">
           <div class="card-body" data-id=${post._id}>
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="card-link" id="edit-post">Edit</a>
                    <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
      </div>
      `;
    postsList.innerHTML = output;
  });
};
