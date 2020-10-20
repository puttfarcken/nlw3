const map = L.map("mapid").setView([-27.2196931, -49.6481104], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;
//create and ad marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

document.querySelector('[name=lat]').value = lat;
document.querySelector('[name=lng]').value = lng;

//remove icon
marker && map.removeLayer(marker)

//add icon layer
    marker = L.marker([lat,lng], {icon})
    .addTo(map)
})

//add campo fotos
function addPhotoField() {
    //pegar o container de fotos #images
    const container = document.querySelector('#images')
    //pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    //verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]
    if(input.value == "") {
        return
    }
    //limpar o campo antes de adicionar ao container de imagens
    input.value = ""
    //adicionar o clone ao container de imagens
    container.appendChild(newFieldContainer)
}

function deleteField (event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2) {
        //limpar o campo
        span.parentNode.children[0].value = ""
        return
    }
    //deletar campo
    span.parentNode.remove();
}

//seleção sim e não
function toggleSelect(event) {
    //retirar a class.active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach(function(button){
        button.classList.remove('active')
    })
    //colocar a class .active nesse botao clicado
    const button = event.currentTarget
    button.classList.add('active')
    //atualzar o input hidden com valor selecionado
    const input = document.querySelector('[open_on_weekends]')
    //verificar se sim ou não
    input.value = button.dataset.value
}