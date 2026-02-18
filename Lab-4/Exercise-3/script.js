let data = []

const showMessage = (msg, statusCode = null, isError = false) => {
    const msgDiv = document.querySelector("#message")
    msgDiv.style.color = isError ? "red" : "green"
    msgDiv.innerText = statusCode ? `${msg} (HTTP Status: ${statusCode})` : msg
    
    setTimeout(() => { msgDiv.innerText = "" }, 3000)
}

const updateUI = () => {
    const displayData = document.querySelector("#display-data")
    const tBody = document.querySelector("#table-body")
    
    if (data.length === 0) {
        displayData.style.display = 'none'
        return
    }

    displayData.style.display = 'block'
    tBody.innerHTML = "" 

    for (let element of data) {
        const child = document.createElement('tr')
        child.innerHTML = `
            <td>${element["id"]}</td>
            <td>${element["name"]}</td>
            <td>${element["dept"]}</td>
            <td>${element["marks"]}</td>
            <td>
                <button onclick="updateRecord('${element["id"]}')">Edit</button>
                <button onclick="deleteRecord('${element["id"]}')">Delete</button>
            </td>
        `
        tBody.appendChild(child)
    }
}

const loadData = () => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "data.json", true)
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                data = JSON.parse(xhr.responseText)
                updateUI()
                showMessage("Data loaded successfully!", 200)
            } else if (xhr.status === 404) {
                showMessage("File not found.", 404, true)
            } else {
                showMessage("Server error.", 500, true)
            }
        }
    }
    xhr.send()
}

document.querySelector('#create-btn').addEventListener('click', (evt) => {
    evt.preventDefault()
    const formData = {}
    const allInputs = document.querySelectorAll('input')
    for (let inputElement of allInputs) {
        if(inputElement.value.trim() === "") return
        formData[inputElement.id] = inputElement.value
    }

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "dummyData.json", true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            
            data.push(formData)
            updateUI()

            showMessage("Student created successfully!", 201)
            document.querySelector('#student-form').reset()
        }
    }
    
    xhr.send(JSON.stringify(formData))
})

window.updateRecord = (id) => {
    const student = data.find(s => s.id === id)
    if (!student) return

    const newMarks = prompt(`Enter new marks for ${student.name}:`, student.marks)
    if (newMarks === null || newMarks.trim() === "") return

    const xhr = new XMLHttpRequest()
    xhr.open("PUT", `dummData.json?id=${id}`, true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            student.marks = newMarks
            updateUI()
            showMessage("Student updated successfully!", 200)
        }
    }
    
    xhr.send(JSON.stringify({ marks: newMarks }))
}

window.deleteRecord = (id) => {
    if (!confirm("Delete this student record?")) return

    const xhr = new XMLHttpRequest()
    xhr.open("DELETE", `dummyData.json?id=${id}`, true)

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            data = data.filter(student => student.id !== id)
            updateUI()
            showMessage("Student deleted successfully!", 200)
        }
    }
    
    xhr.send()
}
loadData()