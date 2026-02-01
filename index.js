const prompt = require('prompt-sync')();

let soma = 0;
let media = 0;
let cont_aprovado = 0;
let cont_recuperacao = 0;
let cont_reprovado = 0;

const qtd_aluno = parseInt(prompt("Informe a quantidade de alunos(as) que tem na sala: "));
console.log("-------------------------------------------------------");

for (let i = 1; i <= qtd_aluno; i++) {

    let notaAluno = parseFloat(prompt(`Informe a nota do(a) ${i}º aluno(a) (de 0 ate 10): `));

    if (notaAluno < 0 || notaAluno > 10) 
    {
        console.log("Nota inválida. Digite um valor entre 0 e 10.");
        i--;
        continue; 
    }  
        soma = soma + notaAluno;
    if (notaAluno >= 7.0) 
    {
        cont_aprovado = cont_aprovado + 1;
        console.log("Aluno(a) aprovado");
        console.log("-------------------------------------------------------");
    } 
    else if (notaAluno >= 5.0 && notaAluno < 7.0) 
    {           
        cont_recuperacao = cont_recuperacao + 1;
        console.log("Aluno(a) em recuperação");
        console.log("-------------------------------------------------------");
    } 
    else 
    {
    cont_reprovado = cont_reprovado + 1;
    console.log("Aluno(a) Reprovado(a)");
    console.log("-------------------------------------------------------");
    }
} 
    media = soma/qtd_aluno;
    console.log(`A média da turma é: ${media.toFixed(2)}`);
    console.log("-------------------------------------------------------");
    console.log(`O total de alunos aprovados: ${cont_aprovado}`);
    console.log("-------------------------------------------------------");
    console.log(`O total de alunos em recuparação: ${cont_recuperacao}`);
    console.log("-------------------------------------------------------");
    console.log(`O total de alunos reprovados: ${cont_reprovado}`);