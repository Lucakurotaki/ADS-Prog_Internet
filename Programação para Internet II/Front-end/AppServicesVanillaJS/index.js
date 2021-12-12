const criarServiceElement = (element) => {
    const template = document.getElementById('service-view-template');

    const serviceElement = document.importNode(template.content, true);

    const itens_service = serviceElement.querySelectorAll('span');

    itens_service[0].innerText = element.id;
    itens_service[1].innerText = element.titulo;
    itens_service[2].innerText = element.situacao;

    const link = criarLinkOpenService(element);

    const btn = serviceElement.getElementById('btnOpenService');

    btn.setAttribute('onclick', link);

    return serviceElement;
}

const carregarServices = async () => {
    const response = await fetch('http://localhost:3000/services');
    const dados = await response.json();

    dados.forEach(element => {
        const containerServicesElement = document.getElementById('container-services');

        const serviceElement = criarServiceElement(element);

        containerServicesElement.append(serviceElement);

    });
}

const criarLinkOpenService = (element) =>{

    const id = 'service.html'+ '?id=' + element.id + '"';

    const link = 'location.href=" ' + id; 
    
    return link;
    
}

window.onload = () =>{
    carregarServices();

}