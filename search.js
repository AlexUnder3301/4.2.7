const input = document.querySelector('.search-bar')
const resultsContainer = document.querySelector('.search-results')


const debounce = (fn, debounceTime) => {
    let timeout;
    return function () {
        const fnCall = () => fn.apply(this, arguments)

        clearTimeout(timeout)

        timeout = setTimeout(fnCall, debounceTime)
    }
};

async function handleinput() {
    if (input.value === '') {
        resultsContainer.innerHTML = ""
        return
    }

    await fetch(`https://api.github.com/search/repositories?q=${input.value}`)
    .then(res => {
        res.json().then(result => {
            const itemsArr = result.items
            const cardsArr = [] 
            const results = resultsContainer.querySelector('.search-result')

            for (let i = 0; i < 5; i++) {
                const card = createSearchCard(itemsArr[i])
                cardsArr.push(card)
            }

            if (results) {
                resultsContainer.innerHTML = ""
            }

            resultsContainer.append(...cardsArr)
        })
    })
}

const devouncedHandleInput = debounce(handleinput, 500)



const createSearchCard = (obj) => {
    const card = document.createElement('div')
    card.classList.add('search-result')
    card.textContent = obj.name
    card.dataset.owner = obj.owner.login
    card.dataset.stars = obj.stargazers_count
    return card
}

input.addEventListener('input', devouncedHandleInput)
