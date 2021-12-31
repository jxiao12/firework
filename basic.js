(function(){
  function $(selectors){
    if (selectors.substring(0,1) == "#") {
      return document.querySelector(selectors);
    } else {
      return document.querySelectorAll(selectors);
    }
  }

  function randColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let color = 'rgb(' + r + ',' + g + ',' + b + ')';
    return color;
  }

  let canvas = $("#canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  let ctx = canvas.getContext("2d");
  let fireArr = [];
  let fireWorkArr = [];
  let fireNumber = 10;
  let center = {
    x: canvas.width / 2,
    y: canvas.width / 2,
  }

  let range = 160;
  for (let i = 0; i < fireNumber; i++) {
    let fire = {
      x: Math.random() * range - range / 2 + center.x,
      y: Math.random() * range * 2.5 + canvas.height,
      size: Math.random() + 0.5,
      fill: randColor(),
      vx: Math.random() - 0.5,
      vy: -(Math.random() + 4),
      ax: Math.random() * 0.06 - 0.03,
      alpha: 1,
      far: Math.random() * range + (center.y - range),
    }

    fire.base = {
      x: fire.x,
      y: fire.y,
      vx: fire.vx,
      vy: fire.vy,
    }

    fireArr.push(fire);
  }

  console.log(fireArr);
  function update(){
    for (let i = 0; i < fireArr.length; i++) {
      let fire = fireArr[i];
      if (fire.y <= fire.far) {
        makeFireWord(fire);
        fire.y += fire.base.y;
        fire.x += fire.base.x;
        fire.vx += fire.base.vx;
        fire.vy += fire.base.vy;
      }
      fire.x += fire.vx;
      fire.y += fire.vy;
      fire.vx += fire.ax;
      fire.alpha = (fire.y - fire.far) / fire.far;
    }
  }


  function draw(){
    ctx.globalCompositeOperation = "source-over";
    let img = $("#bg");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < fireArr.length; i++) {
      let fire = fireArr[i];
      ctx.globalAlpha = fire.alpha;
      ctx.beginPath();
      ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = fire.fill;
      ctx.fill();
    }


    for (let i = 0; i < fireWorkArr.length; i++) {
      let firework = fireWorkArr[i];
      ctx.globalAlpha = firework.alpha;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = firework.fill;
      ctx.fill();
    }
    // for (let i = 0; i < fireWorkArr.length; i++) {
    //   let firework = fireWorkArr[i];
    //   if (firework) {
    //     firework.vx *= 0.9;
    //     firework.vy *= 0.9;
    //     firework.x += firework.vx;
    //     firework.y += firework.vy;
    //     firework.vy += firework.ay;
    //
    //     firework.alpha = firework.life / firework.base.life;
    //     firework.size = firework.alpha * firework.base.size;
    //     firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
    //     firework.life--;
    //     if (firework.life <= 0) {
    //       fireWorkArr.splice(i , 1);
    //     }
    //   }
    // }
  }

  function makeFireWord(fire){
    let color = randColor();
    let velocity = Math.random() * 8 + 8;
    let max = fireNumber * 3;
    for (let i = 0; i < max; i++) {
      let rad = (i * Math.PI * 2) / max;
      let firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round(Math.random() * range / 2) + range / 1.5
      }
      fire.base = {
        life: firework.life,
        size: firework.size,
      }

      fireWorkArr.push(firework);
    }

    color = randColor();
    velocity = Math.random() * 3 + 4;
    max = fireNumber * 2;

    or (let i = 0; i < max; i++) {
      let rad = (i * Math.PI * 2) / max;
      let firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round(Math.random() * range / 2) + range / 1.5
      }
      fire.base = {
        life: firework.life,
        size: firework.size,
      }

      fireWorkArr.push(firework);
    }
    max = fireNumber * 4;
  }


  (function loop(){
    requestAnimationFrame(loop);
    update();
    draw();
  }
)()
})()
