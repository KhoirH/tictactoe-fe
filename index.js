const socket = io('http://localhost:3001', {
  withCredentials: true,
});


// declaration variable 
let roomId = false;
//
let dataTictactoe = {};
let user = {};
let statusGame = false;
let activePlayUser = false;

if(getCookie('roomId') === '') {
  roomId = makeid(8);
  user = {
    id: makeid(4)
  }
} else {

}

socket.on('playerAction', handlePlayerAction);

function startGameDom() {
  // setCookie('roomId', roomId);
  // setCookie('user', user);

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

function joinGame(event, component) {
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
    document.getElementById('box-'+id).innerHTML = "<img alt='' src='/assets/"+object.symbol+"-solid.svg'/>";
  })
}



