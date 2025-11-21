let snakeInterval;

function cargarSnake() {
    const areaJuego = document.getElementById("area-juego");
    areaJuego.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = "";
    areaJuego.appendChild(titulo);

    const marcador = document.createElement("p");
    marcador.textContent = "Puntaje: 0";
    marcador.style.fontSize = "18px";
    marcador.style.fontWeight = "bold";
    marcador.style.color = "lime";
    marcador.style.margin = "10px 0";
    areaJuego.appendChild(marcador);

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.background = "#111";
    canvas.style.display = "block";
    areaJuego.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let box = 20;
    let snake = [{x:10, y:10}];
    let dir = null;
    let started = false;
    let score = 0;

    let food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };

    document.addEventListener("keydown", e => {
        if(e.key === "ArrowLeft"  && dir !== "RIGHT") dir = "LEFT";
        if(e.key === "ArrowUp"    && dir !== "DOWN")  dir = "UP";
        if(e.key === "ArrowRight" && dir !== "LEFT")  dir = "RIGHT";
        if(e.key === "ArrowDown"  && dir !== "UP")    dir = "DOWN";
        if(!started && dir) started = true;
    });

    clearInterval(snakeInterval);
    snakeInterval = setInterval(update, 150);

    function update() {
        if(!started) {
            draw();
            return;
        }

        let head = {x: snake[0].x, y: snake[0].y};

        if(dir === "LEFT")  head.x--;
        if(dir === "RIGHT") head.x++;
        if(dir === "UP")    head.y--;
        if(dir === "DOWN")  head.y++;

        if(head.x < 0 || head.x > 19 || head.y < 0 || head.y > 19) {
            alert("Perdiste. Puntaje final: " + score);
            cargarSnake();
            return;
        }

        for(let s of snake) {
            if(s.x === head.x && s.y === head.y) {
                alert("Perdiste. Puntaje final: " + score);
                cargarSnake();
                return;
            }
        }

        snake.unshift(head);

        if(head.x === food.x && head.y === food.y) {
            score++;
            marcador.textContent = "Puntaje: " + score;
            food = {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 20)
            };
        } else {
            snake.pop();
        }

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, 400, 400);
        snake.forEach(p => {
            ctx.fillStyle = "lime";
            ctx.fillRect(p.x * box, p.y * box, box, box);
        });
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * box, food.y * box, box, box);
    }
}
