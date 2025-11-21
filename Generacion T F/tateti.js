const btnTateti = document.getElementById("btn-tateti");
const areaJuego = document.getElementById("area-juego");

btnTateti.addEventListener("click", () => {
    cargarTateti();
});

function cargarTateti() {
    areaJuego.innerHTML = `
        <h2>Tateti</h2>
        <div id="board" class="board">
            <div class="cell" data-pos="0"></div>
            <div class="cell" data-pos="1"></div>
            <div class="cell" data-pos="2"></div>
            <div class="cell" data-pos="3"></div>
            <div class="cell" data-pos="4"></div>
            <div class="cell" data-pos="5"></div>
            <div class="cell" data-pos="6"></div>
            <div class="cell" data-pos="7"></div>
            <div class="cell" data-pos="8"></div>
        </div>
    `;

    iniciarTateti();
}

function iniciarTateti() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.textContent === '') {
                cell.textContent = 'X';

                if (checkWin('X')) {
    alert("Papeaste a la ia ");
    resetBoard();
    return;
}
    
iaMove();

function iaMove() {
    const cells = document.querySelectorAll('.cell');
    const empty = [];

    cells.forEach(c => {
        if (c.textContent === '') {
            empty.push(c);
        }
    });

    if (empty.length === 0) return; // empateee

    const randomCell = empty[Math.floor(Math.random() * empty.length)];
    randomCell.textContent = 'O';

    if (checkWin('O')) {
        alert("Te gano la ia XDDDDDDDDDD");
        resetBoard();
    }
}

            }
        });
    });
}

function checkWin(player) {
    const cells = document.querySelectorAll('.cell');
    const b = Array.from(cells).map(cell => cell.textContent);

    const winLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return winLines.some(line =>
        line.every(i => b[i] === player)
    );
}

function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(c => c.textContent = '');
}