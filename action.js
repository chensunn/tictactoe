//MYAPP initial var
var MYAPP = MYAPP || {
	gameInPlay: false,
	winCombos: [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	],
	playerOneScore: 0,
	playerTwoScore: 0,
	timeOuts: [],
	initializeVars: function () {
		this.numFilledIn = 0;
		this.currentBoard = {
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
			6: '',
			7: '',
			8: '',
			9: ''
		};
	},
  initializeGame: function () {
    MYAPP.initializeVars();
    MYAPP.display.drawBoard();
    $('.game-choice button').click(function () {
    	MYAPP.secondPlyaer = MYAPP.game.gameSelection(this);
    	MYAPP.display.hideGameChoice();
    	MYAPP.display.showGameStarter(MYAPP.secondPlyaer);
    	$('.game-starter .choose-x, .game-starter .choose-o').off().click(MYAPP.game.firstGame);
    	$('.back-button').on('click', function () {
    		MYAPP.display.hideGameStarter();
    		MYAPP.display.showGameChoice();
    	});
    });
    $('hard-reset').on('click', MYAPP.game.resetGame);
  }
};

//Display function
MYAPP.display = {
	drawBoard: function () {
		MYAPP.timeOuts.push(setTimeout(function () {
			var c = document.getElementById('myCanvas');
			var canvas = c.getContext('2d');
			canvas.lineWidth = 1;
			canvas.strokeStyle = "#222";
			//vertical lines
			canvas.beginPath();
			canvas.moveTo(100, 0);
			canvas.lineTo(100, 146.5);
			canvas.closePath();
			canvas.stroke();
			canvas.beginPath();
			canvas.moveTo(200, 0);
			canvas.lineTo(200, 146.5);
			canvas.closePath();
			canvas.stroke();
			//horizontal lines
			canvas.lineWidth = .5;
			canvas.beginPath();
			canvas.moveTo(4, 48.5);
			canvas.lineTo(296, 48.5);
			canvas.closePath();
			canvas.stroke();
			canvas.beginPath();
			canvas.moveTo(4, 98.5);
			canvas.lineTo(296, 98.5);
			canvas.closePath();
			canvas.stroke();
		}, 1500));
	},
	hideGameChoice: function () {
		$('.game-choice').fadeOut(600);
	},
	showGameStarter: function (isTwoPlayer) {
		var message;
		if (isTwoPlayer) {
			message = "Player 1: Would you like X or O?";
		} else {
			message = "Would you like X or O?";
		}
		MYAPP.timeOuts.push(setTimeout(function () {
			$('.game-starter').fadeIn(500).children('p').text(message);
		}, 700));
	},
	hideGameStarter: function () {
		$('.game-starter').fadeOut();
	},
	showScore: function () {
		if (MYAPP.secondPlyaer) {
			$('.score-1').children('.name').text('player 1');
			$('.score-2').children('.name').text('player 2');
		} else {
			$('.score-1').children('.name').text('player 1');
			$('.score-2').children('.name').text('computer');
		}
		$('.score-1, .score-2').children('.points').text('0');
		$('.score-1, .score-2, .points-divider').fadeIn();
	},
	resetSquares: function () {
		$('.boxes').html('');
		for (var i = 1; i <= 9; i++) {
			var box = '<li class="' + i + '"><i class="letter"><span></span><i></i>';
			$(box).appendTo($('.boxes'));
		}
	},
	showWinMessage: function () {
		MYAPP.timeOuts.push(setTimeout(function () {
			$('.win-message').fadeIn(500).children('p').text('Player' + MYAPP.turn + 'wins!! :D');
		}, 1500));
	},
	showLoseMessage: function () {
		MYAPP.timeOuts.push(setTimeout(function () {
			$('.lose-message').fadeIn(500);
		}, 1500));
	},
	hidePlayerOnePrompt: function () {
		$('.player-one-turn').animate({'top':'0'}, 500);
	},
	hidePlayerTwoPrompt: function () {
		$('.player-two-turn').animate({'top':'0'}, 500);
	},
	hideDrawMessage: function () {
		$('.draw-message').fadeOut(1000);
	},
	hideLoseMessage: function () {
		$('.lose-message').fadeOut(1000);
	},
	hideWinMessage: function () {
		$('.win-message').fadeOut(1000);
	},
	showDrawMessage: function () {
		MYAPP.timeOuts.push(setTimeout(function () {
			$('.draw-message').fadeIn(500);
		}, 1500));
	},
	showPlayerOnePrompt: function () {
		if (MYAPP.secondPlyaer) {
			$('.player-one-turn p').text('Go Player 1!');
		} else {
			$('.player-one-turn p').text('Your turn!');
		}
		$('.player-one-turn').animate({'top':'-45px'}, 500);
	},
	showPlayerTwoPrompt: function () {
		if (MYAPP.secondPlyaer) {
			$('.player-two-turn p').text('Go Player 2!');
		} else {
			$('.player-two-turn p').text('Computer\'s turn');
		}
		$('.player-two-turn').animate({'top':'-45px'}, 500);
	},
	showGameChoice: function () {
		$('.game-choice').fadeIn(600);
	}
};

