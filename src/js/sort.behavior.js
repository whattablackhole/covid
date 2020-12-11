import { sortData } from './sort.data.js';
const sortBehavior = {
    sort(){
        let toSort = document.querySelectorAll('.countries__list li')
        
        toSort = Array.prototype.slice.call(toSort, 0);

        toSort.sort(function(a, b) {
            let aVal = a.childNodes[0].childNodes[0].innerHTML;
            let bVal = b.childNodes[0].childNodes[0].innerHTML;
            if (sortData.sortDirection == 'up'){
                return aVal - bVal;
            } else {
                return bVal - aVal
            }
        });
        
        let parent = document.querySelector('.countries__list');
        parent.innerHTML = "";
        toSort.forEach(item => {
            parent.append(item)
        });
    }
}

export default sortBehavior;