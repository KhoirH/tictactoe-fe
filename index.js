// socket io herokuapp
const socket = io('https://tictactoe-pi-master-qcumk3lqdx.herokuapp.com/', {
  withCredentials: true,
  origin: '*',
});


// declaration variable 
let roomId = makeid(8);
let dataTictactoe = {};
let user = {
  id: makeid(4)
};
let statusGame = false;
let activePlayUser = false;

socket.on('playerAction', handlePlayerAction);

function startGameDom() {

  // dom javascript
  document.getElementById('menu').classList.add('none');
  document.getElementById('game').classList.remove('none');
  const statiTitle = 'Code';
  const title = statiTitle + ' : ' + roomId;
  document.getElementById('title').innerText= title;

}

function initGame() {
  // socket init game
  user.symbol = 'x';
  
  socket.emit('initGame', {
    roomId : roomId,
    user: user,
  });
  startGameDom();

}

// join game
function joinGame(event) {
  event.preventDefault();
  const inputCodeVal = document.getElementById('input-code').value;
  roomId = inputCodeVal;
  if(inputCodeVal !== '') {
    user.symbol = 'o';
    socket.emit('joinGame', {
      roomId : inputCodeVal,
      user: user,
    }) 
    startGameDom();
  }
}

// click the player
function boxClicked(component) {

  if(statusGame === 'start' && activePlayUser === user.id) {
    // socket hitbox
    socket.emit('hitBox', {
      user: user,
      roomId: roomId,
      boxId: parseInt(component.id.split('box-').join('')),
    })
  }
}

// player play
function handlePlayerAction(data) {
  dataTictactoe = data.dataTictactoe;
  dataArrayTictactoe = Object.entries(dataTictactoe);
  statusGame = data.status;
  activePlayUser = data.activeUser;

  if(data.status === 'end') {
    if (data.winner === user.id) {
      alert('You are winner');
    } else {
      alert('You are looser');
    }
    window.location.reload();
  }
  //dom status
  document.getElementById('status-game').innerText= statusGame;
  // change color
  if(data.status === 'pending'){
    document.getElementById('status-game').setAttribute('style', 'color:red')
  } else {
    document.getElementById('status-game').setAttribute('style', 'color:green')
  }

  dataArrayTictactoe.map(([id, object]) => {
    document.getElementById('box-'+id).innerHTML = "<img alt='' class='"+object.symbol+"-style' src='https://kampusdraf.com/game/assets/"+object.symbol+"-solid.svg'/>";
  })
}



