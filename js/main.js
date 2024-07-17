var state = 'press-key';
var sequence = [];
var player = "";
var level = 0;
var score = 0;
var indexPlayerSequence = 0;

// Variables para referenciar elementos del DOM
var title = document.getElementById('title');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');
var button = [red, green, blue, yellow];

// Botones y modal
var startButton = document.getElementById('startButton');
var restartButton = document.getElementById('restartButton');
var exitButton = document.getElementById('exitButton');
var modal = document.getElementById('myModal');

// Event listeners para botones y clicks de color
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
exitButton.addEventListener('click', exitGame);
red.addEventListener('click', buttonPress);
green.addEventListener('click', buttonPress);
blue.addEventListener('click', buttonPress);
yellow.addEventListener('click', buttonPress);

// Ocultar botones de reinicio y salida al inicio
restartButton.style.display = 'none';
exitButton.style.display = 'none';

// Función que inicia el juego, valida el nombre del jugador
function startGame() {
    if(state === 'press-key' || state === 'gameover') {
        var player = document.getElementById('name').value.trim();
        if (player.length >= 3) {
            document.getElementById('alert').innerText = '';
            document.getElementById('name').style.display = 'none';
            newLevel();
            sequence = [];
            level = 0;
            indexPlayerSequence = 0;   
            score = 0;
            document.getElementById('user').innerText = 'Player: ' + player;
        } else {
            document.getElementById('alert').innerText = 'El nombre debe tener al menos 3 letras';
        }
    }
}

// Función que avanza al siguiente nivel del juego
function newLevel() {
    startButton.style.display = "none";
    state = 'waiting-sequence';
    setTimeout(() => {
        level = level + 1;
        var nextColor = Math.floor(Math.random() *4);
        var nextButton = button[nextColor];

        sequence.push(nextButton);

        sequence.forEach((color, index) => {
            const button = document.getElementById(color.id);
            const previousColorAwait = 1000 + index * 500;
            setTimeout(( ) => {
                lightButton(button);
            }, previousColorAwait);
        });

        console.log(sequence);

        indexPlayerSequence = 0;

        state = 'waiting-player';
        document.getElementById('level').innerText = 'Level: ' + level;
        document.getElementById('score').innerText = 'Score: ' + score;        
    }, 1500);
}

// Función para iluminar un botón
function lightButton(button) {
        button.classList.add('active');
        setTimeout(() => { 
            button.classList.remove('active');
        }, 300);
}

// Función que maneja el click en los botones de color
function buttonPress(event) {
    if(state === 'waiting-player') {
        var button = event.target;
        if(button === sequence[indexPlayerSequence]) {
            indexPlayerSequence = indexPlayerSequence + 1;
            score = score + 5;
            lightButton(button);
            if(indexPlayerSequence === sequence.length) {
                newLevel();
            }   
        } else {
            gameOver();
        }
    }
}

// Función que maneja el fin del juego
function gameOver() {
    state = 'gameover';
    restartButton.style.display = 'block';
    exitButton.style.display = 'block';
    modal.style.display = 'block';
}

// Función para reiniciar el juego
function restartGame() {
    restartButton.style.display = 'none';
    exitButton.style.display = 'none';
    modal.style.display = 'none';
    startGame();
}

// Función para salir del juego y redirigir a index.html
function exitGame() {
    window.location.href = 'index.html';
}
