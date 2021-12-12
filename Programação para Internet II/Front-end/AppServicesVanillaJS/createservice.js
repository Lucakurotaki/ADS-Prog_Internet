const converterData = (data)=>{
    const segundos = Date.parse(data)/1000

    const date = {_seconds: segundos};

    return date;
}

const novoService = async () =>{

    const serviceTituloElement = document.getElementById('service-titulo');
    const serviceDtlimiteElement = converterData(document.getElementById('service-dtlimite').value);
    const serviceOrcamentoElement = document.getElementById('service-orcamento');
    const serviceDescricaoElement = document.getElementById('service-descricao');

    const currentDate = new Date();
    const serviceDtcadastroElement = converterData(currentDate);

    const serviceSituacaoElement = "Aberto"


    const service = {
        titulo: serviceTituloElement.value,
        situacao: serviceSituacaoElement,
        dtcadastro: Object(serviceDtcadastroElement),
        dtlimite: Object(serviceDtlimiteElement),
        orcamento: Number(serviceOrcamentoElement.value),
        descricao: serviceDescricaoElement.value
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(service)
    }

    const response = await fetch('http://localhost:3000/services', init);
    const dados = await response.json();

    const id = dados.id;

    location.href=`/service.html` + `?id=${id}`;

}

window.onload = ()=>{
    const btnNovoService = document.getElementById('btnNovoService');

    btnNovoService.onclick = novoService;
}