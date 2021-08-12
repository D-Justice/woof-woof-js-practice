document.addEventListener('DOMContentLoaded', () => {

    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info')
    const filterDogs = document.getElementById('good-dog-filter')
    let filterON = false

    const fetchDogs = (filter) =>{
        fetch('http://localhost:3000/pups')
            .then(response => response.json())
            .then(data => renderDogs(data, filter))
    }

    const renderDogs = (data, filter = false) => {

        for (let i in data){
            const dog = data[i];
            let span = document.createElement('span')

            span.innerHTML = dog.name
            if (!filter) {
                dogBar.appendChild(span)

                span.addEventListener('click', (e) =>{
                    dogInfo.innerHTML = ''
                    moreInfo(dog)
                })
            } else if (filter && dog.isGoodDog === true){
                dogBar.appendChild(span)

                span.addEventListener('click', (e) =>{
                    dogInfo.innerHTML = ''
                    moreInfo(dog)
                })
            }
            
        }
        
    }

    const moreInfo = (dog) => {
        let nameContainer = document.createElement('h2')
        let isGoodDogButton = document.createElement('button')
        let doggoImg = document.createElement('img')

        nameContainer.innerHTML = `Name: ${dog.name}`;
        isGoodDogButton.innerHTML = (dog.isGoodDog) ? `Good Dog!` : `Bad Dog!`
        doggoImg.src = dog.image

        doggoImg.style.marginTop = '20px'
        
        dogInfo.appendChild(doggoImg)
        dogInfo.appendChild(nameContainer)
        dogInfo.appendChild(isGoodDogButton)
        
        isGoodDogButton.addEventListener('click', () => {
            changeStatus(dog, isGoodDogButton)
        })
        
    }

    const changeStatus = (dog, isGoodDogButton) => {
        
        
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json' 
            },
            body: JSON.stringify({
                isGoodDog: !dog.isGoodDog
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        dog.isGoodDog = !dog.isGoodDog
        isGoodDogButton.innerHTML = (dog.isGoodDog) ? `Good Dog!` : `Bad Dog!`
        dogBar.innerHTML = ''
        fetchDogs()
        
    }



fetchDogs()
filterDogs.addEventListener('click', () => {
    dogBar.innerHTML = ''
    filterON = !filterON;
    (filterON) ? filterDogs.innerHTML = 'Filter good dogs: ON' : filterDogs.innerHTML = 'Filter good dogs: OFF'
    console.log(filterON)
    fetchDogs(filterON)
})
})



// id: 2
// image: "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_2.jpg"
// isGoodDog: false
