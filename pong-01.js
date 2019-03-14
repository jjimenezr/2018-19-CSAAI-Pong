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

  ctx.fillStyle = 'white';
  ctx.fillRect(125,100,5,5);

  var cont = 5;
  while(cont < canvas.height){
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width/2,cont,2,10);
    cont = cont +20;
  }

  var bolita = {
    x_ini : 125,
    y_ini : 100,


  }

}
