function cargarPingPong() {
    const areaJuego = document.getElementById("area-juego");
    areaJuego.innerHTML = "";

    
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    canvas.style.background = "black";
    areaJuego.appendChild(canvas);

    const ctx = canvas.getContext("2d");

   
    let player = { x: 10, y: 130, w: 10, h: 70, speed: 6 };
    let ai = { x: canvas.width - 20, y: 130, w: 10, h: 70 };

    // Pelota
    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 7,
        dx: 4,
        dy: 3
    };

    let up = false;
    let down = false;

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") up = true;
        if (e.key === "ArrowDown") down = true;
    });

    document.addEventListener("keyup", e => {
        if (e.key === "ArrowUp") up = false;
        if (e.key === "ArrowDown") down = false;
    });

    
    setInterval(() => {
        const random = Math.random();
        if (random < 0.33) ai.y -= 20;
        else if (random < 0.66) ai.y += 20;
        // Sino no se mueve
    }, 250);

    function reset() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
        ball.dy = (Math.random() * 4) - 2;
    }

    function update() {
        
        if (up) player.y -= player.speed;
        if (down) player.y += player.speed;

        // Limites
        if (player.y < 0) player.y = 0;
        if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;

        if (ai.y < 0) ai.y = 0;
        if (ai.y + ai.h > canvas.height) ai.y = canvas.height - ai.h;

        
        ball.x += ball.dx;
        ball.y += ball.dy;

        
        if (ball.y < 0 || ball.y > canvas.height) {
            ball.dy *= -1;
        }

    
        if (
            ball.x - ball.r < player.x + player.w &&
            ball.y > player.y &&
            ball.y < player.y + player.h
        ) {
            ball.dx *= -1;
        }

        // Colisión con IA
        if (
            ball.x + ball.r > ai.x &&
            ball.y > ai.y &&
            ball.y < ai.y + ai.h
        ) {
            ball.dx *= -1;
        }

        // Fallos
        if (ball.x < 0 || ball.x > canvas.width) {
            reset();
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        ctx.fillStyle = "white";
        ctx.fillRect(player.x, player.y, player.w, player.h);

        
        ctx.fillStyle = "white";
        ctx.fillRect(ai.x, ai.y, ai.w, ai.h);

        
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        
        ctx.fillStyle = "gray";
        ctx.fillRect(canvas.width/2 - 2, 0, 4, canvas.height);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
