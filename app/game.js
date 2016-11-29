var game = {
	inGame: false,
	winCombos: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	],

	start: function () {
		var buttons = document.querySelectorAll('button');
		buttons.forEach( function(element) {
			element.addEventListener('click', function(event){
				var gameStarter = document.querySelector('.gameStarter');
				game.playerOneSymbol = element.innerText;
				game.playerTwoSymbol = game.playerOneSymbol === 'X' ? 'O' : 'X';
				gameStarter.style.marginTop = '-160px';
				game.inGame = true;
				game.init();
				game.play();
			});
		});
	},

	init: function () {
		this.currentBoard = {
			0: '',
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
			6: '',
			7: '',
			8: ''
		};
		this.numFilledIn = 0;
		this.turn = 1;	//1代表playerOne的回合，2时playerTwo的回合
	},

	play: function () {
		var squares = document.querySelectorAll('td');
		squares.forEach( function(element) {
			element.addEventListener('click', function (event) {
				var span = document.createElement('span');
				if (game.turn === 1 && game.currentBoard[element.id] === '') {
					span.innerHTML = game.playerOneSymbol;
					element.appendChild(span);
					game.currentBoard[element.id] = game.playerOneSymbol;
					game.turn += 1;
					game.endTurn(game.playerOneSymbol);
				} else if (game.turn === 2 && game.currentBoard[element.id] === '') {
					span.innerHTML = game.playerTwoSymbol;
					element.appendChild(span);
					game.currentBoard[element.id] = game.playerTwoSymbol;
					game.turn -= 1;
					game.endTurn(game.playerTwoSymbol);
				}
			});
		});
	},

	endTurn: function (symbol) {
		this.numFilledIn += 1;
		if (this.checkWin(symbol)[0]) {
			var winner = symbol === this.playerOneSymbol ? 'playerOne' : 'playerTwo';
			var winMsg = document.getElementById(winner);
			winMsg.style.marginTop = '80px';
			setTimeout(function () {
				game.reset();
				winMsg.style.marginTop = '0px';
				var gameStarter = document.querySelector('.gameStarter');
				gameStarter.style.marginTop = '-80px';
				game.start();
			}, 1500);
		} else if (this.numFilledIn === 9) {
			var drawMsg = document.querySelector('.draw');
			drawMsg.style.marginTop = '80px';
			setTimeout(function () {
				game.reset();
				drawMsg.style.marginTop = '0px';
				var gameStarter = document.querySelector('.gameStarter');
				gameStarter.style.marginTop = '-80px';
				game.start();
			}, 1500);
		}
	},

	checkWin: function (symbol) {
		var currentBoard = game.currentBoard;
		var wins = game.winCombos;
		var winningCombo = [];
		var winner = wins.some(function (combination) {
			var winning = true;
			for(var i = 0; i < combination.length; i++) {
				if (currentBoard[combination[i]] !== symbol) {
					winning = false;
				}
			}
			if (winning) {
				winningCombo = combination;
			}
			return winning;
		});
		return [winner, winningCombo];
	},

	reset: function () {
		this.inGame = false;
		var squares = document.querySelectorAll('.gameCell');
		for (var i = 0; i < 9; i++){
			if (squares[i].hasChildNodes()) {
				squares[i].removeChild(squares[i].childNodes[0]);
			}
		}
	}
};
game.start();