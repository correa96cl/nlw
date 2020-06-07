function populateUf() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for(state of states){
                ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`

            }
        })
}

populateUf()


function getCities(event){

    const citiesSelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const indexOfSelectSate = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectSate].text;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citiesSelect.disabled=true


    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for(city of cities){
                citiesSelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`

            }

            citiesSelect.disabled=false
        })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem);


}


const collectedItems =  document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectedItem(event){

    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    console.log('Item id : ', itemId)

    console.log(itemLi.dataset)

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound =  item == itemId
        return itemFound;
    })

    if (alreadySelected >= 0){

        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })
        selectedItems = filteredItems
    }else{
        selectedItems.push(itemId);
    }

    console.log('selectedItems : ', selectedItems)
    collectedItems.value = selectedItems;

}