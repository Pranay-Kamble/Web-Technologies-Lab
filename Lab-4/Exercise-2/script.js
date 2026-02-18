const updateUI = (data, inputValue) => {
  const displayData = document.querySelector("#display-data"),
    table = document.querySelector("#table-data"),
    messageData = document.querySelector("#message-data");

  if (inputValue.trim() === "") {
    displayData.style.display = "none";
    return;
  }

  const matchingData = data.filter((product) => {
    return String(product["name"])
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  });

  displayData.style.display = "block";

  if (matchingData.length === 0) {
    messageData.style.display = "block";
    table.style.display = "none";
  } else {
    messageData.style.display = "none";
    table.style.display = "block";

    const tableBody = table.querySelector("#table-body");
    tableBody.innerHTML = "";

    for (let element of matchingData) {
      const child = document.createElement("tr");
      child.innerHTML = `
                <td>${element["id"]}</td>
                <td>${element["name"]}</td>
                <td>${element["price"]}</td>
                <td>${element["category"]}</td>
            `;
      tableBody.appendChild(child);
    }
  }
};


let debounceTimer;

document.querySelector("#search").addEventListener("keyup", (evt) => {
  const inputValue = evt.target.value;
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (inputValue.trim() === "") {
      updateUI([], inputValue);
      return;
    }

    const request = new XMLHttpRequest();
    request.open("GET", "data.json", true);

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          try {
            const data = JSON.parse(request.responseText);
            updateUI(data, inputValue);
          } catch (e) {
            console.error("Error parsing JSON string.");
          }
        } else {
          console.error(
            "Failed to fetch search data. HTTP Status:",
            request.status,
          );
          document.querySelector("#message-data").innerHTML =
            "<h4>Error connecting to server.</h4>";
          document.querySelector("#message-data").style.display = "block";
          document.querySelector("#table-data").style.display = "none";
        }
      }
    };

    request.onerror = function () {
      console.error("Network error occurred during search.");
    };

    request.send();
  }, 400); 
});

const start = function () {
  const request = new XMLHttpRequest();
  request.open("GET", "data.json", true);

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.responseText);
      const allData = document.querySelector("#all-data");

      allData.innerHTML = `
                <h3>All Products: </h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>`;

      const tBody = allData.querySelector("tbody");
      for (let element of data) {
        const child = document.createElement("tr");
        child.innerHTML = `
                    <td>${element["id"]}</td>
                    <td>${element["name"]}</td>
                    <td>${element["price"]}</td>
                    <td>${element["category"]}</td>
                `;
        tBody.appendChild(child);
      }
    }
  };

  request.send();
};

start();
