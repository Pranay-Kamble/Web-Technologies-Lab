let timeOutId = 0
let XML = null

const showStatus = (msg, status) => {
    const element = document.querySelector("#status-message")
    element.classList.remove('display-none')
    element.textContent = `${status}: ${msg}`
    element.style.color = (status === 200 || status === 201) ? "green" : "red"

    if (timeOutId) clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
        element.classList.add('display-none')
    }, 3000)
}

const updateUI = () => {
    if (!XML) return
  
    const books = XML.getElementsByTagName('book')
    const display = document.querySelector('#display')
    display.classList.remove('display-none')
    
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ""

    for (let i=0; i<books.length; i++) {
        const id = books[i].getElementsByTagName('id')[0].textContent
        const title = books[i].getElementsByTagName('title')[0].textContent
        const author = books[i].getElementsByTagName('author')[0].textContent
        const status = books[i].getElementsByTagName('status')[0].textContent

        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td style="color: ${status === 'Available' ? 'green' : 'red'} font-weight: bold">${status}</td>
            <td> 
                <button onclick="updateNode('${id}')">Update</button>
                <button onclick="deleteNode('${id}')">Delete</button>
            </td>
        `
        tbody.appendChild(tr)
    }
}

const load = () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'data.xml', true)
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                XML = xhr.responseXML
            
                if (XML.getElementsByTagName('book').length === 0) {
                    showStatus("XML empty. No records found.", 404)
                    return;
                }
                
                updateUI()
                showStatus("Fetch Successful", 200)
            } else {
                showStatus(xhr.statusText || "File not found", xhr.status)
            }
        }
    }
    xhr.send()
}

document.querySelector('#submit').addEventListener('click', (evt) => {
    evt.preventDefault()
    
    if (!XML) {
        showStatus("Please load XML data first.", 400)
        return
    }

    const id = document.querySelector('#id').value
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const status = document.querySelector('#status').value
    if (id.trim() === '' || title.trim() === '' || author.trim() === '') {
        showStatus("All text fields are required", 400)
        return
    }

    const existingBooks = XML.getElementsByTagName('id')
    for (let i=0; i<existingBooks.length; i++) {
        if (existingBooks[i].textContent === id) {
            showStatus("Book ID already exists", 400)
            return
        }
    }

    const newBook = XML.createElement("book")
    const idNode = XML.createElement("id")
    const titleNode = XML.createElement("title")
    const authorNode = XML.createElement("author")
    const statusNode = XML.createElement("status")

    idNode.textContent = id
    titleNode.textContent = title
    authorNode.textContent = author
    statusNode.textContent = status

    newBook.appendChild(idNode)
    newBook.appendChild(titleNode)
    newBook.appendChild(authorNode)
    newBook.appendChild(statusNode)
    XML.documentElement.appendChild(newBook)

    updateUI()
    document.querySelector('#book-form').reset()
    showStatus('Book Added Successfully', 201)
})

updateNode = (searchId) => {
    const books = XML.getElementsByTagName('book')
    
    for (let i=0; i<books.length; i++) {
        const idNode = books[i].getElementsByTagName('id')[0]
        
        if (idNode.textContent === searchId) {
            const statusNode = books[i].getElementsByTagName('status')[0]
            const currentStatus = statusNode.textContent
            const newStatus = currentStatus === "Available" ? "Borrowed" : "Available"
            
            if (confirm(`Change status of Book ${searchId} to ${newStatus}?`)) {
                statusNode.textContent = newStatus
                updateUI() 
                showStatus('Status Updated', 200)
            }
            return
        }
    }
}

deleteNode = (searchId) => {
    const books = XML.getElementsByTagName('book')
    
    for (let i=0; i<books.length; i++) {
        const idNode = books[i].getElementsByTagName('id')[0]
        
        if (idNode.textContent === searchId) {
            if (confirm(`Delete book ${searchId}?`)) {
                const bookNode = books[i]
                bookNode.parentNode.removeChild(bookNode) 
                
                updateUI()
                showStatus('Book Deleted', 200)
            }
            return
        }
    }
}

document.querySelector('#view').addEventListener('click', (evt) => {
    evt.preventDefault()
    load()
})

load()