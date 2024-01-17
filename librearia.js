const libraryB = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log("Response", response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404 - Pagina non trovata");
        } else if (response.status === 500) {
          throw new Error("505 - Internal server error");
        } else {
          throw new Error("Errore generico");
        }
      }
    })

    .then((libraryObject) => {
      console.log("LibraryObject", libraryObject);
      libraryObject.forEach((libraryObject) => {
        const newCol = document.createElement("div");
        newCol.classList.add(
          "col-6",
          "col-md-4",
          "col-lg-3",
          "mb-3",
          "postion-relative"
        );
        newCol.innerHTML = ` <div class="card" style="height:100%">
    <img src="${libraryObject.img}" alt="img" style="width: 100%; height: 400px ;" >
    <div class="card-body text-monospace"  >
    <h5 class="card-title mt-2 ms-2 fw-bold fs-5" style="font-family: 'Courier New', Courier, monospace;" ">${libraryObject.title}</h5>
    <p class="card-text ms-2 fw-bold fs-5 ">${libraryObject.price} €</p>
    <div class="col d-flex justify-content-between">
    <button type="button" class="btn btn-success" >Compra</button>
    <button type="button" class="btn btn-danger btnRemove">Scarta</button>
    </div>
    </div>
    </div>`;
        document.getElementById("books").appendChild(newCol);

        const btnRemove = newCol.querySelector(".btnRemove");
        btnRemove.addEventListener("click", () => {
          newCol.remove();
        });
      });
    })

    .catch((err) => {
      console.log("Error", err);
      alert("Error", err);
    });
};

libraryB();
