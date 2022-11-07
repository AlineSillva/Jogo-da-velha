var rodada = 1;
var placar1 =0;
var placar2=0;
var matriz_jogo = Array(3);
//var linha_coluna = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){

   $('#btn_iniciar_jogo').click(function(){

        //validar digitação dos apelidos
        if($('#apelido1').val() == '' || $('#apelido2').val() == ''){
            alert("Por favor digite os nomes dos jogadores 🙂");
            return false;
        }
        
        //exibir apelidos
        $('#nome_jogador1').html($('#apelido1').val());
        $('#nome_jogador2').html($('#apelido2').val());

        //exibir palco do jogo e esconder tela inicial
        $('#pagina_inicial').hide();
        $('#palco_jogo').show();

   });

   $('.jogada').click( function(){
        
    var idPlace = this.id;
    jogada(idPlace);
    $('#placar1').html(placar1);
    $('#placar2').html(placar2);

    });

    function jogada(id)
    {
        icone = '';
        var ponto = 0;

        if(rodada%2 == 1){
            icone = "url(imagens/marcacao_1.png)";
            ponto = -1;
        }else{
            icone = "url(imagens/marcacao_2.png)";
            ponto = 1;
        }
        rodada++;
        //verificar se ja não há pontuação na casa clicada
        var linha_coluna = id.split('-');
        if(matriz_jogo[linha_coluna[0]][linha_coluna[1]] != ''){
            return rodada--;
        }else{
            $('#'+id).css('background-image', icone);
            matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;
            verificaVitoria();
        }
        velha();
       //alert(matriz_jogo[linha_coluna[0]][linha_coluna[1]]);
    }

    function verificaVitoria()
    {
        verificaLinha('a');
        verificaLinha('b');
        verificaLinha('c');
        verificaDiagonal();
        verificaColuna();
    }

    function verificaDiagonal()
    {
            temp =0;
            temp+= matriz_jogo['a'][1];
            temp+= matriz_jogo['b'][2];
            temp+= matriz_jogo['c'][3];
            win(temp);
            temp =0;
            temp+= matriz_jogo['a'][3];
            temp+= matriz_jogo['b'][2];
            temp+= matriz_jogo['c'][1];
            win(temp);
    }

    function verificaLinha(x)
    {
        var c =1;
        var temp = 0;
         for(c;c<4;c++){
             temp += matriz_jogo[x][c];
         }
         win(temp);
        
    }
    
    function verificaColuna()
    {
        for(var i =1; i<4;i++){
            temp =0;
            temp+= matriz_jogo['a'][i];
            temp+= matriz_jogo['b'][i];
            temp+= matriz_jogo['c'][i];
             win(temp);
         }
    }
    function win(temp)
    {
        if(temp == -3){
            alert('jogador 1 venceu');
            resetTabuleiro();
            placar1++;
        }
        if(temp == 3){
           alert('jogador 2 venceu');
           resetTabuleiro();
           placar2++;
       }

    }
    
    function velha()
    {
        var count = 0;
        for(var i=1;i<=3;i++){
            var a = matriz_jogo['a'][i];
            var b = matriz_jogo['b'][i];
            var c = matriz_jogo['c'][i];

            if(a!=0){count++;}
            if(b!=0){count++;}
            if(c!=0){count++;}
        }
        if(count == 9){
            sleep(100);
            alert("Deu Velha!");
            resetTabuleiro();
        }
    }

    function sleep(milliseconds)
     {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
    }

    function resetTabuleiro()
    {
        for(var i=1;i<4;i++){
            matriz_jogo['a'][i] = 0;
            matriz_jogo['b'][i] = 0;
            matriz_jogo['c'][i] = 0;
            $('#a-'+i).css('background-image', "");
            $('#b-'+i).css('background-image', "");
            $('#c-'+i).css('background-image', "");
        }
        rodada = 1;
    }

    

});

