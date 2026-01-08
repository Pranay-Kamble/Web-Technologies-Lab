let taskIdGenerator = 0

const dragOverHandler = (ev) => {
    ev.preventDefault()
}

const dragStartHandler = (ev) => {
    ev.dataTransfer.setData('text/plain', ev.target.id)
}

const onDropHandler = (ev) => {
    ev.preventDefault()
    const elementId = ev.dataTransfer.getData('text/plain'),
          divElement = document.querySelector(`#${elementId}`)
    ev.target.prepend(divElement)
    console.log(ev.target)
    if (ev.target.getAttribute('id') === 'cheated-here')
        alert(`${divElement.innerText} is completed`)
}

const getNewTaskId = () => {
    const currentValue = taskIdGenerator++;
    return `task-${currentValue}`
}

const createNewTaskElement = (textValue) => {
    const divElement = document.createElement('div')
    
    divElement.innerText = `${textValue} (${(new Date()).toLocaleDateString()})`
    divElement.setAttribute('class', 'task-element')
    divElement.setAttribute('id', getNewTaskId())
    divElement.setAttribute('draggable', 'true')
    divElement.setAttribute('ondragstart','dragStartHandler(event)')

    return divElement
}

const addTask = () => {
    const inputField = document.querySelector('#task-value')
    const textValue = inputField.value
    inputField.value = ''

    const newTaskElement = createNewTaskElement(textValue)

    const todoSectionContent = document.querySelector('#todo > .section-content')
    todoSectionContent.prepend(newTaskElement)
}