const searchBehavior = {
    addOnChangeListener(){
        let input = document.querySelector('.countries__input')
        input.addEventListener('input',()=>{
            this.search(input)
        } )
    },

    search(input){
        let value = input.value.toLowerCase()
        let list = document.querySelectorAll('.countries__list li')
        let regex = new RegExp(`${value}`);
        
        list.forEach(element => {
            let countryInListName = element.childNodes[0].childNodes[2].innerHTML
            if (regex.test(countryInListName.toLowerCase())){
                element.classList.remove('hide')
            } else {
                element.classList.add('hide')
            }
        });
    }
}

export default searchBehavior;