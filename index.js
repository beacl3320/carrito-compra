/* CAPTURAMOS LA API */

const cards = document.getElementById('cards');
const item = document.getElementById('tems');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
} );


const fetchData = async () => {
    try{
        const res = await fetch('api.json');
        const data = await res.json();
        /* console.log(data); */
        pintarCard(data)
    }catch(error){
        console.log(error)
    }
}

const pintarCard = data => {
    /* console.log(data); */
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.url)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

/* ------- */

/*AÑADIR AL CARRITO */

let carrito = {}

cards.addEventListener('click', e => {
    addCarrito(e)
})

const addCarrito = e => {
    /* console.log(e.target)
    console.log(e.target.classList.contains('btn-dark')) */
    if(e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

/* ---------- */

/* CAPTURAMOS LOS ELEMENTOS DEL CARRITO */

const setCarrito = objeto => {
    /* console.log(objeto) */
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()

    /* console.log(carrito) */
}

/* PINTAMOS EL CARRITO */

const pintarCarrito = () => {
    console.log(carrito);

    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].texcontent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}