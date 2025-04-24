const listContainer = document.querySelector('.list-container')
const list = document.querySelector('.list')

const createListCard = (item) => {
    const card = document.createElement('li')
    card.classList.add('list-item')

    const info = document.createElement('div')
    info.classList.add('info')
    const name = document.createElement('span')
    name.textContent = `Name: ${item.textContent}`
    const owner = document.createElement('span')
    owner.textContent = `Owner: ${item.dataset.owner}`
    const stars = document.createElement('span')
    stars.textContent = `Stars: ${item.dataset.stars}`
    info.append(name, owner, stars)

    const closeBtn = document.createElement('div')
    closeBtn.classList.add('close-button')
    closeBtn.dataset.type = 'button'

    card.append(info, closeBtn)
    
    return card
}


listContainer.addEventListener('click', (evt) => {
    const target = evt.target
    if (target.dataset.type === 'button') {
        target.closest('li').remove()
    }
})

resultsContainer.addEventListener('click', evt => {
    const card = createListCard(evt.target)
    list.append(card)
    input.value = ''
    resultsContainer.innerHTML = ""
})