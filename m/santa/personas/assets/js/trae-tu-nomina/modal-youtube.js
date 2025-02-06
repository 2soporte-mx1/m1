// Añadir un objeto de atributos a un elemento
const agregarAtributos = (elemento, attrObj) => {
    for (let attr in attrObj) {
        if (attrObj.hasOwnProperty(attr)) elemento.setAttribute(attr, attrObj[attr])
    }
};

// Crear elementos con atributos e hijo
const crearElementoPersonalizado = (element, attributes, children) => {
    let customElement = document.createElement(element);
    if (children !== undefined) children.forEach(el => {
        if (el.nodeType) {
            if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
        } else {
            customElement.innerHTML += el;
        }
    });
    agregarAtributos(customElement, attributes);
    return customElement;
};

// Crear modal
const imprimirModal = (content) => {

    // Contenedor interno
    const modalContentEl = crearElementoPersonalizado('div', {
        id: 'modal-content',
        class: 'modal-content'
    }, [content]);

    // Contenedor principal
    const modalContainerEl = crearElementoPersonalizado('div', {
        id: 'modal-container',
        class: 'modal-container'
    }, [modalContentEl]);

    // Imprimir modal en el html
    document.body.appendChild(modalContainerEl)

    // Ocultar modal
    const removeModal = () =>
        document.body.removeChild(modalContainerEl);

    modalContainerEl.addEventListener('click', e => {
        if (e.target === modalContainerEl) removeModal()
    })
}

const getYoutTubeVideoCode = url => {
    let inicio = url.indexOf('?') + 3,
        final = url.indexOf('&', inicio),
        code = final === -1 ? url.slice(inicio) : url.slice(inicio, final),
        params = url.slice(final + 1);
    return final === -1 ? `${code}?` : `${code}?${params}&`;
};

const createYouTubeModalContent = youTubeVideoCode =>
    `<div class="video">
    <iframe src="https://www.youtube.com/embed/${youTubeVideoCode}autoplay=1" frameborder="0" allowfullscreen></iframe>
</div>`;

// Eventos para abrir los modales en todos los links
const openYouTubeModal = selector => {

    let linksElements = [...document.querySelectorAll(selector)],
        links = linksElements.map(link => link.href);
    linksElements.forEach((el, i) => {
        el.addEventListener('click', e => {
            e.preventDefault();
            imprimirModal(createYouTubeModalContent(getYoutTubeVideoCode(links[i])));
        })
    })

};


openYouTubeModal('.modal-youtube')