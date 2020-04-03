// request gif and extract url
async function requestGif(searchTerm) {
  const url = "http://api.giphy.com/v1/gifs/search";
  const res = await axios.get(url, {
    params: {
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
      q: searchTerm,
      limit: 1,
    },
  });
  const gifUrl = res.data.data[0].images.downsized_large.url;
  appendGif(gifUrl);
  updateCount();
}

// select form and add submit listener
const form = document.querySelector("#searchForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#search");
  if (!input.value) return;
  requestGif(input.value);
  input.value = "";
});

// append gif to container div
function appendGif(url) {
  const container = document.querySelector("#gifContainer");
  const newGif = document.createElement("img");
  newGif.classList.add("img-thumbnail", "col-sm-6", "col-md-4", "col-lg-4");
  newGif.src = url;
  container.append(newGif);
}

const removeButton = document.querySelector("#remove");
removeButton.addEventListener("click", () => {
  document.querySelector("#gifContainer").innerHTML = "";
  updateCount();
});

function updateCount() {
  const counter = document.querySelector("#count");
  counter.innerText = document.querySelectorAll("img").length;
}
