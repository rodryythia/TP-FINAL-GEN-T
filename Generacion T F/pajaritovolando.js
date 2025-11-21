function cargarFlappyBird() {
    const area = document.getElementById("area-juego");
    area.innerHTML = "";

    const pantalla = document.querySelector(".pantalla") || document.body;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.background = "#4dc0ff";
    area.appendChild(canvas);

    function ajustar() {
        const rect = pantalla.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    ajustar();
    window.addEventListener("resize", ajustar);

    const ctx = canvas.getContext("2d");

    // VARIABLES
    let bird = {
        x: canvas.width * 0.25,
        y: canvas.height / 2,
        r: 15,
        vel: 0
    };

    let gravity = 0.5;
    let jumpPower = -8;

    let pipes = [];
    let frame = 0;
    let score = 0;

    function jump() {
        bird.vel = jumpPower;
    }

    document.addEventListener("keydown", jump);
    canvas.addEventListener("mousedown", jump);

    function spawnPipe() {
        let gap = canvas.height * 0.25; // tamaño del hueco
        let top = Math.random() * (canvas.height * 0.5);
        let bottom = top + gap;

        pipes.push({
            x: canvas.width,
            topH: top,
            bottomY: bottom,
            w: 50
        });
    }

    function reset() {
        bird.y = canvas.height / 2;
        bird.vel = 0;
        pipes = [];
        score = 0;
        frame = 0;
    }

    function update() {
        bird.vel += gravity;
        bird.y += bird.vel;

        frame++;
        if (frame % 100 === 0) spawnPipe();

        // mover tubos
        pipes.forEach(pipe => pipe.x -= 3);

        // eliminar tubos fuera de pantalla
        pipes = pipes.filter(pipe => pipe.x + pipe.w > 0);

        // colisiones con bordes
        if (bird.y - bird.r < 0 || bird.y + bird.r > canvas.height) {
            alert("Perdiste! Puntaje: " + score);
            reset();
        }

        // colisión tubos
        for (let p of pipes) {
            if (
                bird.x + bird.r > p.x &&
                bird.x - bird.r < p.x + p.w
            ) {
                if (bird.y - bird.r < p.topH || bird.y + bird.r > p.bottomY) {
                    alert("Perdiste! Puntaje: " + score);
                    reset();
                    return;
                }
            }

            if (p.x + p.w < bird.x && !p.counted) {
                score++;
                p.counted = true;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Pájaro
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2);
        ctx.fill();

        // Tubos
        ctx.fillStyle = "green";
        for (let p of pipes) {
            ctx.fillRect(p.x, 0, p.w, p.topH);
            ctx.fillRect(p.x, p.bottomY, p.w, canvas.height - p.bottomY);
        }

        // Puntaje
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Puntaje: " + score, 10, 30);
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
}
