;
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calculateTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes} minutos e ${seconds} segundos`;
    }
    function patio() {
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        ;
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        ;
        function pushValues(veiculo, salva) {
            var _a;
            const row = document.createElement('tr');
            row.innerHTML = `
    <td>${veiculo.nome}</td>
    <td>${veiculo.placa}</td>
    <td>${veiculo.entrada}</td>
    <td>
    <button class="delete" data-placa="${veiculo.placa}">X</button>
    </td>
    `;
            row.querySelector('.delete').addEventListener('click', function () {
                removeValues(this.dataset.placa);
            });
            (_a = $('#patio')) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (salva) {
                salvar([...ler(), veiculo]);
            }
        }
        ;
        function removeValues(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calculateTime(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} ficou ${tempo} estacionado. Deseja retira-lo: `)) {
                return;
            }
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        ;
        function render() {
            $('#patio').innerHTML = '';
            const patio = ler();
            if (patio.length) {
                return patio.forEach(veiculo => pushValues(veiculo));
            }
            return;
        }
        ;
        return { ler, pushValues, removeValues, render, salvar };
    }
    ;
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#name')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        // const last = document.querySelector(`${placa}`);
        if (!nome || !placa) {
            alert("Os campos são obrigatórios");
            return;
        }
        ;
        patio().pushValues({ nome, placa, entrada: new Date() }, true);
    });
}());
