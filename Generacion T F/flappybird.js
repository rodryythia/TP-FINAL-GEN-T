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

    // -----------------------------
    // ESTADOS DEL JUEGO
    // -----------------------------
    let state = "start"; 
    // start → quieto
    // playing → en juego
    // dead → terminó y espera reinicio

    // -----------------------------
    // VARIABLES DEL JUEGO
    // -----------------------------
    let bird = { x: 0, y: 0, r: 15, vel: 0 };
    let gravity = 0.5;
    let jumpPower = -8;
    let pipes = [];
    let frame = 0;
    let score = 0;

    function reset() {
        bird.x = canvas.width * 0.25;
        bird.y = canvas.height / 2;
        bird.vel = 0;
        pipes = [];
        frame = 0;
        score = 0;
    }

    reset();

    // -----------------------------
    // ACCIÓN DE SALTAR
    // -----------------------------
    function jump() {
        if (state === "start") {
            state = "playing";
        }
        if (state === "playing") {
            bird.vel = jumpPower;
        }
        if (state === "dead") {
            reset();
            state = "start";
        }
    }

    document.addEventListener("keydown", jump);
    canvas.addEventListener("mousedown", jump);

    // Crear tubos
    function spawnPipe() {
        let gap = canvas.height * 0.25;
        let top = Math.random() * (canvas.height * 0.5);
        let bottom = top + gap;

        pipes.push({
            x: canvas.width,
            topH: top,
            bottomY: bottom,
            w: 50,
            scored: false
        });
    }

    // -----------------------------
    // UPDATE
    // -----------------------------
    function update() {
        if (state !== "playing") return; 

        bird.vel += gravity;
        bird.y += bird.vel;

        frame++;
        if (frame % 100 === 0) spawnPipe();

        pipes.forEach(pipe => pipe.x -= 3);
        pipes = pipes.filter(pipe => pipe.x + pipe.w > 0);

        // colisiones borde
        if (bird.y - bird.r < 0 || bird.y + bird.r > canvas.height) {
            state = "dead";
        }

        // colisiones tubos
        for (let p of pipes) {
            if (
                bird.x + bird.r > p.x &&
                bird.x - bird.r < p.x + p.w
            ) {
                if (bird.y - bird.r < p.topH || bird.y + bird.r > p.bottomY) {
                    state = "dead";
                }
            }

            if (!p.scored && p.x + p.w < bird.x) {
                p.scored = true;
                score++;
            }
        }
    }

    // -----------------------------
    // DRAW
    // -----------------------------
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Bird
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2);
        ctx.fill();

        // Tubes
        ctx.fillStyle = "green";
        for (let p of pipes) {
            ctx.fillRect(p.x, 0, p.w, p.topH);
            ctx.fillRect(p.x, p.bottomY, p.w, canvas.height - p.bottomY);
        }

        // Score
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("Puntaje: " + score, 10, 30);

        // Mensajes de estado
        ctx.font = "32px Arial";
        ctx.fillStyle = "black";

        if (state === "start") {
            ctx.fillText("Toca para empezar papa", canvas.width / 3.5, canvas.height / 2);
        }

        if (state === "dead") {
            ctx.fillText("Perdiste che- Toca para volver al inicio", canvas.width / 4, canvas.height / 2);
        }
    }

    // -----------------------------
    // LOOP PRINCIPAL
    // -----------------------------
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
}