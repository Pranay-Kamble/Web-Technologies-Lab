const API_BASE = "http://localhost:3001";
let currentPage = 1;

const updateTable = (books) => {
    const tbody = document.getElementById("book-data");
    tbody.innerHTML = "";
    books.forEach((b) => {
        tbody.innerHTML += `
                    <tr>
                        <td>${b.title}</td><td>${b.author}</td>
                        <td>${b.category}</td><td>$${b.price}</td><td> ${b.rating}</td>
                    </tr>
                `;
    });
};

const fetchBooks = async (endpoint) => {
    const res = await fetch(API_BASE + endpoint);
    const data = await res.json();
    updateTable(data);
};

const changePage = (dir) => {
    currentPage += dir;
    if (currentPage < 1) currentPage = 1;
    document.getElementById("page-num").innerText = "Page " + currentPage;
    fetchBooks(`/books?page=${currentPage}`);
};

fetchBooks(`/books?page=${currentPage}`);
