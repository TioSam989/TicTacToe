var vezDeQuem = 0;
var contador = 0;

var jog1 = document.getElementById("jog1");
var jog2 = document.getElementById("jog2");



number1 = 0;
number2 = 0;

var tabuleiro = {
    nome: 'Jogo do Davi',
    '0_0': '1',
    '1_0': '2',
    '2_0': '3',
    '0_1': '4',
    '1_1': '5',
    '2_1': '6',
    '0_2': '7',
    '1_2': '8',
    '2_2': '9',
};

var pecasTabuleiro = []

var player1 = {};

var player2 = {};

function Distribuir(x, y) {

    var valor = tabuleiro[`${x}_${y}`];
    pecasTabuleiro.push(valor);

    verificarVez(x, y, valor);
    

}

function verificarVez(x, y, valor) {

    if (document.getElementById(valor).style.backgroundColor) {

    } else {

        if (vezDeQuem == 0) {
            var cor = "blue";

            vezDeQuem = 1;
            mudarCor(x, y, valor, cor);

        } else if (vezDeQuem == 1) {
            var cor = "green";

            vezDeQuem = 0;
            mudarCor(x, y, valor, cor);
        }
    }


}

function mudarCor(x, y, valor, cor) {

    document.getElementById(valor).style.backgroundColor = cor;
    contador++;
    if (contador >= 1) {


        if (contador / 5 >= 1) {
            verificarGanhador(x, y, valor);

        } else {

            verificarGanhador(x, y, valor);
        }
    }
}

function verificarGanhador(x, y, valor) {
    if (contador % 2 == 1) {
        primeiroJogador(x, y, valor);    //<= mudei de funcao pessoal para compartilhada 



    } else if (contador % 2 == 0) {
        segundoJogador(x, y, valor);      //<= mudei de funcao pessoal oara compartilhada

    }

    verificaEmXeY(player1, jog1 = "voce mesmo");
    verificaEmXeY(player2, jog2 = "voce mesmo");


}

const POSICOES = {
    X: 0,
    Y: 2,
}

function verificaEmXeY(jogador, nomeJogador) {
    verificaEmPosicao(jogador, nomeJogador, POSICOES.X);
    verificaEmPosicao(jogador, nomeJogador, POSICOES.Y);
    verificaEmDiagonal(jogador, nomeJogador )
}

function verificaEmPosicao(jogador, nomeJogador, posicao) {
    var quantasVezes = {
        0: 0,
        1: 0,
        2: 0
    };

    Object.keys(jogador).forEach(key => {
        const parteDaChave = key[posicao]; // "x_y" -> "2_0 ->" -> "0"
        quantasVezes[parteDaChave]++;   
    });


    Object.values(quantasVezes).forEach(value => {
        if (value >= 3) {
            // alert("value: "+value)
            vitoria(nomeJogador, "metodo 1")
        }else{
            Velha("metodo 1")
        }
    });
}

function verificaEmDiagonal(jogador, nomeJogador) {

    var quantasVezesX = {
        0: 0,
        1: 0,
        2: 0
    };

    var quantasVezesY = {
        0: 0,
        1: 0,
        2: 0
    };

    Object.keys(jogador).forEach(key => {
        const parteDaChaveY = key[POSICOES.Y]; // "x_y" -> "2_0 ->" -> "0"
        const parteDaChaveX = key[POSICOES.X];
        quantasVezesY[parteDaChaveY]++;
        quantasVezesX[parteDaChaveX]++;
    });

    var estaGanhando = true;
    Object.values(quantasVezesY).forEach(value => { 
        estaGanhando = estaGanhando && value >= 1;
    });

    Object.values(quantasVezesY).forEach(value => {
        estaGanhando = estaGanhando && value >= 1;
    });
    Object.values(quantasVezesX).forEach(value => {
        estaGanhando = estaGanhando && value >= 1;
    });
     

    
    if (estaGanhando ) {

        console.log("AQUI CARALHO "+Object.keys(jogador))
        console.log(quantasVezesX[1] +" E "+quantasVezesY[1]);      

        bugDiagonal(jogador, nomeJogador)
    }
        
}

function primeiroJogador(x, y, valor) {

    number1++;


    player1[`${x}_${y}`] = number1;

    var chaves1 = Object.keys(player1);

    console.clear();
    console.log("valor: "+Object.keys(player1));
    console.log("player1 : "+player1);
    console.log("number1 : "+number1);




}

function segundoJogador(x, y, valor) {

    number2++;


    player2[`${x}_${y}`] = number2;

    var chaves2 = Object.keys(player2);


    console.clear();
    console.log("valor:"+Object.keys(player2));
    console.log("chaves2: "+chaves2);
    console.log("player2 jogou em: "+player2);
    console.log("number2 : "+number2)

    var chaves2 = Object.keys(player2);


    for (let comeco = 0; comeco < Object.keys(player2).length; comeco++) {

    }

}

function bugDiagonal(jogador, nomeJogador){
    console.clear();
    var listaKeys = [];

    for (var index = 0; index < Object.keys(jogador).length; index++) {
        
        listaKeys.push(Object.keys(jogador)[index])
    }

    console.log(listaKeys)

    var copy = listaKeys.slice() 
    var iDontKnow = []

    for (let i = 0; i < copy.length; i++) {
        if(copy[i][0] != copy[i][2]){
            let result = copy[i][0]+"_"+copy[i][2] 
            iDontKnow.push(result)
        }      
    }
    if(Array.isArray(iDontKnow)){
        if(iDontKnow == ""){ //ver se ela esta vazia (se fosse so um ! seria vazio, ent pus !! para contrariar o contrario)
            console.log("") 
            review(copy, nomeJogador)
        }else{
            console.log("Copy: "+copy)
            review(copy, nomeJogador)
            
        }
    }

}  

function review(copy = [], nomeJogador){
    let listinha1 = ['0_0', '1_1', '2_2'];
    let listinha2 = ['2_0', '1_1', '0_2'];
    var acertos1 =[];
    var acertos2 = [];
    console.clear();
    console.log(listinha1);
    console.log(listinha2);

    for(var i=0; i<copy.length; i++) {
        if(listinha1.indexOf(copy[i]) > -1) {
            acertos1.push(copy[i]);
        }
    }
    if((acertos1.length == 3) && (pecasTabuleiro.length != 9)){
        console.clear();
        console.log(acertos1)


        // if(){
        vitoria(nomeJogador, "metodo 2");
        // }
    }else if(acertos1.length != 3){

        for(var i=0; i<copy.length; i++) {
            if(listinha2.indexOf(copy[i]) > -1) {
                acertos2.push(copy[i]);
            }
        }
        if(acertos2.length == 3){
            console.clear()
            console.log(acertos2);
            vitoria(nomeJogador, "metodo 3");
        }

    }

}

function vitoria(nomeJogador, metodo){
        console.log("entrie na funcao vitoria pelo"+metodo);
        alert(`Jogador ${nomeJogador} ganhou.`);
        document.location.reload(true);
}

function Velha(txt){
    
    if(((Object.values(player1).length >=4) && (Object.values(player2).length >=5)) || ((Object.values(player1).length >=5) && (Object.values(player2).length >=4)) ){
        console.clear()
        console.log("player1: "+Object.values(player1))
        console.log("player2: "+Object.values(player2))
        console.log("TXT:"+ txt)
        player1 = {}
        player2 = {}

        finish()
        // document.location.reload(true);

    }
}
function finish(){
    alert("deu velha")
    document.location.reload(true);

}
