let users = JSON.parse(localStorage.getItem('users')) || []

const updateLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users))
}

const renderTable = () => {
    const tbody = document.querySelector('#users-table tbody')
    tbody.innerHTML = ''

    users.forEach((user, index) => {
        const row = document.createElement('tr')
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>
                <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
            </td>
        `
        tbody.appendChild(row)
    })
}

const isUniqueEmail = (email) => {
    return !users.some(user => user.email === email)
}

const deleteUser = (index) => {
    users.splice(index, 1)
    
    updateLocalStorage()
    renderTable()
}

const clearAllUsers = () => {
    if(confirm("Are you sure you want to delete all users?")) {
        users = []
        localStorage.removeItem('users')
        renderTable()
    }
}

document.querySelector('#registration-form').addEventListener('submit', function(ev) {
    ev.preventDefault()
    const formData = new FormData(ev.target)
    const email = formData.get('email')

    if (!isUniqueEmail(email)) {
        alert('This email is already registered!')
        document.querySelector('#email').value = ''
        return
    }

    const newUser = {
        name: formData.get('name'),
        email: email,
        mobile: formData.get('mobile'),
        password: formData.get('password')
    }

    users.push(newUser)
    updateLocalStorage()
    renderTable()
    ev.target.reset()
})

renderTable()