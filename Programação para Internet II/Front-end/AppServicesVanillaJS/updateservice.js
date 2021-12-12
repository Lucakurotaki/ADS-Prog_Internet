const converterDataISO = (element) =>{
    const dataSec = element._seconds;

    const data = new Date(Date.UTC(1970, 0, 1)); // Epoch
    data.setSeconds(dataSec);
    return data.toISOString();
}

const converterDataObj = (data)=>{
    const segundos = Date.parse(data)/1000

    const date = {_seconds: segundos};

    return date;
}

const carregarId = () => {
    const urlParams = new URLSearchParams(location.search);

    const id = urlParams.get('id');

    return id;

}

const carregarTitulo = (element) =>{
    const serviceTituloHead = document.getElementById('service-title-head');
    serviceTituloHead.innerHTML = element.titulo;
}











const carregarService = async (id)=>{
    const response = await fetch(`http://localhost:3000/services/${id}`);
    const dados = await response.json();

    carregarTitulo(dados);
    
    const dtcadastro = converterDataISO(dados.dtcadastro);
    const dtlimite = converterDataISO(dados.dtlimite);

    document.getElementById('service-titulo').value = dados.titulo;
    document.getElementById('service-situacao').value = dados.situacao;
    document.getElementById('service-dtcadastro').value = dtcadastro;
    document.getElementById('service-dtlimite').value = dtlimite;
    document.getElementById('service-orcamento').value = dados.orcamento;
    document.getElementById('service-descricao').value = dados.descricao;


}

const atualizarService = async ()=>{
    const id = carregarId();

    const serviceTituloElement = document.getElementById('service-titulo');
    const serviceSituacaoElement = document.getElementById('service-situacao');
    const serviceDtcadastroElement = converterDataObj(document.getElementById('service-dtcadastro').value);
    const serviceDtlimiteElement = converterDataObj(document.getElementById('service-dtlimite').value);
    const serviceOrcamentoElement = document.getElementById('service-orcamento');
    const serviceDescricaoElement = document.getElementById('service-descricao');

    const service = {
        titulo: serviceTituloElement.value,
        situacao: serviceSituacaoElement.value,
        dtcadastro: serviceDtcadastroElement,
        dtlimite: serviceDtlimiteElement,
        orcamento: serviceOrcamentoElement.value,
        descricao: serviceDescricaoElement.value
    }

    const init = {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(service)
    }

    const response = await fetch(`http://localhost:3000/services/${id}`, init);
    const dados = await response.json();

    console.log(dados);


    location.href='/index.html';
}










window.onload = () =>{
    const id = carregarId();

    carregarService(id);

    const btnAtualizarService = document.getElementById('btnAtualizarService');

    btnAtualizarService.onclick = atualizarService;
}