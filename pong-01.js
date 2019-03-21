function main()
{
  // inicializando canvas
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx= canvas.getContext("2d");

  //funcion para dibujar la linea del campo divisoria
  function drawline() {
    var cont = 5;
    while(cont < canvas.height){
      ctx.fillStyle = 'orange';
      ctx.fillRect(canvas.width/2,cont,2,10);
      cont = cont +20;
    }
  }

  //funcion para dibujar el marcador
  function drawscoreboard() {
    ctx.font = "50px Courier New";
    ctx.fillText(raquet1.points, canvas.width/4, 40)
    ctx.font = "50px Courier New";
    ctx.fillText(raquet2.points, 3*canvas.width/4 -30, 40)
  }

  //inicializacion de la bola
  var bolita = {
    x_ini : 300,
    y_ini : 200,
    x : 0,
    y : 0,
    height : 5,
    width : 5,
    ctx : null,
    vx : 5,
    vy : 2,
    direction:"right",

    //inicializar el contexto de la bola
    initial: function(ctx){
      this.ctx = ctx;
      this.reset();
    },

    //restear la posicion de la bola
    reset: function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    },

    //dibujar la bola
    draw: function(){
      this.ctx.fillStyle = 'turquoise';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    },

    //actualizar la posicion de la bola segun su movimiento
    update: function(){
      this.x += this.vx;
      this.y += this.vy;
    },
  }

  //inicializacion de las raquetas
  function pala(a,b) {
    this.x_ini = a
    this.y_ini = b
    this.x = 0
    this.y = 0
    this.height = 40
    this.width = 10
    this.ctx = null
    this.vy = 5
    this.direction = null
    this.points = 0

    //inicializar el contexto de las raquetas
    this.initial = function(ctx){
      this.ctx = ctx;
      this.reset();
    }

    //restear la posicion de las raquetas
    this.reset = function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    }

    //dibujar las raquetas
    this.draw = function(){
      this.ctx.fillStyle = 'MediumSeaGreen';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    //actualizar la posicion de las raquetas segun su movimiento
    this.update = function(){
      if(this.direction == "up"){
        this.y = this.y - this.vy;
      }else if(this.direction == "down"){
        this.y += this.vy;
      }
    }
  }

  var raquet1 = new pala(25,40);
  var raquet2 = new pala(500,300);

  bolita.initial(ctx)
  bolita.draw()
  raquet1.initial(ctx)
  raquet1.draw()
  raquet2.initial(ctx)
  raquet2.draw()
  drawline()
  drawscoreboard()

  //inicializar el tiempo para el juego
  var timer = null;
  var saque = document.getElementById('saque');

  //al pulsar en el boton empieza el juego
  saque.onclick = () => {
    if(!timer){
      //mientras el tiempo corra pasa esto
      timer = setInterval(()=>{
        bolita.update();
        raquet1.update();
        raquet2.update();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bolita.draw();
        raquet1.draw();
        raquet2.draw()
        drawline();
        drawscoreboard();

        //funcion para detectar las teclas apretadas
        window.onkeydown = (e) => {
          e.preventDefault();
          if(e.key == 'w'){
            raquet1.direction = "up";
          }else if(e.key == 's'){
            raquet1.direction = "down";
          }

          if(e.key == 'ArrowUp'){
            raquet2.direction = "up";
          }else if(e.key == 'ArrowDown'){
            raquet2.direction = "down";
          }
        }

        //funcion para detectar las teclas soltadas
        window.onkeyup = (e) => {
          raquet1.direction = "quieta";
          raquet2.direction = "quieta";
        }

        if(raquet1.y + raquet1.height >= canvas.height){
          raquet1.direction = "quieta";
        }else if (raquet1.y <= 0){
          raquet1.direction = "quieta";
        }

        if(raquet2.y + raquet2.height >= canvas.height){
          raquet2.direction = "quieta";
        }else if (raquet2.y <= 0){
          raquet2.direction = "quieta";
        }

        //condicion para el choque con la primera raqueta
        if (bolita.x >= raquet1.x && bolita.x <= raquet1.x + raquet1.width){
          if(bolita.y >= raquet1.y && bolita.y <= raquet1.y + raquet1.height){
            bolita.vx = 5;
            bolita.direction = "right";
          }
        }

          //condicion para el choque con la segunda raqueta
        if (bolita.x >= raquet2.x && bolita.x <= raquet2.x + raquet2.width){
          if(bolita.y >= raquet2.y && bolita.y <= raquet2.y + raquet2.height){
            bolita.vx = -5;
            bolita.direction = "left";
          }
        }

        //movimiento de la bola y suma de puntos
        if(bolita.x > canvas.width){
          bolita.vx = -5;
          bolita.direction = "left";
          raquet1.points += 1;
        }else if(bolita.y > canvas.height){
          if(bolita.direction == "right"){
            bolita.vy = -2;
            bolita.vx = 5;
          }else if(bolita.direction == "left"){
            bolita.vy = -2;
            bolita.vx = -5;
          }
        }else if(bolita.x < 0){
          bolita.vx = 5;
          bolita.direction = "right";
          raquet2.points += 1;
        }else if(bolita.y < 0){
          if(bolita.direction == "right"){
            bolita.vy = 2;
            bolita.vx = 5;
          }else if(bolita.direction == "left"){
            bolita.vy = 2;
            bolita.vx = -5;
          }
        }
      },15);
    }
  }

}
