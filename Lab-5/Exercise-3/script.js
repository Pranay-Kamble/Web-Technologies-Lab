let timeoutID = 0

const showStatus = (msg, status) => {
    const div = document.querySelector("#status-message")

    div.textContent = `${status}: ${msg}`
    div.style.color = (status === 200 || status === 201) ? "green" : "red"
    div.classList.remove("display-none")

    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
        div.classList.add('display-none')
    }, 3000)
}

deleteRecord = (id) => {
    const record = document.querySelector(`#${id}`)
    record.remove()
    showStatus('Delete Successful', 200)
}

updateRecord = (id) => {
    const tr = document.querySelector(`#${id}`)
    const td = tr.getElementsByTagName('td')

    const course = prompt('Enter new course: ', td[2].textContent)
    if (course === null || course.trim() === "") return

    const marks = prompt('Enter new marks: ', td[3].textContent)

    if (isNaN(Number(marks))) {
        showStatus('Please enter numeric values for marks', 400)
        return
    }

    if (Number(marks) < 0 || Number(marks) > 100 || marks.trim() === "") {
        showStatus('Please enter valid positive marks (0-100)', 400)
        return
    }

    td[2].textContent = course
    td[3].textContent = marks
    showStatus('Update Successful', 200)
}

const updateUI = (data) => {
    if (!data || data.length === 0) {
        showStatus("File is empty.", 400)
        return
    }

    document.querySelector('#display').classList.remove('display-none')

    const tbody = document.querySelector("tbody")
    tbody.innerHTML = "" 

    for (const record of data) {
        const id = record['id'] 
        
        const tr = document.createElement("tr")
        tr.id = `_${id}`
        tr.innerHTML = `
            <td>${id}</td>
            <td>${record['name']}</td>
            <td>${record['course']}</td>
            <td>${record['marks']}</td>
            <td>
                <button onclick='updateRecord("_${id}")'>Update</button>
                <button onclick='deleteRecord("_${id}")'>Delete</button>
            </td>
        `
        tbody.appendChild(tr) 
    }
}

const load = async () => {
    try {
        const response = await fetch('data.json')
        
        if (!response.ok) {
            showStatus(`Error: File not found (${response.status})`, 404)
            return
        }

        const data = await response.json()
        
        updateUI(data)
        showStatus("Fetch Successful", 200)
        
    } catch (error) {
        showStatus("Error parsing JSON data.", 500)
        console.error(error)
    }
}

document.querySelector('#submit').addEventListener('click', (evt) => {
    evt.preventDefault()
    document.querySelector('#display').classList.remove('display-none')
    
    const id = document.querySelector('#id').value
    const name = document.querySelector('#name').value
    const course = document.querySelector('#course').value
    const marks = document.querySelector('#marks').value

    if (id.trim() === '' || name.trim() === '' || course.trim() === '') {
        showStatus("All text fields are required", 400)
        return
    }

    if (marks < 0 || marks > 100 || marks === "") {
        showStatus("Please enter valid marks (0-100)", 400)
        return
    }

    if (document.querySelector(`#_${id}`)) {
        showStatus("Student ID already exists in the table", 400)
        return
    }

    const tbody = document.querySelector('tbody')
    const tr = document.createElement('tr')
    
    tr.id = `_${id}`
    tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${course}</td>
        <td>${marks}</td>
        <td> 
            <button onclick='updateRecord("_${id}")'>Update</button>
            <button onclick='deleteRecord("_${id}")'>Delete</button>
        </td>
    `
    tbody.appendChild(tr)
    
    document.querySelector('#student-form').reset()
    showStatus('Create Successful', 201)
})


document.querySelector('#view').addEventListener('click', (evt) => {
    evt.preventDefault()
    load()
})

load()