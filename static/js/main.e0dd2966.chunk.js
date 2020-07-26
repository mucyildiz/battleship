(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],[,,,,,,,,,function(t,e,a){t.exports=a(18)},,,,,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(8),s=a.n(i),o=(a(14),a(1)),c=a(2),u=a(4),l=a(3),h=(a(15),a(5)),p=a(6),m=function(t,e){var a=Array(e).fill(!1);return{getName:function(){return t},getLength:function(){return e},hitShip:function(t){a[t]=!0},isSunk:function(){return a.every((function(t){return t}))},isPlaced:!1}},d=(a(16),function(t){Object(u.a)(a,t);var e=Object(l.a)(a);function a(t){var n;Object(o.a)(this,a),n=e.call(this,t);var r=m("Carrier",5),i=m("Battleship",4),s=m("Destroyer",3),c=m("Submarine",3),u=m("Patrol Boat",2);return n.state={gameboard:new Array(10).fill(null).map((function(){return new Array(10).fill(null).map((function(){return{attacked:!1,ship:null,shipPosition:null,mock:!1}}))})),ships:[r,i,s,c,u],mockShips:[r,i,s,c,u],placedShips:[],gameover:!1,loser:!1,numPlacedShips:0},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.props.user||this.populateCPUGameboard()}},{key:"componentDidUpdate",value:function(t,e){var a=this;if(this.props.user)if(2===this.props.input.length){var n=this.mapLetterToNumber(this.props.input[0]),r=Number(this.props.input[1]);if(t.input!==this.props.input||t.vertical!==this.props.vertical)try{this.placeMockShip(this.state.mockShips[0],n,r,this.props.vertical)}catch(u){}}else t.input!==this.props.input&&this.clearMocks();if(this.props.user&&t.shipCoords!==this.props.shipCoords){var i=this.props.shipCoords[this.props.shipCoords.length-1];console.log(i);try{this.placeShip(this.state.ships[0],this.mapLetterToNumber(i[0]),i[1],this.props.vertical),this.setState((function(t){return{numPlacedShips:t.numPlacedShips+1}}),(function(){5===a.state.numPlacedShips&&a.props.ready()}))}catch(l){alert(l)}}if(this.props.user&&t.turn!==this.props.turn&&!this.props.turn&&!this.props.gameOver){for(var s=this.getRandomInt(10),o=this.getRandomInt(10);this.state.gameboard[s][o].attacked;)s=this.getRandomInt(10),o=this.getRandomInt(10);for(var c=!0;c;)try{this.handleAttack(s,o),c=!1}catch(h){}}}},{key:"isInteger",value:function(t){return/^\d+$/.test(t)}},{key:"mapLetterToNumber",value:function(t){if(this.isInteger(t))return Number(t);return"ABCDEFGHIJ".indexOf(t.toUpperCase())}},{key:"populateCPUGameboard",value:function(){for(var t=0;t<5;)try{var e=this.getRandomInt(10),a=this.getRandomInt(10),n=Math.random()>.5,r=this.state.ships[t];this.placeShip(r,e,a,n),t++}catch(i){}}},{key:"clearMocks",value:function(){var t,e=this.state.gameboard.slice(),a=Object(p.a)(e);try{for(a.s();!(t=a.n()).done;){var n,r=t.value,i=Object(p.a)(r);try{for(i.s();!(n=i.n()).done;){var s=n.value;s.ship&&s.mock&&(s.mock=!1,s.ship=null)}}catch(o){i.e(o)}finally{i.f()}}}catch(o){a.e(o)}finally{a.f()}this.setState({gameboard:e})}},{key:"placeMockShip",value:function(t,e,a){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.clearMocks();var r=this.state.gameboard.slice();if(n){if(n){if(e+t.getLength()>10)throw new Error("ship is out of bounds");for(var i=e;i<e+t.getLength();i++)if(null!==r[i][a].ship)throw new Error("Cannot overlap ships.");for(var s=e;s<e+t.getLength();s++)r[s][a].ship=t,r[s][a].mock=!0}}else{if(a+t.getLength()>10)throw new Error("ship is out of bounds");for(var o=a;o<a+t.getLength();o++)if(null!==r[e][o].ship)throw new Error("Cannot overlap ships.");for(var c=a;c<a+t.getLength();c++)r[e][c].ship=t,r[e][c].mock=!0}this.setState({gameboard:r})}},{key:"placeShip",value:function(t,e,a){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(console.log(e,a),e<0||e>9||a<0||a>9||isNaN(e)||isNaN(a))throw new Error("invalid coordinates");var r=this.state.gameboard.slice(),i=0;if(n){if(n){if(e+t.getLength()>10)throw new Error("ship is out of bounds");for(var s=e;s<e+t.getLength();s++)if(null!==r[s][a].ship)throw new Error("Cannot overlap ships.");for(var o=e;o<e+t.getLength();o++)null!==r[o][a].ship&&r[o][a].mock&&(r[o][a].mock=!1,r[o][a].ship=null),r[o][a].ship=t,r[o][a].shipPosition=i,t.isPlaced=!0,i++}}else{if(a+t.getLength()>10)throw new Error("ship is out of bounds");for(var c=a;c<a+t.getLength();c++)if(null!==r[e][c].ship&&!r[e][c].mock)throw new Error("Cannot overlap ships");for(var u=a;u<a+t.getLength();u++)null!==r[e][u].ship&&r[e][u].mock&&(r[e][u].mock=!1,r[e][u].ship=null),r[e][u].ship=t,r[e][u].shipPosition=i,t.isPlaced=!0,i++}this.setState({gameboard:r}),this.setState((function(e){return{ships:e.ships.filter((function(e){return t!==e})),placedShips:e.placedShips.concat([t]),mockShips:e.mockShips.filter((function(e){return t!==e}))}}))}},{key:"handleAttack",value:function(t,e){if(this.props.gameStarted&&!this.props.gameOver){var a=this.state.gameboard.slice();a[t][e].attacked||(!1===a[t][e].attacked&&(null!==a[t][e].ship&&(a[t][e].ship.hitShip(a[t][e].shipPosition),this.checkAllShipsSunk()),a[t][e].attacked=!0),this.setState({gameboard:a}),this.props.changeTurn())}}},{key:"checkAllShipsSunk",value:function(){var t=this.state.placedShips.every((function(t){return t.isSunk()}));t&&this.props.endGame(),this.setState({gameover:t,loser:t})}},{key:"getRandomInt",value:function(t){return Math.floor(Math.random()*Math.floor(t))}},{key:"changeTurn",value:function(){this.setState({turn:!this.state.turn})}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{id:"container"},r.a.createElement("div",{id:"player-container"},this.state.turn?r.a.createElement("div",null,"Turn"):null),r.a.createElement("div",{id:"board-container"},r.a.createElement("div",{id:"gameboard-container",style:{border:this.props.gameOver&&this.state.loser?"4px solid red":this.props.gameOver&&!this.state.loser?"4px solid forestgreen":null}},this.state.gameboard.map((function(e,a){return r.a.createElement("div",{key:a,className:"row"},e.map((function(e,n){return r.a.createElement(v,{key:a+n,className:"cell",attacked:e.attacked,ship:e.ship,mock:e.mock,shipPosition:e.shipPosition,user:t.props.user,onclick:function(){return t.handleAttack(a,n)}})})))})))))}}]),a}(n.Component)),v=function(t){Object(u.a)(a,t);var e=Object(l.a)(a);function a(){return Object(o.a)(this,a),e.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return this.props.attacked&&!this.props.ship?r.a.createElement("div",{className:"missed cell"}):this.props.attacked&&this.props.ship?r.a.createElement("div",{className:"hit cell"}):this.props.ship&&this.props.user?this.props.mock?r.a.createElement("div",{className:"mock cell"}):r.a.createElement("div",{className:"ship cell"}):r.a.createElement("div",{onClick:this.props.user?null:this.props.onclick,className:"cell"})}}]),a}(n.Component),f=(a(17),function(t){Object(u.a)(a,t);var e=Object(l.a)(a);function a(t){var n;return Object(o.a)(this,a),(n=e.call(this,t)).state={turn:!0,gameStarted:!1,input:"",addedShipCoordinates:[],buttonValue:"Add ship",gameOver:!1,gameReadyToStart:!1,vertical:!1},n.updateInput=n.updateInput.bind(Object(h.a)(n)),n.handleInput=n.handleInput.bind(Object(h.a)(n)),n}return Object(c.a)(a,[{key:"toggleOrientation",value:function(){this.setState((function(t){return{vertical:!t.vertical}}))}},{key:"startGame",value:function(){this.setState({gameStarted:!0})}},{key:"endGame",value:function(){this.setState({gameOver:!0,gameStarted:!1,newGameStarted:!1})}},{key:"changeTurn",value:function(){this.setState({turn:!this.state.turn})}},{key:"handleInput",value:function(t){var e=this;console.log("butt"),t.preventDefault(),t.stopPropagation(),""!==this.state.input&&2===this.state.input.length&&this.setState((function(t){return{addedShipCoordinates:t.addedShipCoordinates.concat([[e.state.input[0],Number(e.state.input[1])]]),input:""}}))}},{key:"updateInput",value:function(t){var e=t.target.value;this.setState({input:e})}},{key:"changeButtonValue",value:function(t){this.setState({buttonValue:t})}},{key:"readyToStartGame",value:function(){this.setState({gameReadyToStart:!0})}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{id:"main-container"},r.a.createElement(g,{isGameOver:this.state.gameOver}),r.a.createElement("div",{id:"title"},r.a.createElement("h1",null,"Battleship")),this.state.gameOver?r.a.createElement("form",null,r.a.createElement("div",{id:"btn-container"},r.a.createElement("input",{className:"start btn",type:"submit",value:"Restart"}))):null,this.state.gameStarted||!this.state.gameReadyToStart||this.state.gameOver?null:r.a.createElement("div",{id:"btn-container"},r.a.createElement("button",{onClick:function(){return t.startGame()},className:"start btn"},"Start Game")),r.a.createElement("div",{id:"gameboards"},r.a.createElement("div",{id:"user"},r.a.createElement(d,{user:!0,turn:this.state.turn,changeTurn:function(){return t.changeTurn()},gameStarted:this.state.gameStarted,input:this.state.input,shipCoords:this.state.addedShipCoordinates,startGame:function(){return t.startGame()},gameOver:this.state.gameOver,endGame:function(){return t.endGame()},ready:function(){return t.readyToStartGame()},vertical:this.state.vertical}),this.state.gameReadyToStart?null:r.a.createElement("div",{id:"user-place-ship-form"},r.a.createElement("form",{onSubmit:this.handleInput,id:"form"},r.a.createElement("div",{id:"instruction"},"Input coordinate e.g. 'A5'"),r.a.createElement("div",{id:"input-container"},r.a.createElement("input",{id:"coordinates",type:"text",value:this.state.input,onChange:this.updateInput,maxLength:2})),r.a.createElement("input",{type:"button",onClick:function(){return t.toggleOrientation()},value:this.state.vertical?"Make Horizontal":"Make Vertical",className:"orientation btn"}),r.a.createElement("input",{type:"submit",value:this.state.buttonValue,className:"placeShip btn"})))),r.a.createElement(d,{user:!1,turn:!this.state.turn,changeTurn:function(){return t.changeTurn()},gameStarted:this.state.gameStarted,gameOver:this.state.gameOver,endGame:function(){return t.endGame()}})))}}]),a}(n.Component)),g=function(t){Object(u.a)(a,t);var e=Object(l.a)(a);function a(){return Object(o.a)(this,a),e.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return this.props.isGameOver?r.a.createElement("div",{id:"game-over"},r.a.createElement("h1",null,"Game Over")):null}}]),a}(n.Component),k=function(t){Object(u.a)(a,t);var e=Object(l.a)(a);function a(){return Object(o.a)(this,a),e.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f,{playerOne:new d({}),playerTwo:new d({})}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.e0dd2966.chunk.js.map