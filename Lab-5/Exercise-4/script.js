let timeoutID = 0
let inventoryData = []

const showStatus = (msg, status) => {
    const div = document.querySelector("#status-message")
    div.textContent = msg
    div.style.color = (status === 200 || status === 201) ? "green" : "red"
    div.classList.remove("display-none")

    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => { div.classList.add('display-none') }, 3000)
}

const updateUI = (dataToRender) => {
    document.querySelector('#display').classList.remove('display-none')
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = "" 

    let totalValue = 0

    for (const item of dataToRender) {
        const id = item.id
        const price = parseFloat(item.price)
        const stock = parseInt(item.stock)
        
        totalValue += (price * stock)

        const rowClass = stock < 5 ? 'low-stock' : ''

        const tr = document.createElement("tr")
        tr.id = `_${id}` 
        if (rowClass) tr.classList.add(rowClass)
        
        tr.innerHTML = `
            <td>${id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>Rs. ${price.toFixed(2)}</td>
            <td class="${rowClass}">${stock} ${stock < 5 ? '(Low)' : ''}</td>
            <td>
                <button onclick='updateRecord("_${id}")'>Edit</button>
                <button onclick='deleteRecord("_${id}")'>Delete</button>
            </td>
        `
        tbody.appendChild(tr)
    }

    document.querySelector("#total-value").textContent = totalValue.toFixed(2)
}

const load = async () => {
    try {
        const response = await fetch('data.json')
        if (!response.ok) {
            showStatus(`Error: File not found (${response.status})`, 404)
            return
        }
        inventoryData = await response.json()
        updateUI(inventoryData)
        showStatus("Inventory Loaded", 200)
    } catch (error) {
        showStatus("Error parsing JSON data.", 500)
    }
}

document.querySelector('#submit').addEventListener('click', (evt) => {
    evt.preventDefault()
    
    const newItem = {
        id: document.querySelector('#id').value.trim(),
        name: document.querySelector('#name').value.trim(),
        category: document.querySelector('#category').value.trim(),
        price: document.querySelector('#price').value,
        stock: document.querySelector('#stock').value
    }

    if (!newItem.id || !newItem.name || !newItem.category || !newItem.price || !newItem.stock) {
        showStatus("All fields are required", 400)
        return
    }

    if (inventoryData.find(item => item.id == newItem.id)) {
        showStatus("Product ID already exists!", 400)
        return
    }

    if (price < 0) {
        showStatus("Price must be positive number", 400)
        return
    }

    if (stock < 0) {
        showStatus("Stock must be positive", 400)
        return
    }


    inventoryData.push(newItem)
    updateUI(inventoryData)
    document.querySelector('#inventory-form').reset()
    showStatus('Product Added Successfully', 201)
})

updateRecord = (prefixedId) => {
    const actualId = prefixedId.substring(1) 
    const itemIndex = inventoryData.findIndex(item => item.id == actualId)
    if (itemIndex === -1) return

    const newPrice = prompt('Enter new price: ', inventoryData[itemIndex].price)
    if (newPrice === null || newPrice.trim() === "" || isNaN(newPrice) || Number(newPrice) < 0) {
        showStatus('Invalid price entered', 400)
        return
    }

    const newStock = prompt('Enter new quantity: ', inventoryData[itemIndex].stock)
    if (newStock === null || newStock.trim() === "" || isNaN(newStock) || Number(newStock) < 0) {
        showStatus('Invalid stock entered', 400)
        return
    }

    inventoryData[itemIndex].price = newPrice
    inventoryData[itemIndex].stock = newStock
    
    updateUI(inventoryData)
    showStatus('Product Updated', 200)
}

deleteRecord = (prefixedId) => {
    if(!confirm("Delete this product?")) return
    
    const actualId = prefixedId.substring(1)
    inventoryData = inventoryData.filter(item => item.id != actualId)
    updateUI(inventoryData)
    showStatus('Product Deleted', 200)
}

document.querySelector('#search-input').addEventListener('input', (evt) => {
    const query = evt.target.value.toLowerCase().trim()
    
    if (query === "") {
        updateUI(inventoryData)
        return
    }

    const filteredData = inventoryData.filter(item => 
        item.category.toLowerCase().includes(query)
    )
    
    updateUI(filteredData)
    
    if (filteredData.length === 0) {
        document.querySelector("tbody").innerHTML = `
            <tr>
                <td colspan="6" style="color: red; font-weight: bold;">
                    No products found in category: "${query}"
                </td>
            </tr>
        `
    }
})

document.querySelector('#clear-btn').addEventListener('click', () => {
    document.querySelector('#search-input').value = ""
    updateUI(inventoryData) 
})

load()