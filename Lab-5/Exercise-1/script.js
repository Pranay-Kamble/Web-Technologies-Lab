let timeOutId = 0;

showStatus = (msg, status) => {
    const element = document.querySelector("#status-message")
    element.classList.remove('display-none')
    element.textContent = `${status}: ${msg}`
    element.style.color = (status === 200) ? "green" : "red"

    if (timeOutId) clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
        element.classList.add('display-none')
    }, 2000)
}


updateNode = (id) => {
    const tr = document.querySelector(`#${id}`)
    const td = tr.getElementsByTagName('td')

    const salary = prompt('Enter new salary: '),
          dept = prompt('Enter new department: ')

    if (isNaN(Number(salary))) {
        showStatus('Please enter numeric values for salary', 400);
        return
    }

    if (Number(salary) <= 0) {
        showStatus('Please enter positive value for salary', 400);
        return
    }

    td[2].textContent = dept
    td[3].textContent = salary
}

deleteNode = (id) => {
    const tr = document.querySelector(`#${id}`)
    tr.remove()

    showStatus('Delete Successful', 200)
}


updateUI = (data) => {
    const display = document.querySelector('#display')
    display.classList.remove('display-none')
    const employees = data.getElementsByTagName('employee')
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ""

    for (let i=0; i<employees.length; ++i) {
        const id = employees[i].getElementsByTagName('id')[0].textContent,
              name = employees[i].getElementsByTagName('name')[0].textContent,
              dept = employees[i].getElementsByTagName('department')[0].textContent,
              salary = employees[i].getElementsByTagName('salary')[0].textContent

        const tr = document.createElement('tr')
        tr.id = `_${id}`
        tr.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${dept}</td>
            <td>${salary}</td>
            <td> <button onclick="updateNode('_${id}')">Update</button>
            <button onclick="deleteNode('_${id}')">Delete</button></td>
        `

        tbody.appendChild(tr)
    }
}


load = () => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET','data.xml', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = xhr.responseXML
            if (data.length === 0) {
                    showStatus("XML is empty. No records found.", 404);
                    return;
                }
            updateUI(data)
            showStatus("Fetch Successful",200);
        }else if (xhr.readyState === 4){
            showStatus(xhr.statusText, xhr.status)
        }
    }

    xhr.send()
}

document.querySelector('#submit').addEventListener('click', (evt) => {
    evt.preventDefault()
    document.querySelector('#display').classList.remove('display-none')
    const id = document.querySelector('#id').value,
          name = document.querySelector('#name').value,
          dept = document.querySelector('#dept').value,
          salary = document.querySelector('#salary').value

    if (id.trim() === '' || name.trim() === '' || dept.trim() === '') {
        showStatus("All fields are required", 400)
        return
    }

    if (salary <= 0) {
        showStatus("Please enter positive value for salary", 400)
        return
    }

    const tbody = document.querySelector('tbody'),
          tr = document.createElement('tr')
    
    tr.id = `_${id}`
    tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${dept}</td>
        <td>${salary}</td>
        <td> 
            <button onclick="updateNode('_${id}')">Update</button>
            <button onclick="deleteNode('_${id}')">Delete</button>
        </td>
    `
    tbody.appendChild(tr)
    showStatus('Create Successfull', 200);
})


document.querySelector('#view').addEventListener('click', (evt) => {
    load()
})