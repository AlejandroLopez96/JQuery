$(document).ready(function() {
    
    //Creo variables globales
    var vidas;
    var nivel;
    var color = ['red','orange','yellow','green','blue'];
    var colorBola1;
    var idbola;
    var posLeft;
    var bolasArriba = 0;
    
    //Función para el boton comenzar
    $('#comenzar').on('click',function(){
        //Elimino los residuos de la anterior partida
        $('.bolita').remove();
        $('#fin').remove();
        $('#comenzar').attr('disabled','true');
        
        //Inicializo los valores
        vidas = 3;
        nivel = 1;
        idbola = 1;
        $('#vidas').text('Vidas: ' + vidas);
        $('#nivel').text('Nivel: ' + nivel);
        //Se llama a la función crear bolas
        creaBolas();
        
    });
    
    //Funcion crear bolas
    function creaBolas(){
        //Creo una variable para saber cuantas bolas se deben crear
        var numBolas = nivel;
        
        while(numBolas > 0){
            //Se crea el color de la bola y la posición inicial
            var backColor = color[Math.floor(Math.random()*5)];
            posLeft = Math.floor(Math.random()*300);
            if(idbola != 1){
                do {
                    backColor = color[Math.floor(Math.random()*5)];
                } while(backColor == colorBola1);
            }

            //Creo la bola, se le añade la clase, la id, el color y la posición inicial
            var bola = $('<div></div>').addClass('bolita').attr('id','bola' + idbola);
            bola.css({'background-color':backColor , 'left':posLeft});
            
            //Si es la primera bola le asigno el evento onClick
            if(idbola == 1){
                $('#color').text('Color: ' + backColor);
                colorBola1 = backColor;
                bola.on('click',function(){
                   $(this).remove(); 
                });
            }
            //Se añade la bola al juego, se aumenta el id de las bolas y
            //se decrementa el número de bolas a crear
            $('#juego').prepend(bola);
            idbola++;
            numBolas--;
        
            //Se inicia la animación de las bolas
            animacion(bola);
        }
        
    }
    
    //Función para animar bolas
    function animacion(bolaRecibida){
        //Se crea la posición donde debe acabar la bola
        posLeft = Math.floor(Math.random()*300);
        //Se inicia la animación
        $(bolaRecibida).animate({top: '0px', left:posLeft},5000,function(){
            //Se comprueba que la animación de todas las bolas haya terminado.
            bolasArriba++;
            if(bolasArriba == nivel){
                //Se inicializa a 0 para el siguiente nivel.
                bolasArriba = 0;
                //Si la primera bola llega arriba se pierde una vida
                if($('#bola1').css('top') == '0px'){
                    vidas--;
                    $('#vidas').text('Vidas: ' + vidas);
                } 
                //Si aún quedan vidas, se aumenta el nivel, 
                //se eliminan las bolas actuales y se llama de nuevo a crear bolas.
                if(vidas > 0){
                    nivel++;
                    $('#nivel').text('Nivel: ' + nivel);
                    //Se recorren todas las bolas, se les da una animación 
                    //y luego se eliminan.
                    $('#juego div').each(function(){
                        $(this).animate({opacity:0},'slow',function(){
                            $(this).remove();
                        });
                    });
                    //Se pone el id de las bolas a 1 y se llama de nuevo a crearBolas()
                    idbola = 1;
                    creaBolas();
                    
                } else {//Si no quedan vidas acaba el juego.
                    $('#comenzar').removeAttr('disabled');
                    $('#juego').prepend($('<div>GAME OVER</div>').attr('id','fin'));
                }
            }
        });
        
    }
});