
const socket = io('http://localhost:3001', {
  withCredentials: true,
});

let dataTictactoe = {};
let roomId = false;
let user = {};

socket.on('playerAction', handlePlayerAction);

function boxClicked(component) {
  socket.emit('hitBox', {
    user,
    roomId,
    id: component.id,
  })
}

function handlePlayerAction(data) {
  dataTictactoe = data.dataTictactoe;
  dataArrayTictactoe = Object.entries(dataTictactoe);

  dataTictactoe.map(([id, symbol]) => {
    document.getElementById(id).innerHTML = "<img alt='' src='/assets/"+symbol+".svg'/>";
  })
  
}



// RandomClient
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
       charactersLength));
   }
   return result;
}


