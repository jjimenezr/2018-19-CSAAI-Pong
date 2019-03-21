function main()
{
  console.log("main: esto empieza")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx= canvas.getContext("2d");

  ctx.fillStyle = 'white';
  ctx.fillRect(500,300,10,40);

  function drawline() {
    var cont = 5;
    while(cont < canvas.height){
      ctx.fillStyle = 'white';
      ctx.fillRect(canvas.width/2,cont,2,10);
      cont = cont +20;
    }
  }

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

    initial: function(ctx){
      this.ctx = ctx;
      this.reset();
    },

    reset: function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    },

    draw: function(){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    },

    update: function(){
      this.x += this.vx;
      this.y += this.vy;
    },
  }

  var raquet1 = {
    x_ini : 40,
    y_ini : 25,
    x : 0,
    y : 0,
    height : 40,
    width : 10,
    ctx : null,
    vy : 5,
    direction : null,

    initial: function(ctx){
      this.ctx = ctx;
      this.reset();
    },

    reset: function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    },

    draw: function(){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    },

    update: function(){
      if(this.direction == "up"){
        this.y = this.y - this.vy;
      }else if(this.direction == "down"){
        this.y += this.vy;
      }
    },
  }

  bolita.initial(ctx)
  bolita.draw()
  raquet1.initial(ctx)
  raquet1.draw()
  drawline()


  var timer = null;
  var saque = document.getElementById('saque');

  saque.onclick = () => {
    if(!timer){
      timer = setInterval(()=>{
        bolita.update();
        raquet1.update();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bolita.draw();
        raquet1.draw();
        drawline();

        window.onkeydown = (e) => {

          e.preventDefault();
          if(e.key == 'w'){
            raquet1.direction = "up";
          }else if(e.key == 's'){
            raquet1.direction = "down";
          }
        }

        window.onkeyup = (e) => {
          raquet1.direction = "quieta";
        }

        if(raquet1.y + raquet1.height >= canvas.height){
          raquet1.direction = "quieta";
        }else if (raquet1.y <= 0){
          raquet1.direction = "quieta";
        }

        

        if(bolita.x > canvas.width){
          bolita.vx = -5;
          bolita.direction = "left";
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
