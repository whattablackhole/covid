import APIBehavior from './API.behavior.js';
import appData from './app.data.js';
import countriesListBehavior from './countries-list.behavior.js'
import{ valuesOfSortBy, sortData } from './sort.data.js';

export const countriesList = {
    create(){
        let countries = appData.countriesAPI;
        let totalData = []
        let ul = document.querySelector('.countries__list')
        countries.forEach(country => {
            totalData = APIBehavior.getTotalCasesDeathsRecovered(country.alpha2Code)
            if (totalData[0] == null) return
            let li = document.createElement('li')
            let countryContainer = document.createElement('button')
            let data = document.createElement('span')
            let flag = document.createElement('span')
            let name = document.createElement('span')

            countryContainer.classList.add('countries__item')
            data.classList.add('countries__data')
            flag.classList.add('countries__flag')
            name.classList.add('countries__country-name')

            data.setAttribute('data-cases',totalData[0])
            data.setAttribute('data-deaths',totalData[1])
            data.setAttribute('data-recovered',totalData[2])
            data.innerHTML = totalData[valuesOfSortBy[sortData.sortBy]]
            
            flag.style.backgroundImage =`url(${country.flag})` 
            name.innerHTML = country.name

            countryContainer.append(data,flag,name)
            this.addClickListener(countryContainer,country.alpha2Code)
            li.append(countryContainer)
            ul.append(li)
        });
    },
    addClickListener(button, countryCode){
        button.addEventListener('click',()=>{
            countriesListBehavior.choseCountry(countryCode)
        })
    },
    changeValues(){
        let list = document.querySelectorAll('.countries__list li')
        let typeOfValues = sortData.sortBy
        list.forEach(element => {
            let spanElement = element.childNodes[0].childNodes[0]
            let value = element.childNodes[0].childNodes[0].dataset[typeOfValues]
            
            spanElement.innerHTML = `${value}`
        })
    }
}

export default countriesList;