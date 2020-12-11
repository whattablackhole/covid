import { sortData, valuesOfSortDirection } from './sort.data.js';
import countriesList from './countries-list.create.js';
import sortBehavior from './sort.behavior.js';
const sort = {
    create(){
        let sortByButton = document.querySelector('.countries__sort-method')
        let sortDirectionButton = document.querySelector('.countries__sort-type')

        this.updateSortByButtonName()
        this.updateSortDirectionButtonIcon()        
        this.addClickListener(sortByButton,sortDirectionButton)

            sortBehavior.sort()

        
    },
    addClickListener(sortByButton, sortDirectionButton){
        sortByButton.addEventListener('click', ()=>{
            this.changeSortBy();
            sortBehavior.sort()
        })
        sortDirectionButton.addEventListener('click', ()=>{
            
            this.changeSortDirection()
            sortBehavior.sort()
        })
    },
    changeSortBy(){
        switch(sortData.sortBy){
            case('cases'):
            sortData.sortBy = 'deaths'
            break;
            case('deaths'):
            sortData.sortBy = 'recovered'
            break;
            case('recovered'):
            sortData.sortBy = 'cases'
            break;
        }
        this.updateSortByButtonName()
        countriesList.changeValues();
    },
    changeSortDirection(){
        switch(sortData.sortDirection){
            case('down'):
            sortData.sortDirection = 'up'
            break;
            case('up'):
            sortData.sortDirection = 'down'
            break;
        }
        this.updateSortDirectionButtonIcon()
    },

    updateSortByButtonName(){
        let sortByButton = document.querySelector('.countries__sort-method')
        sortByButton.innerHTML = sortData.sortBy;
    },
    updateSortDirectionButtonIcon(){
        let sortDirectionButton = document.querySelector('.material-icons')
        sortDirectionButton.innerHTML = valuesOfSortDirection[sortData.sortDirection]
    }
}

export default sort;