//Game logic
MYAPP.game = {
	gameSelection: function (item) {
		if($(item).text() === 'One Player') {
			return false;
		} else {
			return true;
		}
	},
	firstGame: function () {
		MYAPP.playerOneSymbol = $(this).text();
		MYAPP.playerTwoSymbol = MYAPP.playerOneSymbol == 'X' ? 'O' : 'X';
		MYAPP.turn = MYAPP.game.whoStarts();
		MYAPP.display.hideGameStarter();
		$('#myCanvas').animate({'opacity':'1'}, 1200);
		$('.hard-reset').fadeIn(600);
		MYAPP.display.showScore();
		MYAPP.display.resetSquares();
		MYAPP.game.play();
	},
	whoStarts: function () {
		var random = Math.floor(Math.random() * 2 + 1);
		return random;
	},
	play: function () {
		MYAPP.gameInPlay = true;
		$('.boxes li').on('click', function () {
			MYAPP.game.playerTurn(this);
		});
		MYAPP.timeOuts.push(setTimeout(function () {
			if (MYAPP.turn === 1) {
				MYAPP.display.showPlayerOnePrompt();
			} else if (MYAPP.turn === 2) {
				MYAPP.display.showPlayerTwoPrompt();
			}
		}, 1500), setTimeout(function () {
			if (MYAPP.turn === 2 && !MYAPP.secondPlyaer) {
				MYAPP.game.computerPlay();
			}
		}, 1200));
	},
	playerTurn: function (square) {
		var symbol = MYAPP.turn === 1 ? MYAPP.playerOneSymbol : MYAPP.playerTwoSymbol;
		var box = $(square).children('i').children('span');
		if (box.text() == '' && MYAPP.gameInPlay && (MYAPP.turn === 1 || (MYAPP.turn === 2 && MYAPP.secondPlyaer))) {
			box.text(symbol);
			var number = $(square).attr('class');
			MYAPP.game.updateSquare(number, symbol);
			MYAPP.game.endTurn(symbol);
		}
	},
	updateSquare: function (number, symbol) {
		MYAPP.currentBoard[number] = symbol;
	},
	endTurn: function (symbol) {
		MYAPP.numFilledIn = MYAPP.numFilledIn + 1;
		if (MYAPP.gameInPlay) {
			if (MYAPP.game.checkWin(symbol)[0]) {
				MYAPP.game.updateScore(MYAPP.turn);
				if (MYAPP.secondPlyaer) {
					MYAPP.display.showWinMessage();
				} else {
					MYAPP.turn === 1 ? MYAPP.display.showWinMessage() : MYAPP.display.showLoseMessage();
				}
				MYAPP.gameInPlay = false;
				MYAPP.game.showWinningCombination();
				MYAPP.display.hidePlayerOnePrompt();
				MYAPP.display.hidePlayerTwoPrompt();
				MYAPP.game.reset();
			} else if (MYAPP.numFilledIn >= 9) {
				MYAPP.gameInPlay = false;
				MYAPP.display.hidePlayerOnePrompt();
				MYAPP.display.hidePlayerTwoPrompt();
				MYAPP.display.showDrawMessage();
				MYAPP.turn = MYAPP.game.whoStarts();
				MYAPP.game.reset();
			} else {
				if (MYAPP.turn === 1) {
					MYAPP.display.hidePlayerOnePrompt();
					MYAPP.display.showPlayerTwoPrompt();
					MYAPP.turn = 2;
					if (!MYAPP.secondPlyaer) {
						MYAPP.game.computerPlay();
					}
				} else if (MYAPP.turn === 2) {
					MYAPP.display.showPlayerOnePrompt();
					MYAPP.display.hidePlayerTwoPrompt();
					MYAPP.turn = 1;
				}
			}
		}
	},
	checkWin: function (symbol) {
		var currentBoard = MYAPP.currentBoard;
		var wins = MYAPP.winCombos;
		var winningCombo = [];
		var winner = wins.some(function (combination) {
			var winning = true;
			for (var i = 0; i < combination.length; i++) {
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
	updateScore: function (turn) {
		var currentScore = turn === 1 ? MYAPP.playerOneScore : MYAPP.playerTwoScore;
		$('.score-' + turn).children('.points').text(currentScore);
	},
	showWinningCombination: function () {
		var symbol = MYAPP.turn === 1 ? MYAPP.playerOneSymbol : MYAPP.playerTwoSymbol;
		var combo = MYAPP.game.checkWin(symbol)[1];
		for (var i = 0; i < combo.length; i++) {
			var currentBox = '.' + combo[i];
			$(currentBox).children('i').addClass('win').children('span').addClass('rotate');
		}
	},
	reset: function () {
		MYAPP.initializeVars();
		MYAPP.timeOuts.push(setTimeout(function () {
			MYAPP.display.hideDrawMessage();
			MYAPP.display.hideLoseMessage();
			MYAPP.display.hideWinMessage();
			$('.boxes li').fadeOut();
		}, 5000),
		setTimeout(function () {
			MYAPP.display.resetSquares();
			$('.boxes li').fadeIn();
			MYAPP.numFilledIn = 0;
		}, 6000),
		setTimeout(function () {
			MYAPP.gameInPlay = true;
			MYAPP.game.play();
		}, 6000));
	},
	computerPlay: function () {
		var computer = MYAPP.computer;
		var boxNumber;
		//com
	},
	resetGame: function () {
		$('#myCanvas').css('opacity', '0');
		$('.hard-reset').fadeOut();
		$('.points-divider, .score-1, .score-2').fadeOut();
		MYAPP.playerOneScore = 0;
		MYAPP.playerTwoScore = 0;
		MYAPP.display.resetSquares();
		MYAPP.initializeVars;
		MYAPP.gameInPlay = false;
		MYAPP.playerOneSymbol = null;
		MYAPP.playerTwoSymbol = null;
		MYAPP.timeOuts.forEach(function (timer) {
			clearTimeout(timer);
		});
		$('.draw-message, .win-message, .lose-message').hide();
		MYAPP.display.hidePlayerOnePrompt();
		MYAPP.display.hidePlayerTwoPrompt();
		MYAPP.display.showGameChoice();
	}
};

//Computer move decision
MYAPP.computer = {

};

//Game initialzation
$(document).ready(function () {
  MYAPP.initializeGame();
});