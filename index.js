const socket = io('http://localhost:3001', {
  withCredentials: true,
});


// declaration variable 
let roomId = false;
//
let dataTictactoe = {};
let user = {};

if(getCookie('roomId') === '') {
  roomId = makeid(8);
  user = {
    id: makeid(4)
  }
} else {

}

socket.on('playerAction', handlePlayerAction);

function initGame() {
  // user.symbol = 'x';
  
  // socket.emit('initGame', {
  //   roomId : roomId,
  //   user: user,
  // });

  // setCookie('roomId', roomId);
  // setCookie('user', user);

  // dom javascript
  document.getElementById('menu').classList.add('none');
  document.getElementById('game').classList.remove('none');
  const statiTitle = 'Code';
  const title = statiTitle + ' : ' + roomId;
  document.getElementById('title').innerText= title;
  
}

function boxClicked(component) {
  // socket.emit('hitBox', {
  //   user,
  //   roomId,
  //   id: component.id,
  // })

  // dom javascript
  component.innerHTML = "<img alt='' src='/assets/x-solid.svg'/>";

}

function handlePlayerAction(data) {
  dataTictactoe = data.dataTictactoe;
  dataArrayTictactoe = Object.entries(dataTictactoe);

  dataTictactoe.map(([id, symbol]) => {
    document.getElementById(id).innerHTML = "<img alt='' src='/assets/"+symbol+".svg'/>";
  })
}



