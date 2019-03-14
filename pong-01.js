function main()
{
  console.log("main: esto empieza")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx= canvas.getContext("2d");

  ctx.fillStyle = 'white';
  ctx.fillRect(50,25,10,40);

  ctx.fillStyle = 'white';
  ctx.fillRect(500,300,10,40);

  var cont = 5;
  while(cont < canvas.height){
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width/2,cont,2,10);
    cont = cont +20;
  }

  var bolita = {
    x_ini : 125,
    y_ini : 100,
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

  bolita.initial(ctx)
  bolita.draw()

  var timer = null;
  var saque = document.getElementById('saque');

  saque.onclick = () => {
    if(!timer){
      timer = setInterval(()=>{
        bolita.update();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bolita.draw();

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
