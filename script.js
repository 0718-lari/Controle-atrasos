let atrasos = JSON.parse(localStorage.getItem("atrasos")) || [];

/* ATUALIZAR TABELA */

function atualizarLista(){

let lista = document.getElementById("lista");
lista.innerHTML = "";

atrasos.forEach((a, index) => {

let linha = `
<tr>
<td>${a.nome}</td>
<td>${a.turma}</td>
<td>${a.horario}</td>
<td>
<button onclick="editar(${index})">✏️</button>
<button onclick="remover(${index})">🗑️</button>
</td>
</tr>
`;

lista.innerHTML += linha;

});

document.getElementById("total").innerText = atrasos.length;

localStorage.setItem("atrasos", JSON.stringify(atrasos));

}

/* REGISTRAR ATRASO */

function registrar(){

let nome = document.getElementById("nome").value;
let turma = document.getElementById("turma").value;
let horario = document.getElementById("horario").value;

if(!nome || !turma || !horario){
alert("Preencha todos os campos");
return;
}

if(horario <= "07:10"){
alert("Aluno chegou no horário");
return;
}

let aluno = {
nome,
turma,
horario
};

atrasos.push(aluno);

atualizarLista();

/* LIMPAR CAMPOS */

document.getElementById("nome").value = "";
document.getElementById("turma").value = "";
document.getElementById("horario").value = "";

}

/* REMOVER ALUNO */

function remover(index){

atrasos.splice(index,1);

atualizarLista();

}

/* EDITAR ALUNO */

function editar(index){

let novoNome = prompt("Editar nome:", atrasos[index].nome);
let novaTurma = prompt("Editar turma:", atrasos[index].turma);
let novoHorario = prompt("Editar horário:", atrasos[index].horario);

if(novoNome && novaTurma && novoHorario){

atrasos[index].nome = novoNome;
atrasos[index].turma = novaTurma;
atrasos[index].horario = novoHorario;

atualizarLista();

}

}

/* EXPORTAR CSV */

function exportarCSV(){

let csv = "Nome,Turma,Horario\n";

atrasos.forEach(a => {
csv += `${a.nome},${a.turma},${a.horario}\n`;
});

let blob = new Blob([csv], {type:"text/csv"});
let url = URL.createObjectURL(blob);

let link = document.createElement("a");
link.href = url;
link.download = "relatorio_atrasos.csv";
link.click();

}

/* CARREGAR LISTA */

atualizarLista();