interface IVeiculo {
  nome: string;
  placa: string;
  entrada: Date | string;
};


(function(){
const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

function calculateTime(time: number) : string{
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000)/1000);

  return `${minutes} minutos e ${seconds} segundos`
}


function patio(){

  function salvar(veiculos: IVeiculo[]){
    localStorage.setItem("patio", JSON.stringify(veiculos));
  };

  function ler() : IVeiculo[]{
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
  };


  function pushValues(veiculo: IVeiculo, salva?: boolean){
    

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${veiculo.nome}</td>
    <td>${veiculo.placa}</td>
    <td>${veiculo.entrada}</td>
    <td>
    <button class="delete" data-placa="${veiculo.placa}">X</button>
    </td>
    `;

    row.querySelector('.delete').addEventListener('click', function() {
      removeValues(this.dataset.placa);
    })
          $('#patio')?.appendChild(row);
    
          if(salva){ salvar([...ler(), veiculo])}
  };


  function removeValues(placa: string){
    const { entrada , nome } = ler().find((veiculo) => veiculo.placa === placa) as IVeiculo;

    const tempo = calculateTime(new Date().getTime() - new Date(entrada).getTime());

    if(!confirm(`O veiculo ${nome} ficou ${tempo} estacionado. Deseja retira-lo: `)){ return;}

    salvar(ler().filter(veiculo => veiculo.placa !== placa));
    render();
  };


  function render(){
    $('#patio')!.innerHTML = '';
    const patio = ler();

    if(patio.length){
      return patio.forEach(veiculo => pushValues(veiculo));
    }
    return;
  };
  
  
  

  return {ler, pushValues, removeValues, render, salvar};
};

patio().render();

$('#cadastrar')?.addEventListener('click', () => {
  const nome = $('#name')?.value;
  const placa = $('#placa')?.value;

  // const last = document.querySelector(`${placa}`);



  if(!nome || !placa) {
    alert("Os campos são obrigatórios");
    return;
  };

  patio().pushValues({nome, placa, entrada: new Date()}, true);
  
}



)
}());
