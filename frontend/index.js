function createCard(item) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.style.width = "18rem";

  const img = document.createElement("img");
  img.src = `${item.thumbnail}`;
  img.className = "card-img-top";
  img.alt = "...";
  cardDiv.appendChild(img);

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  const itemPrice = document.createElement("h3");
  itemPrice.className = "item-price";
  itemPrice.textContent = "₹ " + item.price;
  cardBodyDiv.appendChild(itemPrice);

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = item.title;
  cardBodyDiv.appendChild(cardTitle);

  const button = document.createElement("a");
  button.href = "#";
  button.className = "btn btn-primary";
  button.textContent = "Add to Cart";
  cardBodyDiv.appendChild(button);

  cardDiv.appendChild(cardBodyDiv);

  document.querySelector(".card-container").appendChild(cardDiv);
}

const getAllProducts = async () => {
  const resultsList = document.querySelector(".card-container");
  resultsList.innerHTML = "";

  const response = await fetch(`http://localhost:5000/`);
  const data = await response.json();

  console.log(data);

  data.products.forEach((item) => {
    createCard(item);
  });
};

document
  .getElementById("searchInput")
  .addEventListener("input", async function () {
    const query = this.value.trim();
    const resultsList = document.querySelector(".card-container");

    if (query.length > 3) {
      resultsList.innerHTML = "";
      const response = await fetch(
        `http://localhost:5000/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      console.log(data);

      data.products.forEach((item) => {
        createCard(item);
      });
    }
    if (query.length == 0) {
      getAllProducts();
    }
  });

window.onload = getAllProducts();
