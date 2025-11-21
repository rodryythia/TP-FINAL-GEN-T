let minas = [];
let tablero = []; 
const totalMinas = 10;
const size = 8;

function cargarBuscaminas() {
    const areaJuego = document.getElementById("area-juego");
    areaJuego.innerHTML = ""; 

    const titulo = document.createElement("h2");
    titulo.textContent = "";
    areaJuego.appendChild(titulo);

    const grid = document.createElement("div");
    grid.classList.add("grid-buscaminas");
    areaJuego.appendChild(grid);

    minas = [];
    tablero = new Array(size * size).fill(0);

    // colocar minas
    while (minas.length < totalMinas) {
        let pos = Math.floor(Math.random() * (size * size));
        if (!minas.includes(pos)) minas.push(pos);
    }

    
    minas.forEach(m => {
        tablero[m] = "M";

        let alrededor = [
            m-size-1, m-size, m-size+1,
            m-1,           m+1,
            m+size-1, m+size, m+size+1
        ];

        alrededor.forEach(a => {
            if (a >= 0 && a < size*size && tablero[a] !== "M") {
                tablero[a]++;
            }
        });
    });

    //creacion d las celdas
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell-b");
        cell.dataset.pos = i;

        cell.addEventListener("click", () => revelarCelda(i, cell));
        cell.addEventListener("contextmenu", e => {
            e.preventDefault();
            ponerBandera(i, cell);
        });

        grid.appendChild(cell);
    }
}

function ponerBandera(pos, celdaDOM) {
    if (celdaDOM.textContent === "") {
        celdaDOM.textContent = "🚩";
    } else if (celdaDOM.textContent === "🚩") {
        celdaDOM.textContent = "";
    }
}

function revelarCelda(pos, celdaDOM) {
    let valor = tablero[pos];
    if (celdaDOM.textContent === "🚩") return;

    if (valor === "M") {
        celdaDOM.style.background = "red";
        celdaDOM.textContent = "💣";
        alert("Explotaste 💥");
        cargarBuscaminas();
        return;
    }

    celdaDOM.textContent = valor === 0 ? "" : valor;
    celdaDOM.style.background = "#777";

    if (valor === 0) {
        let vecinos = [
            pos-size-1, pos-size, pos-size+1,
            pos-1,             pos+1,
            pos+size-1, pos+size, pos+size+1
        ];

        vecinos.forEach(v => {
            const c = document.querySelector(`[data-pos="${v}"]`);
            if (v >= 0 && v < size*size && c && c.textContent === "") {
                revelarCelda(v, c);
            }
        });
    }
}
