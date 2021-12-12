const criarServiceElement = (element) => {
    const template = document.getElementById('service-template');

    const serviceElement = document.importNode(template.content, true);

    const itens_service = serviceElement.querySelectorAll('span');

    const dtcadastro = converterData(element.dtcadastro);
    const dtlimite = converterData(element.dtlimite);

    carregarTitulo(element);

    itens_service[0].innerText = element.id;
    itens_service[1].innerText = element.titulo;
    itens_service[2].innerText = element.situacao;
    itens_service[3].innerText = dtcadastro;
    itens_service[4].innerText = dtlimite
    itens_service[5].innerText = element.orcamento;
    itens_service[6].innerText = element.descricao;

    const link = criarLinkUpdateService(element);

    const btn = serviceElement.getElementById('btnUpdateService');

    btn.setAttribute('onclick', link);

    return serviceElement;
}

const carregarServices = async (id) => {
    const response = await fetch(`http://localhost:3000/services/${id}`);
    const dados = await response.json();

    const containerServicesElement = document.getElementById('container-service');

    const serviceElement = criarServiceElement(dados);

    containerServicesElement.append(serviceElement);
}











const criarLinkUpdateService = (element) =>{

    const id = 'updateservice.html'+ '?id=' + element.id + '"';

    const link = 'location.href=" ' + id; 
    
    return link;
    
}

const carregarId = () => {
    const urlParams = new URLSearchParams(location.search);

    const id = urlParams.get('id');

    return id;

}

const converterData = (element) =>{
    const dataSec = element._seconds;

    const data = new Date(Date.UTC(1970, 0, 1)); // Epoch
    data.setSeconds(dataSec);
    return data;
}

const carregarTitulo = (element) =>{
    const serviceTitulo = document.getElementById('service-title');
    const serviceTituloHead = document.getElementById('service-title-head');

    serviceTitulo.innerHTML= element.titulo;
    serviceTituloHead.innerHTML = element.titulo;
}












const criarCommentElement = (element) => {
    const template = document.getElementById('comment-template');

    const commentElement = document.importNode(template.content, true);

    const itens_comment = commentElement.querySelectorAll('span');

    itens_comment[0].innerText = element.id;
    itens_comment[1].innerText = element.conteudo;

    return commentElement;
}

const carregarComments = async (id) => {
    const response = await fetch(`http://localhost:3000/comments/${id}`);
    const dados = await response.json();

    dados.forEach(element => {
        const containerCommentsElement = document.getElementById('container-comments');

        const CommentElement = criarCommentElement(element);

        containerCommentsElement.append(CommentElement);

    });
}

const carregarCommentElement = async (id, commentId) => {
    const response = await fetch(`http://localhost:3000/comments/${id}/${commentId}`);
    const dados = await response.json();

    const commentElement = criarCommentElement(dados);
    
    return commentElement;
}

const postarComment = async ()=>{

    const id = carregarId();

    const commentIdElement = id;
    const commentConteudoElement = document.getElementById('comment-conteudo');

    const comment = {
        serviceId: commentIdElement,
        conteudo: commentConteudoElement.value
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(comment)
    }

    const response = await fetch(`http://localhost:3000/comments/${id}`, init);
    const dados = await response.json();

    const containerCommentsElement = document.getElementById('container-comments');

    const commentId = dados.id;

    const commentElement = await carregarCommentElement(id, commentId);

    containerCommentsElement.prepend(commentElement);

    commentConteudoElement.value = "";
}











window.onload = () =>{

    const id = carregarId();

    carregarServices(id);
    carregarComments(id);

    const btnAddComment = document.getElementById('btnAddComment');

    btnAddComment.onclick = postarComment;
    
}