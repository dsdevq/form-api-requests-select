const form = document.querySelector('.form');
const url = `http://localhost:3000/profile`
const database = document.querySelector('.database')

const selector = document.querySelector('.selector');
let selectors = Array.from(selector)
let data = []


selector.addEventListener('change', function() {
    selectors.map(e => {
        selector.classList.length == 2 && e.selected ? selector.classList.replace(`${selector.classList[1]}`, `${e.value}`) : e.selected && selector.classList.length == 1 ? selector.classList.add(`${e.value}`) : null
        // if(selector.classList.length == 2 && e.selected) {
        //     selector.classList.replace(`${selector.classList[1]}`, `${e.value}`)
        // } else if (e.selected && selector.classList.length == 1) {
        //     selector.classList.add(`${e.value}`)
        // }
    })
})


async function getValues (url) {
    let values = await fetch(url)
    let response = await values.json()
    response.map(obj => {
        data.push(obj)
    })
    if (data.length) {
        materializeData(data)
    } else database.textContent = 'No data found...'
}

function materializeData(array) {
    array.map(obj => {
        if (database.children.namedItem(`${obj.id}`) == null) {
            let localDiv = document.createElement('div')
            let localChild = document.createElement('div')
            let localButton = document.createElement('button')
            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className = 'checkbox'
            checkbox.checked = obj.checked
            checkbox.addEventListener('click', (event) => {
                fetch(`http://localhost:3000/profile/${event.path[1].id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                      },
                    body: JSON.stringify({
                        checked: event.target.checked
                    })
                })
            })
            localButton.textContent = 'x'
            localButton.addEventListener('click',(event) => {
                fetch(`http://localhost:3000/profile/${event.path[1].id}`, {
                    method: 'DELETE'
                })
            })
            localDiv.className = 'item'
            localDiv.id = `${obj.id}`
            localChild.textContent = `Id: ${obj.id} \n Login: ${obj.login}, Password: ${obj.password}`
            localDiv.append(checkbox)
            localDiv.appendChild(localChild)
            localDiv.appendChild(localButton)
            database.appendChild(localDiv)
        } 
    })
}

getValues(url)


