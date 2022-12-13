const notification = document.querySelector('.notification'),
  s = ["", "", "", "", "", "", "", "", ""],
  w = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  ws = () => ` Ganador => ${jugador}!`,
  dm = () => ` Empate!`,
  ct = () => ` Turno => ${jugador}`


let Jugar = true,
  jugador = "O"



function main() {
  mensash(ct())
  listeners()
}

function listeners() {
  document.querySelector('.cubo-container').addEventListener('click', cubos)
  document.querySelector('.restablecer').addEventListener('click', Limpiar)
}

function mensash(message) {
  notification.innerHTML = message
}

function Limpiar() {
  Jugar = true
  jugador = "X"
  restartGameState()
  mensash(ct())
  document.querySelectorAll('.cubo').forEach(cell => cell.innerHTML = "")
}

function cubos(clickedCellEvent ) {
  const clickedCell = clickedCellEvent.target
  if (clickedCell.classList.contains('cubo')) {
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (s[clickedCellIndex] !== '' || !Jugar) {
      return false
    }

    cb(clickedCell, clickedCellIndex)
    validacion()
  }
}

function cb(clickedCell , clickedCellIndex) {
  s[clickedCellIndex] = jugador 
  clickedCell.innerHTML = jugador 
}

function validacion() {
  let perder = false
  for (let i = 0; i < w.length; i++) { 
    const wc = w[i] 
    let p1 = s[wc[0]],
      p2 = s[wc[1]],
      p3 = s[wc[2]] 

    if (p1 === '' || p2 === '' || p3 === '') {
      continue; 
    }
    if (p1 === p2 && p2 === p3) {
      perder = true 
      break
    }
  }

  if (perder) {
    mensash(ws())
    Jugar = false
    return
  }

  let circulo = !s.includes("") 
  if (circulo) {
    mensash(dm())
    Jugar = false
    return
  }

  cambio()
}

function cambio() {
  jugador = jugador === "X" ? "O" : "X"
  mensash(ct())
}

function restartGameState() {
  let i = s.length
  while (i--) {
    s[i] = ''
  }
}

main()