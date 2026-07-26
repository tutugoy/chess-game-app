let main = {

  variables: {
    turn: 'w',
    selectedpiece: '',
    highlighted: [],
    gameState: 'normal',
    moveList: [],
    
    enPassantTarget: null, 
    positionHistory: [], 
    halfMoveClock: 0, 
    
    audioContext: null,
    
    // CPU/Stockfish variables
    gameMode: 'pvp', // 'pvp', 'pvc', 'cvp'
    cpuDifficulty: 20,
    stockfish: null,
    isCpuThinking: false,
    cpuColor: null,
    
    // Board flip state
    boardFlipped: false,
    
    // Chess clock variables
    whiteTime: 600000, // 10 minutes in milliseconds
    blackTime: 600000, // 10 minutes in milliseconds
    clockInterval: null,
    clockRunning: false,
    
    // Castling rights
    whiteKingMoved: false,
    blackKingMoved: false,
    whiteRookA_Moved: false,
    whiteRookH_Moved: false,
    blackRookA_Moved: false,
    blackRookH_Moved: false,
    
    // Move tracking
    fullMoveNumber: 1,
    lastMove: null,
    
    // Promotion state
    promotionPending: false,
    promotionSquare: null,
    promotionColor: null,
    
    // Captured pieces tracking
    capturedPieces: { w: [], b: [] },
    
    pieces: {
      w_king: {
        position: '5_1',
        img: '&#9812;',
        captured: false,
        moved: false,
        type: 'w_king'
        
      },
      w_queen: {
        position: '4_1',
        img: '&#9813;',
        captured: false,
        moved: false,
        type: 'w_queen'
      },
      w_bishop1: {
        position: '3_1',
        img: '&#9815;',
        captured: false,
        moved: false,
        type: 'w_bishop'
      },
      w_bishop2: {
        position: '6_1',
        img: '&#9815;',
        captured: false,
        moved: false,
        type: 'w_bishop'
      },
      w_knight1: {
        position: '2_1',
        img: '&#9816;',
        captured: false,
        moved: false,
        type: 'w_knight'
      },
      w_knight2: {
        position: '7_1',
        img: '&#9816;',
        captured: false,
        moved: false,
        type: 'w_knight'
      },
      w_rook1: {
        position: '1_1',
        img: '&#9814;',
        captured: false,
        moved: false,
        type: 'w_rook'
      },
      w_rook2: {
        position: '8_1',
        img: '&#9814;',
        captured: false,
        moved: false,
        type: 'w_rook'
      },
      w_pawn1: {
        position: '1_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn2: {
        position: '2_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn3: {
        position: '3_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn4: {
        position: '4_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn5: {
        position: '5_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn6: {
        position: '6_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn7: {
        position: '7_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn8: {
        position: '8_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },

      b_king: {
        position: '5_8',
        img: '&#9818;',
        captured: false,
        moved: false,
        type: 'b_king'
      },
      b_queen: {
        position: '4_8',
        img: '&#9819;',
        captured: false,
        moved: false,
        type: 'b_queen'
      },
      b_bishop1: {
        position: '3_8',
        img: '&#9821;',
        captured: false,
        moved: false,
        type: 'b_bishop'
      },
      b_bishop2: {
        position: '6_8',
        img: '&#9821;',
        captured: false,
        moved: false,
        type: 'b_bishop'
      },
      b_knight1: {
        position: '2_8',
        img: '&#9822;',
        captured: false,
        moved: false,
        type: 'b_knight'
      },
      b_knight2: {
        position: '7_8',
        img: '&#9822;',
        captured: false,
        moved: false,
        type: 'b_knight'
      },
      b_rook1: {
        position: '1_8',
        img: '&#9820;',
        captured: false,
        moved: false,
        type: 'b_rook'
      },
      b_rook2: {
        position: '8_8',
        img: '&#9820;',
        captured: false,
        moved: false,
        type: 'b_rook'
      },
      b_pawn1: {
        position: '1_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn2: {
        position: '2_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn3: {
        position: '3_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn4: {
        position: '4_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn5: {
        position: '5_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn6: {
        position: '6_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn7: {
        position: '7_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn8: {
        position: '8_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      }

    }
  },

  methods: {
    gamesetup: function() {
      
      if (!main.variables.audioContext) {
        main.variables.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      main.methods.initStockfish();
      
      // Try to load saved game from localStorage
      main.methods.loadFromLocalStorage();
      
      main.variables.gameMode = $('#game-mode').val() || 'pvp';
      main.variables.cpuDifficulty = parseInt($('#cpu-difficulty').val()) || 20;
      
      if (main.variables.gameMode === 'pvc') {
        main.variables.cpuColor = 'b';
      } else if (main.variables.gameMode === 'cvp') {
        main.variables.cpuColor = 'w';
      } else {
        main.variables.cpuColor = null;
      }
      
      $('.gamecell').attr('chess', 'null');
      for (let gamepiece in main.variables.pieces) {
        let displayPos = main.methods.getDisplayPosition(main.variables.pieces[gamepiece].position);
        $('#' + displayPos).html(main.variables.pieces[gamepiece].img);
        $('#' + displayPos).attr('chess', gamepiece);
      }
      
      if (main.variables.cpuColor === 'w') {
        setTimeout(() => main.methods.triggerCpuMove(), 500);
      }
      
      main.methods.updateBoardLabels();
      main.methods.updateCapturedPieces();
      
      // Start clock for PvP games
      if (main.variables.gameMode === 'pvp') {
        main.methods.startClock();
      }
    },

    // LocalStorage save/load methods
    saveToLocalStorage: function() {
      const gameState = {
        variables: {
          pieces: main.variables.pieces,
          turn: main.variables.turn,
          moveList: main.variables.moveList,
          capturedPieces: main.variables.capturedPieces,
          gameMode: main.variables.gameMode,
          cpuDifficulty: main.variables.cpuDifficulty,
          gameState: main.variables.gameState,
          whiteKingMoved: main.variables.whiteKingMoved,
          blackKingMoved: main.variables.blackKingMoved,
          whiteRookA_Moved: main.variables.whiteRookA_Moved,
          whiteRookH_Moved: main.variables.whiteRookH_Moved,
          blackRookA_Moved: main.variables.blackRookA_Moved,
          blackRookH_Moved: main.variables.blackRookH_Moved,
          enPassantTarget: main.variables.enPassantTarget,
          halfMoveClock: main.variables.halfMoveClock,
          fullMoveNumber: main.variables.fullMoveNumber,
          whiteTime: main.variables.whiteTime,
          blackTime: main.variables.blackTime,
          clockRunning: main.variables.clockRunning,
          boardFlipped: main.variables.boardFlipped,
          lastMove: main.variables.lastMove,
          promotionPending: main.variables.promotionPending,
          promotionSquare: main.variables.promotionSquare,
          promotionColor: main.variables.promotionColor
        },
        timestamp: new Date().toISOString()
      };
      
      try {
        localStorage.setItem('chessGameSave', JSON.stringify(gameState));
      } catch (e) {
        console.warn('Failed to save game to localStorage:', e);
      }
    },

    loadFromLocalStorage: function() {
      try {
        const saved = localStorage.getItem('chessGameSave');
        if (saved) {
          const gameState = JSON.parse(saved);
          
          // Restore all variables
          main.variables.pieces = gameState.variables.pieces;
          main.variables.turn = gameState.variables.turn;
          main.variables.moveList = gameState.variables.moveList;
          main.variables.capturedPieces = gameState.variables.capturedPieces;
          main.variables.gameMode = gameState.variables.gameMode;
          main.variables.cpuDifficulty = gameState.variables.cpuDifficulty;
          main.variables.gameState = gameState.variables.gameState;
          main.variables.whiteKingMoved = gameState.variables.whiteKingMoved;
          main.variables.blackKingMoved = gameState.variables.blackKingMoved;
          main.variables.whiteRookA_Moved = gameState.variables.whiteRookA_Moved;
          main.variables.whiteRookH_Moved = gameState.variables.whiteRookH_Moved;
          main.variables.blackRookA_Moved = gameState.variables.blackRookA_Moved;
          main.variables.blackRookH_Moved = gameState.variables.blackRookH_Moved;
          main.variables.enPassantTarget = gameState.variables.enPassantTarget;
          main.variables.halfMoveClock = gameState.variables.halfMoveClock;
          main.variables.fullMoveNumber = gameState.variables.fullMoveNumber;
          main.variables.whiteTime = gameState.variables.whiteTime;
          main.variables.blackTime = gameState.variables.blackTime;
          main.variables.clockRunning = gameState.variables.clockRunning;
          main.variables.boardFlipped = gameState.variables.boardFlipped;
          main.variables.lastMove = gameState.variables.lastMove;
          main.variables.promotionPending = gameState.variables.promotionPending;
          main.variables.promotionSquare = gameState.variables.promotionSquare;
          main.variables.promotionColor = gameState.variables.promotionColor;
          
          console.log('Game loaded from localStorage');
          
          // Re-render the board and update UI
          main.methods.renderBoard();
          main.methods.updateBoardLabels();
          main.methods.updateMoveListDisplay();
          main.methods.updateCapturedPieces();
          main.methods.updateClockDisplay();
          main.methods.updateClockActive();
          
          // Update turn display
          $('#turn-display').html("It's " + (main.variables.turn === 'w' ? "White's" : "Black's") + " Turn");
          $('#resign-btn').html('Resign (' + (main.variables.turn === 'w' ? 'White' : 'Black') + ')');
          
          // Update game status
          if (main.variables.gameState === 'check') {
            $('#status-display').html((main.variables.turn === 'w' ? 'WHITE' : 'BLACK') + ' IS IN CHECK').removeClass().addClass('check');
          } else if (main.variables.gameState === 'checkmate') {
            $('#status-display').html((main.variables.turn === 'w' ? 'WHITE' : 'BLACK') + ' IS CHECKMATED - ' + (main.variables.turn === 'w' ? 'BLACK' : 'WHITE') + ' WINS').removeClass().addClass('checkmate');
          } else if (main.variables.gameState === 'stalemate') {
            $('#status-display').html('STALEMATE - DRAW').removeClass().addClass('stalemate');
          } else if (main.variables.gameState === 'draw') {
            $('#status-display').html('DRAW BY INSUFFICIENT MATERIAL').removeClass().addClass('stalemate');
          } else {
            $('#status-display').html('').removeClass();
          }
          
          // Update takeback button
          $('#takeback-btn').prop('disabled', main.variables.moveList.length < 1);
          
          // Restart clock if needed
          if (main.variables.clockRunning && main.variables.gameMode === 'pvp') {
            main.methods.startClock();
          }
          
          // Trigger CPU move if it's CPU's turn
          if ((main.variables.gameMode === 'pvc' && main.variables.turn === 'b') || 
              (main.variables.gameMode === 'cvp' && main.variables.turn === 'w')) {
            setTimeout(() => main.methods.triggerCpuMove(), 500);
          }
        }
      } catch (e) {
        console.warn('Failed to load game from localStorage:', e);
      }
    },

    clearLocalStorage: function() {
      try {
        localStorage.removeItem('chessGameSave');
      } catch (e) {
        console.warn('Failed to clear localStorage:', e);
      }
    },

    // Board flip methods
    flipBoard: function() {
      main.variables.boardFlipped = !main.variables.boardFlipped;
      main.methods.renderBoard();
      main.methods.updateBoardLabels();
      main.methods.flipClocks();
    },

    flipClocks: function() {
      // Swap the clock labels and times when board is flipped
      const $clockTop = $('#clock-top');
      const $clockBottom = $('#clock-bottom');
      
      if (main.variables.boardFlipped) {
        // Board is flipped - White is at top, Black at bottom
        $clockTop.find('.clock-label').text('White');
        $clockTop.find('.clock-time').attr('id', 'clock-white');
        $clockBottom.find('.clock-label').text('Black');
        $clockBottom.find('.clock-time').attr('id', 'clock-black');
      } else {
        // Normal orientation - Black at top, White at bottom
        $clockTop.find('.clock-label').text('Black');
        $clockTop.find('.clock-time').attr('id', 'clock-black');
        $clockBottom.find('.clock-label').text('White');
        $clockBottom.find('.clock-time').attr('id', 'clock-white');
      }
      
      // Update the display with current times
      main.methods.updateClockDisplay();
    },

    renderBoard: function() {
      // Clear all cells
      $('.gamecell').html('').attr('chess', 'null');
      
      // Re-render all pieces at their display positions
      for (let pieceName in main.variables.pieces) {
        let piece = main.variables.pieces[pieceName];
        if (!piece.captured) {
          let displayPos = main.methods.getDisplayPosition(piece.position);
          $('#' + displayPos).html(piece.img);
          $('#' + displayPos).attr('chess', pieceName);
        }
      }
      
      // Re-apply highlights if any
      if (main.variables.highlighted.length > 0) {
        main.methods.togglehighlight(main.variables.highlighted);
      }
      
      // Update captured pieces display
      main.methods.updateCapturedPieces();
    },

    getDisplayPosition: function(boardPos) {
      if (!main.variables.boardFlipped) {
        return boardPos;
      }
      let parts = boardPos.split('_');
      let file = parseInt(parts[0]);
      let rank = parseInt(parts[1]);
      let newFile = 9 - file;
      let newRank = 9 - rank;
      return newFile + '_' + newRank;
    },

    getBoardPosition: function(displayPos) {
      if (!main.variables.boardFlipped) {
        return displayPos;
      }
      let parts = displayPos.split('_');
      let file = parseInt(parts[0]);
      let rank = parseInt(parts[1]);
      let newFile = 9 - file;
      let newRank = 9 - rank;
      return newFile + '_' + newRank;
    },

    updateBoardLabels: function() {
      if (main.variables.boardFlipped) {
        // Flip rank labels (1-8 becomes 8-1)
        for (let i = 1; i <= 8; i++) {
          $('.rank-' + i).text(9 - i);
        }
        // Flip file labels (a-h becomes h-a)
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (let i = 0; i < 8; i++) {
          $('.file-' + files[i]).text(files[7 - i]);
        }
      } else {
        // Normal labels
        for (let i = 1; i <= 8; i++) {
          $('.rank-' + i).text(i);
        }
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (let i = 0; i < 8; i++) {
          $('.file-' + files[i]).text(files[i]);
        }
      }
    },

    updateCapturedPieces: function() {
      // Update white captured pieces (captured by black)
      let whiteCapturedHtml = '';
      main.variables.capturedPieces.w.forEach(function(piece) {
        whiteCapturedHtml += '<span class="captured-piece">' + piece.img + '</span>';
      });
      $('#captured-white-list').html(whiteCapturedHtml);
      
      // Update black captured pieces (captured by white)
      let blackCapturedHtml = '';
      main.variables.capturedPieces.b.forEach(function(piece) {
        blackCapturedHtml += '<span class="captured-piece">' + piece.img + '</span>';
      });
      $('#captured-black-list').html(blackCapturedHtml);
    },

    flipClocks: function() {
      // Swap the clock labels and times when board is flipped
      const $clockTop = $('#clock-top');
      const $clockBottom = $('#clock-bottom');
      
      if (main.variables.boardFlipped) {
        // Board is flipped - White is at top, Black at bottom
        $clockTop.find('.clock-label').text('White');
        $clockTop.find('.clock-time').attr('id', 'clock-white');
        $clockBottom.find('.clock-label').text('Black');
        $clockBottom.find('.clock-time').attr('id', 'clock-black');
      } else {
        // Normal orientation - Black at top, White at bottom
        $clockTop.find('.clock-label').text('Black');
        $clockTop.find('.clock-time').attr('id', 'clock-black');
        $clockBottom.find('.clock-label').text('White');
        $clockBottom.find('.clock-time').attr('id', 'clock-white');
      }
      
      // Update the display with current times
      main.methods.updateClockDisplay();
    },

    // Chess Clock Methods
    startClock: function() {
      if (main.variables.clockRunning) return;
      
      main.variables.clockRunning = true;
      main.variables.clockInterval = setInterval(function() {
        if (main.variables.turn === 'w') {
          main.variables.whiteTime -= 1000;
          if (main.variables.whiteTime <= 0) {
            main.variables.whiteTime = 0;
            main.methods.clockTimeout('w');
            return;
          }
        } else {
          main.variables.blackTime -= 1000;
          if (main.variables.blackTime <= 0) {
            main.variables.blackTime = 0;
            main.methods.clockTimeout('b');
            return;
          }
        }
        main.methods.updateClockDisplay();
        main.methods.updateClockWarnings();
      }, 1000);
    },

    stopClock: function() {
      if (main.variables.clockInterval) {
        clearInterval(main.variables.clockInterval);
        main.variables.clockInterval = null;
      }
      main.variables.clockRunning = false;
    },

    switchClock: function() {
      main.methods.stopClock();
      main.methods.startClock();
    },

    updateClockDisplay: function() {
      const whiteMinutes = Math.floor(main.variables.whiteTime / 60000);
      const whiteSeconds = Math.floor((main.variables.whiteTime % 60000) / 1000);
      const blackMinutes = Math.floor(main.variables.blackTime / 60000);
      const blackSeconds = Math.floor((main.variables.blackTime % 60000) / 1000);
      
      const whiteTimeStr = whiteMinutes.toString().padStart(2, '0') + ':' + whiteSeconds.toString().padStart(2, '0');
      const blackTimeStr = blackMinutes.toString().padStart(2, '0') + ':' + blackSeconds.toString().padStart(2, '0');
      
      $('#clock-white').text(whiteTimeStr);
      $('#clock-black').text(blackTimeStr);
    },

    updateClockWarnings: function() {
      const $clockTop = $('#clock-top');
      const $clockBottom = $('#clock-bottom');
      
      // Remove all warning classes
      $clockTop.removeClass('time-warning time-critical');
      $clockBottom.removeClass('time-warning time-critical');
      
      // Check white time
      if (main.variables.whiteTime <= 30000) { // 30 seconds
        $('#clock-white').closest('.chess-clock').addClass('time-critical');
      } else if (main.variables.whiteTime <= 60000) { // 1 minute
        $('#clock-white').closest('.chess-clock').addClass('time-warning');
      }
      
      // Check black time
      if (main.variables.blackTime <= 30000) { // 30 seconds
        $('#clock-black').closest('.chess-clock').addClass('time-critical');
      } else if (main.variables.blackTime <= 60000) { // 1 minute
        $('#clock-black').closest('.chess-clock').addClass('time-warning');
      }
    },

    clockTimeout: function(color) {
      main.methods.stopClock();
      main.variables.gameState = 'checkmate';
      
      if (color === 'w') {
        $('#status-display').html('BLACK WINS - WHITE FLAGGED').removeClass().addClass('checkmate');
        $('#turn-display').html('Game Over - Black Wins on Time');
        alert('Black wins! White ran out of time.');
      } else {
        $('#status-display').html('WHITE WINS - BLACK FLAGGED').removeClass().addClass('checkmate');
        $('#turn-display').html('Game Over - White Wins on Time');
        alert('White wins! Black ran out of time.');
      }
    },

    setCpuDifficulty: function(value) {
      main.variables.cpuDifficulty = parseInt(value);
      $('#difficulty-label').text(value);
      if (main.variables.stockfish) {
        main.variables.stockfish.postMessage('setoption name Skill Level value ' + main.variables.cpuDifficulty);
      }
    },

    
    playMoveSound: function() {
      if (!main.variables.audioContext) return;
      const ctx = main.variables.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.1); 
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    },

    playCaptureSound: function() {
      if (!main.variables.audioContext) return;
      const ctx = main.variables.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(330, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(165, ctx.currentTime + 0.15); 
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    },

    playCastleSound: function() {
      if (!main.variables.audioContext) return;
      const ctx = main.variables.audioContext;
      
      [440, 554].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.08);
      });
    },

    playCheckSound: function() {
      if (!main.variables.audioContext) return;
      const ctx = main.variables.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); 
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    },

    moveoptions: function(selectedpiece) {

      let position = { x: '', y: '' };
      position.x = main.variables.pieces[selectedpiece].position.split('_')[0];
      position.y = main.variables.pieces[selectedpiece].position.split('_')[1];

      
      var options = []; 
      var coordinates = [];
      var startpoint = main.variables.pieces[selectedpiece].position;
      var c1,c2,c3,c4,c5,c6,c7,c8;

      if (main.variables.highlighted.length != 0) {
        main.methods.togglehighlight(main.variables.highlighted);
      }

      switch (main.variables.pieces[selectedpiece].type) {
        case 'w_king':

          if ($('#6_1').attr('chess') == 'null' && $('#7_1').attr('chess') == 'null' && main.variables.pieces['w_king'].moved == false && main.variables.pieces['w_rook2'].moved == false) {
            coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 },{x: 2, y: 0}].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });
          } else {
            coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });
          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'b_king':

        if ($('#6_8').attr('chess') == 'null' && $('#7_8').attr('chess') == 'null' && main.variables.pieces['b_king'].moved == false && main.variables.pieces['b_rook2'].moved == false) {
          coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 },{x: 2, y: 0}].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });
        } else {
          coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });
        }
        /*
          coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });
        */
          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'w_queen':

          c1 = main.methods.w_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
          c2 = main.methods.w_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
          c3 = main.methods.w_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
          c4 = main.methods.w_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);
          c5 = main.methods.w_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
          c6 = main.methods.w_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
          c7 = main.methods.w_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
          c8 = main.methods.w_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4).concat(c5).concat(c6).concat(c7).concat(c8);
          
          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'b_queen':
          
            c1 = main.methods.b_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
            c2 = main.methods.b_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
            c3 = main.methods.b_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
            c4 = main.methods.b_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);
            c5 = main.methods.b_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
            c6 = main.methods.b_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
            c7 = main.methods.b_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
            c8 = main.methods.b_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);
  
            coordinates = c1.concat(c2).concat(c3).concat(c4).concat(c5).concat(c6).concat(c7).concat(c8);
            
            options = coordinates.slice(0);
            main.variables.highlighted = options.slice(0);
            main.methods.togglehighlight(options);
  
            break;
        
        case 'w_bishop':

          c1 = main.methods.w_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
          c2 = main.methods.w_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
          c3 = main.methods.w_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
          c4 = main.methods.w_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        
        case 'b_bishop':

          c1 = main.methods.b_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
          c2 = main.methods.b_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
          c3 = main.methods.b_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
          c4 = main.methods.b_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);
          break;
        case 'w_knight':

          coordinates = [{ x: -1, y: 2 },{ x: 1, y: 2 },{ x: 1, y: -2 },{ x: -1, y: -2 },{ x: 2, y: 1 },{ x: 2, y: -1 },{ x: -2, y: -1 },{ x: -2, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'b_knight':

          coordinates = [{ x: -1, y: 2 },{ x: 1, y: 2 },{ x: 1, y: -2 },{ x: -1, y: -2 },{ x: 2, y: 1 },{ x: 2, y: -1 },{ x: -2, y: -1 },{ x: -2, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'w_rook':

          c1 = main.methods.w_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
          c2 = main.methods.w_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
          c3 = main.methods.w_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
          c4 = main.methods.w_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);
          
          break;
        case 'b_rook':
        
          c1 = main.methods.b_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
          c2 = main.methods.b_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
          c3 = main.methods.b_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
          c4 = main.methods.b_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);
          
          break;
        case 'w_pawn':

          if (main.variables.pieces[selectedpiece].moved == false) {

            coordinates = [{ x: 0, y: 1 },{ x: 0, y: 2 },{ x: 1, y: 1 },{ x: -1, y: 1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }
          else if (main.variables.pieces[selectedpiece].moved == true) {

            coordinates = [{ x: 0, y: 1 },{ x: 1, y: 1 },{ x: -1, y: 1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }
          
          
          if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'b') {
            let ep = main.variables.enPassantTarget;
            let pawnFile = parseInt(position.x);
            let pawnRank = parseInt(position.y);
            
            if (ep.rank === pawnRank + 1 && (ep.file === pawnFile - 1 || ep.file === pawnFile + 1)) {
              coordinates.push(ep.file + '_' + ep.rank);
            }
          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;

        case 'b_pawn':

          
          if (main.variables.pieces[selectedpiece].moved == false) {

            coordinates = [{ x: 0, y: -1 },{ x: 0, y: -2 },{ x: 1, y: -1 },{ x: -1, y: -1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }
          else if (main.variables.pieces[selectedpiece].moved == true) {

            coordinates = [{ x: 0, y: -1 },{ x: 1, y: -1 },{ x: -1, y: -1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }
          
          
          if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'w') {
            let ep = main.variables.enPassantTarget;
            let pawnFile = parseInt(position.x);
            let pawnRank = parseInt(position.y);
            
            if (ep.rank === pawnRank - 1 && (ep.file === pawnFile - 1 || ep.file === pawnFile + 1)) {
              coordinates.push(ep.file + '_' + ep.rank);
            }
          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;

      }
    },

    options: function(startpoint, coordinates, piecetype) { 
        
      coordinates = coordinates.filter(val => {
        let pos = { x: 0, y: 0 };
        pos.x = parseInt(val.split('_')[0]);
        pos.y = parseInt(val.split('_')[1]);

        if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { 
          return val;
        }
      });

      switch (piecetype) {

        case 'w_king':

          coordinates = coordinates.filter(val => {
            let displayVal = main.methods.getDisplayPosition(val);
            return ($('#' + displayVal).attr('chess') == 'null' || ($('#' + displayVal).attr('chess')).slice(0,1) == 'b');
          });

          break;
        case 'b_king':
        
          coordinates = coordinates.filter(val => {
            let displayVal = main.methods.getDisplayPosition(val);
            return ($('#' + displayVal).attr('chess') == 'null' || ($('#' + displayVal).attr('chess')).slice(0,1) == 'w');
          });

          break;
        case 'w_knight':

          coordinates = coordinates.filter(val => {
            let displayVal = main.methods.getDisplayPosition(val);
            return ($('#' + displayVal).attr('chess') == 'null' || ($('#' + displayVal).attr('chess')).slice(0,1) == 'b');
          });

          break;

        case 'b_knight':

          coordinates = coordinates.filter(val => {
            let displayVal = main.methods.getDisplayPosition(val);
            return ($('#' + displayVal).attr('chess') == 'null' || ($('#' + displayVal).attr('chess')).slice(0,1) == 'w');
          });

          break;

        case 'w_pawn':

            coordinates = coordinates.filter(val => {
              let sp = { x: 0, y: 0 };
              let coordinate = val.split('_');

              sp.x = startpoint.split('_')[0];
              sp.y = startpoint.split('_')[1];
              
              
              let isEnPassant = false;
              if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'b') {
                let ep = main.variables.enPassantTarget;
                if (parseInt(coordinate[0]) === ep.file && parseInt(coordinate[1]) === ep.rank) {
                  isEnPassant = true;
                }
              }
              
              let displayVal = main.methods.getDisplayPosition(val);
              let displaySp = main.methods.getDisplayPosition(sp.x + '_' + (parseInt(sp.y) + 1));
              
              if (coordinate[0] < sp.x || coordinate[0] > sp.x){ 
                return (isEnPassant || ($('#' + displayVal).attr('chess') != 'null' && ($('#' + displayVal).attr('chess')).slice(0,1) == 'b')); 
              } else { 
                if (coordinate[1] == (parseInt(sp.y) + 2) && $('#' + displaySp).attr('chess') != 'null'){
                  
                } else {
                  return ($('#' + displayVal).attr('chess') == 'null'); 
                }
              }
                          
            });
         
          break;

        case 'b_pawn':

          coordinates = coordinates.filter(val => {
            let sp = { x: 0, y: 0 };
            let coordinate = val.split('_');

            sp.x = startpoint.split('_')[0];
            sp.y = startpoint.split('_')[1];
            
            
            let isEnPassant = false;
            if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'w') {
              let ep = main.variables.enPassantTarget;
              if (parseInt(coordinate[0]) === ep.file && parseInt(coordinate[1]) === ep.rank) {
                isEnPassant = true;
              }
            }
            
            let displayVal = main.methods.getDisplayPosition(val);
            let displaySp = main.methods.getDisplayPosition(sp.x + '_' + (parseInt(sp.y) - 1));
            
            if (coordinate[0] < sp.x || coordinate[0] > sp.x){ 
              return (isEnPassant || ($('#' + displayVal).attr('chess') != 'null' && ($('#' + displayVal).attr('chess')).slice(0,1) == 'w')); 
            } else { 
              if (coordinate[1] == (parseInt(sp.y) - 2) && $('#' + displaySp).attr('chess') != 'null'){
                
              } else {
                return ($('#' + displayVal).attr('chess') == 'null'); 
              }
            }
          });

          break;
      }      

      return coordinates;
    },

    w_options: function (position,coordinates) {
      
      let flag = false;
      
      coordinates = coordinates.map(function(val){ 
          return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
        }).filter(val => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split('_')[0]);
          pos.y = parseInt(val.split('_')[1]);
  
          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { 
            return val;
          }
        }).filter(val => { 
          if (flag == false){
            let displayVal = main.methods.getDisplayPosition(val);
            if ($('#' + displayVal).attr('chess') == 'null'){
              console.log(val)
              return val;
            } else if (($('#' + displayVal).attr('chess')).slice(0,1) == 'b') {
              flag = true;
              console.log(val)
              return val;
            } else if (($('#' + displayVal).attr('chess')).slice(0,1) == 'w') {
              console.log(val+'-3')
              flag = true;
            }
          }
        });

      return coordinates;
      
    },

    b_options: function (position,coordinates) {
      
      let flag = false;
      
      coordinates = coordinates.map(function(val){ 
          return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
        }).filter(val => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split('_')[0]);
          pos.y = parseInt(val.split('_')[1]);

          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { 
            return val;
          }
        }).filter(val => { 
          if (flag == false){
            let displayVal = main.methods.getDisplayPosition(val);
            if ($('#' + displayVal).attr('chess') == 'null'){
              return val;
            } else if (($('#' + displayVal).attr('chess')).slice(0,1) == 'w') {
              flag = true;
              return val;
            } else if (($('#' + displayVal).attr('chess')).slice(0,1) == 'b') {
              flag = true;
            }
          }
        });

      return coordinates;
      
    },

    capture: function(target) {
      let displaySelectedId = main.methods.getDisplayPosition(main.variables.selectedpiece);
      let selectedpiece = $('#' + displaySelectedId).attr('chess');
      let pieceType = main.variables.pieces[selectedpiece].type;
      let isPawn = pieceType.includes('pawn');
      let attackerColor = pieceType.slice(0, 1); // 'w' or 'b'
      let defenderColor = attackerColor === 'w' ? 'b' : 'w';
      
      let isEnPassant = false;
      if (isPawn && main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(target.id.split('_')[0]);
        let targetRank = parseInt(target.id.split('_')[1]);
        
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassant = true;
          
          
          
          let capturedPawnRank = ep.color === 'w' ? ep.rank + 1 : ep.rank - 1;
          let capturedPawnPos = ep.file + '_' + capturedPawnRank;
          let displayCapturedPawnPos = main.methods.getDisplayPosition(capturedPawnPos);
          $('#' + displayCapturedPawnPos).html('');
          $('#' + displayCapturedPawnPos).attr('chess', 'null');
          
          
          for (let p in main.variables.pieces) {
            if (main.variables.pieces[p].position === capturedPawnPos && main.variables.pieces[p].type.includes('pawn')) {
              main.variables.pieces[p].captured = true;
              // Track captured piece
              let capturedPieceType = main.variables.pieces[p].type;
              let capturedPieceImg = main.variables.pieces[p].img;
              main.variables.capturedPieces[defenderColor].push({ type: capturedPieceType, img: capturedPieceImg });
              break;
            }
          }
        }
      }
      
      let displayTargetId = main.methods.getDisplayPosition(target.id);
      
      $('#' + displayTargetId).html(main.variables.pieces[selectedpiece].img);
      $('#' + displayTargetId).attr('chess', selectedpiece);
      
      $('#' + displaySelectedId).html('');
      $('#' + displaySelectedId).attr('chess', 'null');
      
      main.variables.pieces[selectedpiece].position = target.id;
      main.variables.pieces[selectedpiece].moved = true;
      
      if (!isEnPassant) {
        main.variables.pieces[target.name].captured = true;
        // Track captured piece
        let capturedPieceType = main.variables.pieces[target.name].type;
        let capturedPieceImg = main.variables.pieces[target.name].img;
        main.variables.capturedPieces[defenderColor].push({ type: capturedPieceType, img: capturedPieceImg });
      }
      
      
      main.methods.playCaptureSound();
      
      
      if (isPawn || !isEnPassant) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
      
      
      main.methods.addMoveToList(selectedpiece, main.variables.selectedpiece, target.id, true, false);
      
      
      main.variables.enPassantTarget = null;
      
      
      if (isPawn) {
        let fromRank = parseInt(main.variables.selectedpiece.split('_')[1]);
        let toRank = parseInt(target.id.split('_')[1]);
        if (Math.abs(toRank - fromRank) === 2) {
          let file = parseInt(target.id.split('_')[0]);
          let color = pieceType.slice(0, 1);
          main.variables.enPassantTarget = {
            file: file,
            rank: (fromRank + toRank) / 2,
            color: color
          };
        }
      }
      
      // Update captured pieces display
      main.methods.updateCapturedPieces();
    },

    move: function (target) {

      let displaySelectedId = main.methods.getDisplayPosition(main.variables.selectedpiece);
      let selectedpiece = $('#' + displaySelectedId).attr('chess');
      let pieceType = main.variables.pieces[selectedpiece].type;
      let isPawn = pieceType.includes('pawn');
      let fromRank = parseInt(main.variables.selectedpiece.split('_')[1]);
      let toRank = parseInt(target.id.split('_')[1]);

      let displayTargetId = main.methods.getDisplayPosition(target.id);
      
      $('#' + displayTargetId).html(main.variables.pieces[selectedpiece].img);
      $('#' + displayTargetId).attr('chess',selectedpiece);
      
      $('#' + displaySelectedId).html('');
      $('#' + displaySelectedId).attr('chess','null');
      main.variables.pieces[selectedpiece].position = target.id;
      main.variables.pieces[selectedpiece].moved = true;
      
      
      main.methods.playMoveSound();
      
      
      if (isPawn) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
      
      
      main.methods.addMoveToList(selectedpiece, main.variables.selectedpiece, target.id, false, false);
      
      
      main.variables.enPassantTarget = null;
      
      
      if (isPawn && Math.abs(toRank - fromRank) === 2) {
        let file = parseInt(target.id.split('_')[0]);
        let color = pieceType.slice(0, 1);
        main.variables.enPassantTarget = {
          file: file,
          rank: (fromRank + toRank) / 2,
          color: color
        };
      }
    },

    endturn: function(){
      
      // Switch chess clocks - stop current player's clock, start opponent's clock
      main.methods.switchClock();

      if (main.variables.turn == 'w') {
        main.variables.turn = 'b';
        
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        main.variables.selectedpiece = '';

        $('#turn-display').html("It's Black's Turn");

        $('#turn-display').addClass('turnhighlight');
        window.setTimeout(function(){
          $('#turn-display').removeClass('turnhighlight');
        }, 1500);

        
        $('#resign-btn').html('Resign (Black)');

        
        main.methods.updatePositionHistory();
        
        // Auto-save to localStorage after each turn
        main.methods.saveToLocalStorage();
        
        
        if (main.methods.checkThreefoldRepetition()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY THREEFOLD REPETITION').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by threefold repetition!');
          return;
        }
        
        
        if (main.methods.checkFiftyMoveRule()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY 50-MOVE RULE').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by 50-move rule!');
          return;
        }
        
        
        if (main.methods.checkInsufficientMaterial()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY INSUFFICIENT MATERIAL').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by insufficient material!');
          return;
        }

        main.methods.updateGameState();

      // Trigger CPU move if it's CPU's turn
      if (main.variables.cpuColor === main.variables.turn && main.variables.gameMode !== 'pvp') {
        setTimeout(() => main.methods.triggerCpuMove(), 300);
      }

      } else if (main.variables.turn == 'b'){
        main.variables.turn = 'w';

        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        main.variables.selectedpiece = '';

        $('#turn-display').html("It's White's Turn");

        $('#turn-display').addClass('turnhighlight');
        window.setTimeout(function(){
          $('#turn-display').removeClass('turnhighlight');
        }, 1500);

        
        $('#resign-btn').html('Resign (White)');

        
        main.methods.updatePositionHistory();
        
        // Auto-save to localStorage after each turn
        main.methods.saveToLocalStorage();
        
        
        if (main.methods.checkThreefoldRepetition()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY THREEFOLD REPETITION').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by threefold repetition!');
          return;
        }
        
        
        if (main.methods.checkFiftyMoveRule()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY 50-MOVE RULE').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by 50-move rule!');
          return;
        }
        
        
        if (main.methods.checkInsufficientMaterial()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY INSUFFICIENT MATERIAL').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by insufficient material!');
          return;
        }

        main.methods.updateGameState();

      // Trigger CPU move if it's CPU's turn
      if (main.variables.cpuColor === main.variables.turn && main.variables.gameMode !== 'pvp') {
        setTimeout(() => main.methods.triggerCpuMove(), 300);
      }

      }

    },

    // Chess Clock Methods
    startClock: function() {
      if (main.variables.clockRunning) return;
      
      main.variables.clockRunning = true;
      main.variables.clockInterval = setInterval(function() {
        if (main.variables.turn === 'w') {
          main.variables.whiteTime -= 1000;
          if (main.variables.whiteTime <= 0) {
            main.variables.whiteTime = 0;
            main.methods.clockTimeout('w');
            return;
          }
        } else {
          main.variables.blackTime -= 1000;
          if (main.variables.blackTime <= 0) {
            main.variables.blackTime = 0;
            main.methods.clockTimeout('b');
            return;
          }
        }
        main.methods.updateClockDisplay();
      }, 1000);
      
      // Update active clock visual
      main.methods.updateClockActive();
    },

    stopClock: function() {
      if (main.variables.clockInterval) {
        clearInterval(main.variables.clockInterval);
        main.variables.clockInterval = null;
      }
      main.variables.clockRunning = false;
      $('#clock-top').removeClass('active');
      $('#clock-bottom').removeClass('active');
    },

    switchClock: function() {
      // Stop current clock, start opponent's clock
      main.methods.stopClock();
      
      // Only start clock for player vs player games
      if (main.variables.gameMode === 'pvp' && main.variables.gameState === 'normal') {
        main.methods.startClock();
      }
    },

    updateClockDisplay: function() {
      const whiteMinutes = Math.floor(main.variables.whiteTime / 60000);
      const whiteSeconds = Math.floor((main.variables.whiteTime % 60000) / 1000);
      const blackMinutes = Math.floor(main.variables.blackTime / 60000);
      const blackSeconds = Math.floor((main.variables.blackTime % 60000) / 1000);
      
      const whiteTimeStr = whiteMinutes.toString().padStart(2, '0') + ':' + whiteSeconds.toString().padStart(2, '0');
      const blackTimeStr = blackMinutes.toString().padStart(2, '0') + ':' + blackSeconds.toString().padStart(2, '0');
      
      $('#clock-white').text(whiteTimeStr);
      $('#clock-black').text(blackTimeStr);
      
      // Update warning classes
      main.methods.updateClockWarnings();
    },

    updateClockWarnings: function() {
      const $whiteClock = $('#clock-white').closest('.chess-clock');
      const $blackClock = $('#clock-black').closest('.chess-clock');
      
      // Remove existing warning classes
      $whiteClock.removeClass('time-warning time-critical');
      $blackClock.removeClass('time-warning time-critical');
      
      // White clock warnings
      if (main.variables.whiteTime <= 30000) { // 30 seconds
        $whiteClock.addClass('time-critical');
      } else if (main.variables.whiteTime <= 60000) { // 1 minute
        $whiteClock.addClass('time-warning');
      }
      
      // Black clock warnings
      if (main.variables.blackTime <= 30000) { // 30 seconds
        $blackClock.addClass('time-critical');
      } else if (main.variables.blackTime <= 60000) { // 1 minute
        $blackClock.addClass('time-warning');
      }
    },

    updateClockActive: function() {
      $('#clock-top').removeClass('active');
      $('#clock-bottom').removeClass('active');
      
      if (main.variables.turn === 'w') {
        // White's turn - highlight white's clock
        if (main.variables.boardFlipped) {
          $('#clock-top').addClass('active');
        } else {
          $('#clock-bottom').addClass('active');
        }
      } else {
        // Black's turn - highlight black's clock
        if (main.variables.boardFlipped) {
          $('#clock-bottom').addClass('active');
        } else {
          $('#clock-top').addClass('active');
        }
      }
    },

    clockTimeout: function(color) {
      main.methods.stopClock();
      main.variables.gameState = 'checkmate';
      
      if (color === 'w') {
        $('#status-display').html('BLACK WINS - WHITE FLAGGED').removeClass().addClass('checkmate');
        $('#turn-display').html('Game Over - Black Wins on Time');
      } else {
        $('#status-display').html('WHITE WINS - BLACK FLAGGED').removeClass().addClass('checkmate');
        $('#turn-display').html('Game Over - White Wins on Time');
      }
      
      alert(color === 'w' ? 'White ran out of time! Black wins!' : 'Black ran out of time! White wins!');
    },

    updateGameState: function(){
      let kingColor = main.variables.turn;
      let kingName = kingColor === 'w' ? 'w_king' : 'b_king';
      let kingPos = main.variables.pieces[kingName].position;
      let inCheck = main.methods.isKingInCheck(kingPos, kingColor);
      let hasLegalMoves = main.methods.hasLegalMoves(kingColor);

      if (!hasLegalMoves) {
        if (inCheck) {
          main.variables.gameState = 'checkmate';
          $('#status-display').html('CHECKMATE').removeClass().addClass('checkmate');
        } else {
          main.variables.gameState = 'stalemate';
          $('#status-display').html('STALEMATE').removeClass().addClass('stalemate');
        }
      } else if (inCheck) {
        main.variables.gameState = 'check';
        $('#status-display').html('CHECK').removeClass().addClass('check');
      } else {
        main.variables.gameState = 'normal';
        $('#status-display').html('').removeClass();
      }
    },

    clearMoveList: function() {
      main.variables.moveList = [];
      $('#move-list').html('');
    },

    addMoveToList: function(pieceName, fromPos, toPos, captured, promotion) {
      let piece = main.variables.pieces[pieceName];
      let color = pieceName.slice(0, 1);
      let pieceType = piece.type.replace(color + '_', '');
      
      
      let fromFile = String.fromCharCode(96 + parseInt(fromPos.split('_')[0]));
      let fromRank = fromPos.split('_')[1];
      let toFile = String.fromCharCode(96 + parseInt(toPos.split('_')[0]));
      let toRank = toPos.split('_')[1];
      
      let moveNotation = '';
      
      
      let pieceLetter = '';
      if (pieceType === 'king') pieceLetter = 'K';
      else if (pieceType === 'queen') pieceLetter = 'Q';
      else if (pieceType === 'rook') pieceLetter = 'R';
      else if (pieceType === 'bishop') pieceLetter = 'B';
      else if (pieceType === 'knight') pieceLetter = 'N';
      
      
      if (pieceType === 'king' && Math.abs(parseInt(fromPos.split('_')[0]) - parseInt(toPos.split('_')[0])) === 2) {
        if (toPos.split('_')[0] === '7') {
          moveNotation = 'O-O'; 
        } else if (toPos.split('_')[0] === '3') {
          moveNotation = 'O-O-O'; 
        }
      } else {
        
        moveNotation = pieceLetter;
        
        
        if (captured) {
          if (pieceType === 'pawn') {
            moveNotation += fromFile;
          }
          moveNotation += 'x';
        }
        
        moveNotation += toFile + toRank;
        
        
        if (promotion) {
          moveNotation += '=Q'; 
        }
      }
      
      
      let kingColor = main.variables.turn === 'w' ? 'b' : 'w';
      let kingName = kingColor === 'w' ? 'w_king' : 'b_king';
      let kingPos = main.variables.pieces[kingName].position;
      let inCheck = main.methods.isKingInCheck(kingPos, kingColor);
      let hasLegalMoves = main.methods.hasLegalMoves(kingColor);
      
      if (!hasLegalMoves && inCheck) {
        moveNotation += '#';
      } else if (inCheck) {
        moveNotation += '+';
      }
      
      
      let moveNumber;
      if (color === 'w') {
        
        moveNumber = main.variables.moveList.length + 1;
      } else {
        
        moveNumber = main.variables.moveList.length;
      }
      
      // Store detailed move info for take back functionality
      const moveInfo = {
        piece: pieceName,
        from: fromPos,
        to: toPos,
        captured: captured,
        notation: moveNotation,
        color: color
      };
      
      if (color === 'w') {
        
        main.variables.moveList.push({
          number: moveNumber,
          white: moveNotation,
          black: '',
          whiteMove: moveInfo
        });
      } else {
        
        if (main.variables.moveList.length > 0 && main.variables.moveList[main.variables.moveList.length - 1].black === '') {
          main.variables.moveList[main.variables.moveList.length - 1].black = moveNotation;
          main.variables.moveList[main.variables.moveList.length - 1].blackMove = moveInfo;
        } else {
          main.variables.moveList.push({
            number: moveNumber,
            white: '',
            black: moveNotation,
            blackMove: moveInfo
          });
        }
      }
      
      
      main.methods.updateMoveListDisplay();
      
      // Enable takeback button after a move is made (in PvP mode)
      if (main.variables.gameMode === 'pvp') {
        $('#takeback-btn').prop('disabled', false);
      }
    },

    updateMoveListDisplay: function() {
      let html = '';
      main.variables.moveList.forEach(function(move, index) {
        html += '<div class="move-entry">';
        html += '<span class="move-number">' + move.number + '.</span>';
        if (move.white) {
          html += '<span class="move-white">' + move.white + '</span>';
        } else {
          html += '<span class="move-white"></span>';
        }
        if (move.black) {
          html += '<span class="move-black">' + move.black + '</span>';
        }
        html += '</div>';
      });
      $('#move-list').html(html);
      
      
      $('#move-list-container').scrollTop($('#move-list-container')[0].scrollHeight);
    },

    updateCapturedPieces: function() {
      let whiteCapturedHtml = '';
      let blackCapturedHtml = '';
      
      for (let piece in main.variables.pieces) {
        if (main.variables.pieces[piece].captured) {
          let img = main.variables.pieces[piece].img;
          if (piece.startsWith('w_')) {
            whiteCapturedHtml += '<span class="captured-piece">' + img + '</span>';
          } else if (piece.startsWith('b_')) {
            blackCapturedHtml += '<span class="captured-piece">' + img + '</span>';
          }
        }
      }
      
      $('#captured-white-list').html(whiteCapturedHtml);
      $('#captured-black-list').html(blackCapturedHtml);
    },

    isKingInCheck: function(kingPos, kingColor) {
      let opponentColor = kingColor === 'w' ? 'b' : 'w';
      
      for (let piece in main.variables.pieces) {
        if (main.variables.pieces[piece].captured) continue;
        if (piece.slice(0,1) !== opponentColor) continue;
        
        let possibleMoves = main.methods.getPossibleMoves(piece);
        if (possibleMoves.indexOf(kingPos) !== -1) {
          return true;
        }
      }
      return false;
    },

    hasLegalMoves: function(color) {
      for (let piece in main.variables.pieces) {
        if (main.variables.pieces[piece].captured) continue;
        if (piece.slice(0,1) !== color) continue;
        
        let moves = main.methods.getPossibleMoves(piece);
        for (let i = 0; i < moves.length; i++) {
          if (main.methods.isMoveValid(piece, moves[i])) {
            return true;
          }
        }
      }
      return false;
    },

    isMoveValid: function(piece, targetPos) {
      let displayTargetPos = main.methods.getDisplayPosition(targetPos);
      let targetCell = $('#' + displayTargetPos).attr('chess');
      if (targetCell === undefined) return false;
      if (targetCell !== 'null' && targetCell.slice(0,1) === piece.slice(0,1)) return false;
      
      let color = piece.slice(0,1);
      let kingName = color === 'w' ? 'w_king' : 'b_king';
      let kingPos = main.variables.pieces[kingName].position;
      
      let pieceType = main.variables.pieces[piece].type;
      let isPawn = pieceType.includes('pawn');
      let isEnPassant = false;
      let capturedPawnPos = null;
      
      
      if (isPawn && main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(targetPos.split('_')[0]);
        let targetRank = parseInt(targetPos.split('_')[1]);
        
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassant = true;
          
          
          let capturedPawnRank = ep.color === 'w' ? ep.rank + 1 : ep.rank - 1;
          capturedPawnPos = ep.file + '_' + capturedPawnRank;
        }
      }
      
      let originalPos = main.variables.pieces[piece].position;
      let capturedPieceName = null;
      let capturedPieceCaptured = false;
      let displayOriginalPos = main.methods.getDisplayPosition(originalPos);
      let pieceImg = $('#' + displayOriginalPos).html();
      let targetPieceImg = $('#' + displayTargetPos).html(); 
      let targetPieceChess = $('#' + displayTargetPos).attr('chess'); 
      
      
      main.variables.pieces[piece].position = targetPos;
      
      $('#' + displayTargetPos).html(pieceImg);
      $('#' + displayTargetPos).attr('chess', piece);
      $('#' + displayOriginalPos).html('');
      $('#' + displayOriginalPos).attr('chess', 'null');
      
      if (piece === kingName) {
        kingPos = targetPos;
      }
      
      
      if (targetPieceChess !== 'null' && targetPieceChess.slice(0,1) !== color) {
        capturedPieceName = targetPieceChess;
        capturedPieceCaptured = main.variables.pieces[targetPieceChess].captured;
        main.variables.pieces[targetPieceChess].captured = true;
      }
      
      
      if (isEnPassant && capturedPawnPos) {
        let displayCapturedPawnPos = main.methods.getDisplayPosition(capturedPawnPos);
        for (let p in main.variables.pieces) {
          if (main.variables.pieces[p].position === capturedPawnPos && main.variables.pieces[p].type.includes('pawn')) {
            capturedPieceName = p;
            capturedPieceCaptured = main.variables.pieces[p].captured;
            main.variables.pieces[p].captured = true;
            
            $('#' + displayCapturedPawnPos).html('');
            $('#' + displayCapturedPawnPos).attr('chess', 'null');
            break;
          }
        }
      }
      
      let safe = !main.methods.isKingInCheck(kingPos, color);
      
      
      main.variables.pieces[piece].position = originalPos;
      
      $('#' + displayOriginalPos).html(pieceImg);
      $('#' + displayOriginalPos).attr('chess', piece);
      $('#' + displayTargetPos).html(targetPieceImg);
      $('#' + displayTargetPos).attr('chess', targetPieceChess);
      
      
      if (capturedPieceName && !isEnPassant) {
        main.variables.pieces[capturedPieceName].captured = capturedPieceCaptured;
      }
      
      if (isEnPassant && capturedPieceName) {
        main.variables.pieces[capturedPieceName].captured = capturedPieceCaptured;
        
        let capturedPawnImg = main.variables.pieces[capturedPieceName].img;
        let displayCapturedPawnPos = main.methods.getDisplayPosition(capturedPawnPos);
        $('#' + displayCapturedPawnPos).html(capturedPawnImg);
        $('#' + displayCapturedPawnPos).attr('chess', capturedPieceName);
      }
      
      return safe;
    },

    getPossibleMoves: function(piece) {
      let type = main.variables.pieces[piece].type;
      let pos = main.variables.pieces[piece].position;
      let x = parseInt(pos.split('_')[0]);
      let y = parseInt(pos.split('_')[1]);
      let moves = [];

      if (type.includes('pawn')) {
        let dir = type.includes('w') ? 1 : -1;
        let pawnColor = type.includes('w') ? 'w' : 'b';
        if (y + dir >= 1 && y + dir <= 8) {
          let forwardPos = x + '_' + (y + dir);
          let displayForwardPos = main.methods.getDisplayPosition(forwardPos);
          moves.push(forwardPos);
          if (!main.variables.pieces[piece].moved && y + 2 * dir >= 1 && y + 2 * dir <= 8) {
            let doubleForwardPos = x + '_' + (y + 2 * dir);
            let displayDoubleForwardPos = main.methods.getDisplayPosition(doubleForwardPos);
            if ($('#' + displayForwardPos).attr('chess') === 'null' && $('#' + displayDoubleForwardPos).attr('chess') === 'null') {
              moves.push(doubleForwardPos);
            }
          }
        }
        
        if (main.variables.enPassantTarget) {
          let ep = main.variables.enPassantTarget;
          
          if (ep.color !== pawnColor && ep.rank === y + dir && (ep.file === x - 1 || ep.file === x + 1)) {
            moves.push(ep.file + '_' + ep.rank);
          }
        }
        if (x - 1 >= 1 && y + dir >= 1 && y + dir <= 8) moves.push((x - 1) + '_' + (y + dir));
        if (x + 1 <= 8 && y + dir >= 1 && y + dir <= 8) moves.push((x + 1) + '_' + (y + dir));
      } else if (type.includes('knight')) {
        [[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]].forEach(off => {
          let nx = x + off[0], ny = y + off[1];
          if (nx >= 1 && nx <= 8 && ny >= 1 && ny <= 8) moves.push(nx + '_' + ny);
        });
      } else if (type.includes('king')) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            let nx = x + dx, ny = y + dy;
            if (nx >= 1 && nx <= 8 && ny >= 1 && ny <= 8) moves.push(nx + '_' + ny);
          }
        }
      } else if (type.includes('rook') || type.includes('queen')) {
        [[0,1],[0,-1],[1,0],[-1,0]].forEach(dir => {
          for (let i = 1; i < 8; i++) {
            let nx = x + dir[0] * i, ny = y + dir[1] * i;
            if (nx < 1 || nx > 8 || ny < 1 || ny > 8) break;
            let pos = nx + '_' + ny;
            let displayPos = main.methods.getDisplayPosition(pos);
            moves.push(pos);
            if ($('#' + displayPos).attr('chess') !== 'null') break;
          }
        });
      }
      if (type.includes('bishop') || type.includes('queen')) {
        [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(dir => {
          for (let i = 1; i < 8; i++) {
            let nx = x + dir[0] * i, ny = y + dir[1] * i;
            if (nx < 1 || nx > 8 || ny < 1 || ny > 8) break;
            let pos = nx + '_' + ny;
            let displayPos = main.methods.getDisplayPosition(pos);
            moves.push(pos);
            if ($('#' + displayPos).attr('chess') !== 'null') break;
          }
        });
      }

      return moves;
    },

    togglehighlight: function(options) {
      options.forEach(function(element, index, array) {
        let displayPos = main.methods.getDisplayPosition(element);
        $('#' + displayPos).toggleClass("green");
      });
    },

    restart: function() {
      
      main.variables.pieces = {
        w_king: {
          position: '5_1',
          img: '&#9812;',
          captured: false,
          moved: false,
          type: 'w_king'
        },
        w_queen: {
          position: '4_1',
          img: '&#9813;',
          captured: false,
          moved: false,
          type: 'w_queen'
        },
        w_bishop1: {
          position: '3_1',
          img: '&#9815;',
          captured: false,
          moved: false,
          type: 'w_bishop'
        },
        w_bishop2: {
          position: '6_1',
          img: '&#9815;',
          captured: false,
          moved: false,
          type: 'w_bishop'
        },
        w_knight1: {
          position: '2_1',
          img: '&#9816;',
          captured: false,
          moved: false,
          type: 'w_knight'
        },
        w_knight2: {
          position: '7_1',
          img: '&#9816;',
          captured: false,
          moved: false,
          type: 'w_knight'
        },
        w_rook1: {
          position: '1_1',
          img: '&#9814;',
          captured: false,
          moved: false,
          type: 'w_rook'
        },
        w_rook2: {
          position: '8_1',
          img: '&#9814;',
          captured: false,
          moved: false,
          type: 'w_rook'
        },
        w_pawn1: {
          position: '1_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn2: {
          position: '2_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn3: {
          position: '3_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn4: {
          position: '4_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn5: {
          position: '5_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn6: {
          position: '6_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn7: {
          position: '7_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn8: {
          position: '8_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },

        b_king: {
          position: '5_8',
          img: '&#9818;',
          captured: false,
          moved: false,
          type: 'b_king'
        },
        b_queen: {
          position: '4_8',
          img: '&#9819;',
          captured: false,
          moved: false,
          type: 'b_queen'
        },
        b_bishop1: {
          position: '3_8',
          img: '&#9821;',
          captured: false,
          moved: false,
          type: 'b_bishop'
        },
        b_bishop2: {
          position: '6_8',
          img: '&#9821;',
          captured: false,
          moved: false,
          type: 'b_bishop'
        },
        b_knight1: {
          position: '2_8',
          img: '&#9822;',
          captured: false,
          moved: false,
          type: 'b_knight'
        },
        b_knight2: {
          position: '7_8',
          img: '&#9822;',
          captured: false,
          moved: false,
          type: 'b_knight'
        },
        b_rook1: {
          position: '1_8',
          img: '&#9820;',
          captured: false,
          moved: false,
          type: 'b_rook'
        },
        b_rook2: {
          position: '8_8',
          img: '&#9820;',
          captured: false,
          moved: false,
          type: 'b_rook'
        },
        b_pawn1: {
          position: '1_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn2: {
          position: '2_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn3: {
          position: '3_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn4: {
          position: '4_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn5: {
          position: '5_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn6: {
          position: '6_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn7: {
          position: '7_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn8: {
          position: '8_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        }
      };

      
      main.variables.turn = 'w';
      main.variables.selectedpiece = '';
      main.variables.highlighted = [];
      main.variables.gameState = 'normal';
      main.variables.moveList = [];
      
      main.variables.enPassantTarget = null;
      main.variables.positionHistory = [];
      main.variables.halfMoveClock = 0;
      main.variables.capturedPieces = { w: [], b: [] };
      
      main.variables.isCpuThinking = false;
      
      // Reset chess clocks
      main.variables.whiteTime = 600000;
      main.variables.blackTime = 600000;
      main.variables.clockRunning = false;
      if (main.variables.clockInterval) {
        clearInterval(main.variables.clockInterval);
        main.variables.clockInterval = null;
      }
      main.methods.updateClockDisplay();
      $('#clock-top').removeClass('active time-warning time-critical');
      $('#clock-bottom').removeClass('active time-warning time-critical');
      
      main.variables.gameMode = $('#game-mode').val() || 'pvp';
      main.variables.cpuDifficulty = parseInt($('#cpu-difficulty').val()) || 20;
      
      if (main.variables.gameMode === 'pvc') {
        main.variables.cpuColor = 'b';
      } else if (main.variables.gameMode === 'cvp') {
        main.variables.cpuColor = 'w';
      } else {
        main.variables.cpuColor = null;
      }
      
      if (main.variables.stockfish) {
        main.variables.stockfish.postMessage('setoption name Skill Level value ' + main.variables.cpuDifficulty);
      }
      
      $('.gamecell').removeClass('green');

      
      $('.gamecell').html('');
      $('.gamecell').attr('chess', 'null');

      
      $('#turn-display').html("It's White's Turn!");
      $('#status-display').html('').removeClass('check checkmate stalemate draw');
      $('#move-list').html('');
      $('#resign-btn').html('Resign (White)');

      // Clear captured pieces display
      $('#captured-white-list').html('');
      $('#captured-black-list').html('');
      
      // Update move list
      main.methods.updateMoveListDisplay();
      
      // Update takeback button
      $('#takeback-btn').prop('disabled', true);
    },

    

    
    getPositionKey: function() {
      let pieces = [];
      for (let piece in main.variables.pieces) {
        if (!main.variables.pieces[piece].captured) {
          pieces.push(piece + ':' + main.variables.pieces[piece].position);
        }
      }
      pieces.sort();
      let castling = '';
      if (!main.variables.pieces.w_king.moved) {
        if (!main.variables.pieces.w_rook1.moved) castling += 'K';
        if (!main.variables.pieces.w_rook2.moved) castling += 'Q';
      }
      if (!main.variables.pieces.b_king.moved) {
        if (!main.variables.pieces.b_rook1.moved) castling += 'k';
        if (!main.variables.pieces.b_rook2.moved) castling += 'q';
      }
      let ep = main.variables.enPassantTarget ? main.variables.enPassantTarget.file + '_' + main.variables.enPassantTarget.rank : '-';
      return pieces.join(';') + '|' + main.variables.turn + '|' + castling + '|' + ep;
    },

    
    checkThreefoldRepetition: function() {
      let key = main.methods.getPositionKey();
      let count = 0;
      for (let i = 0; i < main.variables.positionHistory.length; i++) {
        if (main.variables.positionHistory[i] === key) count++;
      }
      return count >= 2; 
    },

    
    checkFiftyMoveRule: function() {
      return main.variables.halfMoveClock >= 100; 
    },

    
    checkInsufficientMaterial: function() {
      let whitePieces = [];
      let blackPieces = [];
      
      for (let pieceName in main.variables.pieces) {
        let piece = main.variables.pieces[pieceName];
        if (!piece.captured) {
          if (piece.type.startsWith('w')) {
            whitePieces.push(piece.type);
          } else {
            blackPieces.push(piece.type);
          }
        }
      }
      
      let whiteNonKing = whitePieces.filter(p => !p.includes('king'));
      let blackNonKing = blackPieces.filter(p => !p.includes('king'));
      
      if (whiteNonKing.length === 0 && blackNonKing.length === 0) {
        return true;
      }
      
      if (whiteNonKing.length === 0) {
        if (blackNonKing.length === 1) {
          let piece = blackNonKing[0];
          if (piece.includes('bishop') || piece.includes('knight')) {
            return true;
          }
        }
      }
      
      if (blackNonKing.length === 0) {
        if (whiteNonKing.length === 1) {
          let piece = whiteNonKing[0];
          if (piece.includes('bishop') || piece.includes('knight')) {
            return true;
          }
        }
      }
      
      if (whiteNonKing.length === 1 && blackNonKing.length === 1) {
        let whitePiece = whiteNonKing[0];
        let blackPiece = blackNonKing[0];
        if (whitePiece.includes('bishop') && blackPiece.includes('bishop')) {
          return true;
        }
      }
      
      return false;
    },

    
    updatePositionHistory: function() {
      let key = main.methods.getPositionKey();
      main.variables.positionHistory.push(key);
    },

    
    updateHalfMoveClock: function(isPawnMove, isCapture) {
      if (isPawnMove || isCapture) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
    },

    
    resetEnPassantTarget: function() {
      main.variables.enPassantTarget = null;
    },

    
    setEnPassantTarget: function(pawn, fromPos, toPos) {
      let fromFile = parseInt(fromPos.split('_')[0]);
      let fromRank = parseInt(fromPos.split('_')[1]);
      let toRank = parseInt(toPos.split('_')[1]);
      
      if (Math.abs(toRank - fromRank) === 2) {
        let direction = pawn.type.startsWith('w') ? 1 : -1;
        main.variables.enPassantTarget = {
          file: fromFile,
          rank: fromRank + direction,
          color: pawn.type.startsWith('w') ? 'w' : 'b'
        };
      } else {
        main.variables.enPassantTarget = null;
      }
    },

    
    isEnPassantCapture: function(pawn, targetPos) {
      if (!main.variables.enPassantTarget) return false;
      let targetFile = parseInt(targetPos.split('_')[0]);
      let targetRank = parseInt(targetPos.split('_')[1]);
      return targetFile === main.variables.enPassantTarget.file && 
             targetRank === main.variables.enPassantTarget.rank &&
             pawn.type.startsWith(main.variables.enPassantTarget.color === 'w' ? 'b' : 'w');
    },

    
    handleEnPassantCapture: function(pawn, targetPos) {
      let capturedPawnRank = pawn.type.startsWith('w') ? targetPos.split('_')[1] - 1 : parseInt(targetPos.split('_')[1]) + 1;
      let capturedPawnPos = main.variables.enPassantTarget.file + '_' + capturedPawnRank;
      
      
      for (let piece in main.variables.pieces) {
        if (main.variables.pieces[piece].position === capturedPawnPos && 
            main.variables.pieces[piece].type.startsWith(pawn.type.startsWith('w') ? 'b' : 'w') &&
            main.variables.pieces[piece].type.includes('pawn')) {
          main.variables.pieces[piece].captured = true;
          $('#' + capturedPawnPos).html('');
          $('#' + capturedPawnPos).attr('chess', 'null');
          break;
        }
      }
    },

    getFenFromPosition: function() {
      let board = Array(8).fill().map(() => Array(8).fill(''));
      
      for (let pieceName in main.variables.pieces) {
        let piece = main.variables.pieces[pieceName];
        if (!piece.captured) {
          let file = parseInt(piece.position.split('_')[0]) - 1;
          let rank = 8 - parseInt(piece.position.split('_')[1]);
          let fenChar = '';
          if (piece.type === 'w_king') fenChar = 'K';
          else if (piece.type === 'w_queen') fenChar = 'Q';
          else if (piece.type === 'w_rook') fenChar = 'R';
          else if (piece.type === 'w_bishop') fenChar = 'B';
          else if (piece.type === 'w_knight') fenChar = 'N';
          else if (piece.type === 'w_pawn') fenChar = 'P';
          else if (piece.type === 'b_king') fenChar = 'k';
          else if (piece.type === 'b_queen') fenChar = 'q';
          else if (piece.type === 'b_rook') fenChar = 'r';
          else if (piece.type === 'b_bishop') fenChar = 'b';
          else if (piece.type === 'b_knight') fenChar = 'n';
          else if (piece.type === 'b_pawn') fenChar = 'p';
          board[rank][file] = fenChar;
        }
      }
      
      let fenRows = [];
      for (let r = 0; r < 8; r++) {
        let row = '';
        let emptyCount = 0;
        for (let f = 0; f < 8; f++) {
          if (board[r][f] === '') {
            emptyCount++;
          } else {
            if (emptyCount > 0) {
              row += emptyCount;
              emptyCount = 0;
            }
            row += board[r][f];
          }
        }
        if (emptyCount > 0) row += emptyCount;
        fenRows.push(row);
      }
      
      let fen = fenRows.join('/') + ' ' + main.variables.turn + ' ';
      
      let castling = '';
      if (!main.variables.pieces.w_king.moved) {
        if (!main.variables.pieces.w_rook1.moved) castling += 'K';
        if (!main.variables.pieces.w_rook2.moved) castling += 'Q';
      }
      if (!main.variables.pieces.b_king.moved) {
        if (!main.variables.pieces.b_rook1.moved) castling += 'k';
        if (!main.variables.pieces.b_rook2.moved) castling += 'q';
      }
      fen += (castling || '-') + ' ';
      
      if (main.variables.enPassantTarget) {
        let file = String.fromCharCode(96 + main.variables.enPassantTarget.file);
        let rank = main.variables.enPassantTarget.rank;
        fen += file + rank;
      } else {
        fen += '-';
      }
      
      fen += ' ' + main.variables.halfMoveClock + ' ' + Math.floor(main.variables.moveList.length / 2) + 1;
      
      return fen;
    },

    initStockfish: function() {
      // Stockfish.js is designed to be used as a Web Worker
      // Create a worker from the local file
      try {
        main.variables.stockfish = new Worker('./stockfish.js');
        main.variables.stockfish.onmessage = function(event) {
          let line = event.data;
          // Ignore undefined or non-string messages during initialization
          if (!line || typeof line !== 'string') return;
          if (line.startsWith('bestmove')) {
            let move = line.split(' ')[1];
            if (move && move !== '(none)') {
              main.methods.makeCpuMove(move);
            }
            main.variables.isCpuThinking = false;
            main.methods.updateGameState();
          }
        };
        // Initialize UCI
        main.variables.stockfish.postMessage('uci');
        main.variables.stockfish.postMessage('isready');
      } catch (e) {
        console.error('Failed to initialize Stockfish:', e);
      }
    },

    makeCpuMove: function(uciMove) {
      let fromFile = uciMove.charCodeAt(0) - 96;
      let fromRank = parseInt(uciMove[1]);
      let toFile = uciMove.charCodeAt(2) - 96;
      let toRank = parseInt(uciMove[3]);
      
      let fromPos = fromFile + '_' + fromRank;
      let toPos = toFile + '_' + toRank;
      
      let displayFromPos = main.methods.getDisplayPosition(fromPos);
      let pieceName = $('#' + displayFromPos).attr('chess');
      if (!pieceName || pieceName === 'null') return;
      
      // Set selectedpiece as board position (not display position)
      main.variables.selectedpiece = fromPos;
      
      let target = { name: $('#' + main.methods.getDisplayPosition(toPos)).attr('chess'), id: toPos };
      
      if (pieceName === 'w_king' || pieceName === 'b_king') {
        if (Math.abs(fromFile - toFile) === 2) {
          main.methods.move(target);
          main.methods.endturn();
          return;
        }
      }
      
      if (main.variables.enPassantTarget && 
          main.variables.enPassantTarget.file === toFile && 
          main.variables.enPassantTarget.rank === toRank &&
          (pieceName.includes('pawn'))) {
        main.methods.capture(target);
        main.methods.endturn();
        return;
      }
      
      if (target.name !== 'null') {
        main.methods.capture(target);
      } else {
        main.methods.move(target);
      }
      main.methods.endturn();
    },

    triggerCpuMove: function() {
      if (main.variables.isCpuThinking || !main.variables.stockfish) return;
      
      if (main.variables.gameMode !== 'pvp' && main.variables.turn === main.variables.cpuColor) {
        main.variables.isCpuThinking = true;
        $('#status-display').html('CPU THINKING...').removeClass().addClass('check');
        
        let fen = main.methods.getFenFromPosition();
        main.variables.stockfish.postMessage('position fen ' + fen);
        let depth = main.variables.cpuDifficulty;
        main.variables.stockfish.postMessage('go depth ' + depth);
      }
    },

    setGameMode: function(mode) {
      main.variables.gameMode = mode || 'pvp';
      main.variables.cpuDifficulty = parseInt($('#cpu-difficulty').val()) || 20;
      
      if (main.variables.gameMode === 'pvc') {
        main.variables.cpuColor = 'b';
      } else if (main.variables.gameMode === 'cvp') {
        main.variables.cpuColor = 'w';
      } else {
        main.variables.cpuColor = null;
      }
      
      if (main.variables.stockfish) {
        main.variables.stockfish.postMessage('setoption name Skill Level value ' + main.variables.cpuDifficulty);
      }
      
      // Restart game with new mode
      main.methods.restart();
    },

    offerDraw: function() {
      if (confirm("Offer a draw? The game will end in a draw if accepted.")) {
        main.variables.gameState = 'draw';
        $('#status-display').html('DRAW BY AGREEMENT').removeClass().addClass('draw');
        $('#turn-display').html('Game Over - Draw');
        alert("Game ended in a draw by agreement!");
      }
    },

    takeBackMove: function() {
      // Only allow takeback in PvP mode and when it's the player's turn
      if (main.variables.gameMode !== 'pvp') {
        alert('Take back is only available in Player vs Player mode.');
        return;
      }
      
      // Need at least 2 moves (one full turn) to take back
      if (main.variables.moveList.length < 1) {
        alert('Not enough moves to take back.');
        return;
      }
      
      // Stop the clock while taking back
      main.methods.stopClock();
      
      // Get the last move entry (which contains both white and black moves for a full turn)
      const lastMoveEntry = main.variables.moveList[main.variables.moveList.length - 1];
      
      // Restore black's move if it exists
      if (lastMoveEntry.blackMove) {
        const blackMove = lastMoveEntry.blackMove;
        const pieceName = blackMove.piece;
        const fromPos = blackMove.from;
        const toPos = blackMove.to;
        const capturedPiece = blackMove.captured;
        
        // Move piece back
        main.variables.pieces[pieceName].position = fromPos;
        main.variables.pieces[pieceName].moved = false;
        
        // Restore captured piece if any
        if (capturedPiece) {
          main.variables.pieces[capturedPiece].captured = false;
          main.variables.pieces[capturedPiece].position = toPos;
        }
      }
      
      // Restore white's move
      if (lastMoveEntry.whiteMove) {
        const whiteMove = lastMoveEntry.whiteMove;
        const pieceName = whiteMove.piece;
        const fromPos = whiteMove.from;
        const toPos = whiteMove.to;
        const capturedPiece = whiteMove.captured;
        
        // Move piece back
        main.variables.pieces[pieceName].position = fromPos;
        main.variables.pieces[pieceName].moved = false;
        
        // Restore captured piece if any
        if (capturedPiece) {
          main.variables.pieces[capturedPiece].captured = false;
          main.variables.pieces[capturedPiece].position = toPos;
        }
      }
      
      // Remove the last move entry
      main.variables.moveList.pop();
      
      // Restore turn to white (since we're taking back a full turn)
      main.variables.turn = 'w';
      
      // Restore en passant target (clear for simplicity)
      main.variables.enPassantTarget = null;
      
      // Restore half move clock (approximate - subtract 2)
      main.variables.halfMoveClock = Math.max(0, main.variables.halfMoveClock - 2);
      
      // Remove last two entries from position history
      main.variables.positionHistory = main.variables.positionHistory.slice(0, -2);
      
      // Re-render the board
      main.methods.renderBoard();
      
      // Update turn display
      $('#turn-display').html("It's White's Turn");
      $('#resign-btn').html('Resign (White)');
      
      // Update game state
      main.variables.gameState = 'normal';
      $('#status-display').html('').removeClass();
      
      // Update clock display
      main.methods.updateClockDisplay();
      
      // Update active clock
      main.methods.updateClockActive();
      
      // Enable takeback button if there are still moves to undo
      $('#takeback-btn').prop('disabled', main.variables.moveList.length < 1);
      
      // Restart clock for white's turn
      if (main.variables.gameMode === 'pvp') {
        main.methods.startClock();
      }
    },

    resign: function() {
      if (confirm("Resign the game? " + (main.variables.turn === 'w' ? 'White' : 'Black') + " will lose and " + (main.variables.turn === 'w' ? 'Black' : 'White') + " wins.")) {
        main.variables.gameState = 'resigned';
        $('#status-display').html((main.variables.turn === 'w' ? 'WHITE' : 'BLACK') + ' RESIGNED - ' + (main.variables.turn === 'w' ? 'BLACK' : 'WHITE') + ' WINS').removeClass().addClass('checkmate');
        $('#turn-display').html('Game Over - ' + (main.variables.turn === 'w' ? 'Black' : 'White') + ' Wins');
        alert((main.variables.turn === 'w' ? 'White' : 'Black') + ' has resigned. ' + (main.variables.turn === 'w' ? 'Black' : 'White') + ' wins!');
      }
    },

    saveGame: function() {
      const gameState = {
        variables: {
          pieces: main.variables.pieces,
          turn: main.variables.turn,
          moveList: main.variables.moveList,
          capturedPieces: main.variables.capturedPieces,
          gameMode: main.variables.gameMode,
          cpuDifficulty: main.variables.cpuDifficulty,
          gameState: main.variables.gameState,
          whiteKingMoved: main.variables.whiteKingMoved,
          blackKingMoved: main.variables.blackKingMoved,
          whiteRookA_Moved: main.variables.whiteRookA_Moved,
          whiteRookH_Moved: main.variables.whiteRookH_Moved,
          blackRookA_Moved: main.variables.blackRookA_Moved,
          blackRookH_Moved: main.variables.blackRookH_Moved,
          enPassantTarget: main.variables.enPassantTarget,
          halfMoveClock: main.variables.halfMoveClock,
          fullMoveNumber: main.variables.fullMoveNumber,
          whiteTime: main.variables.whiteTime,
          blackTime: main.variables.blackTime,
          clockRunning: main.variables.clockRunning,
          boardFlipped: main.variables.boardFlipped,
          lastMove: main.variables.lastMove,
          promotionPending: main.variables.promotionPending,
          promotionSquare: main.variables.promotionSquare,
          promotionColor: main.variables.promotionColor
        },
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chess-game-' + new Date().toISOString().slice(0, 19).replace(/:/g, '-') + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Game saved successfully!');
    },

    loadGame: function() {
      document.getElementById('load-file-input').click();
    },

    handleLoadFile: function(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const gameState = JSON.parse(e.target.result);
          
          // Restore all variables
          main.variables.pieces = gameState.variables.pieces;
          main.variables.turn = gameState.variables.turn;
          main.variables.moveList = gameState.variables.moveList;
          main.variables.capturedPieces = gameState.variables.capturedPieces;
          main.variables.gameMode = gameState.variables.gameMode;
          main.variables.cpuDifficulty = gameState.variables.cpuDifficulty;
          main.variables.gameState = gameState.variables.gameState;
          main.variables.whiteKingMoved = gameState.variables.whiteKingMoved;
          main.variables.blackKingMoved = gameState.variables.blackKingMoved;
          main.variables.whiteRookA_Moved = gameState.variables.whiteRookA_Moved;
          main.variables.whiteRookH_Moved = gameState.variables.whiteRookH_Moved;
          main.variables.blackRookA_Moved = gameState.variables.blackRookA_Moved;
          main.variables.blackRookH_Moved = gameState.variables.blackRookH_Moved;
          main.variables.enPassantTarget = gameState.variables.enPassantTarget;
          main.variables.halfMoveClock = gameState.variables.halfMoveClock;
          main.variables.fullMoveNumber = gameState.variables.fullMoveNumber;
          main.variables.whiteTime = gameState.variables.whiteTime;
          main.variables.blackTime = gameState.variables.blackTime;
          main.variables.clockRunning = gameState.variables.clockRunning;
          main.variables.boardFlipped = gameState.variables.boardFlipped;
          main.variables.lastMove = gameState.variables.lastMove;
          main.variables.promotionPending = gameState.variables.promotionPending;
          main.variables.promotionSquare = gameState.variables.promotionSquare;
          main.variables.promotionColor = gameState.variables.promotionColor;
          
          // Update UI elements
          $('#game-mode').val(main.variables.gameMode);
          $('#cpu-difficulty').val(main.variables.cpuDifficulty);
          $('#difficulty-label').text(main.variables.cpuDifficulty);
          
          // Update Stockfish difficulty
          if (main.variables.stockfish) {
            main.variables.stockfish.postMessage('setoption name Skill Level value ' + main.variables.cpuDifficulty);
          }
          
          // Re-render the board
          main.methods.renderBoard();
          main.methods.updateBoardLabels();
          main.methods.updateMoveListDisplay();
          main.methods.updateCapturedPieces();
          main.methods.updateClockDisplay();
          main.methods.updateClockActive();
          
          // Update turn display
          $('#turn-display').html("It's " + (main.variables.turn === 'w' ? "White's" : "Black's") + " Turn");
          $('#resign-btn').html('Resign (' + (main.variables.turn === 'w' ? 'White' : 'Black') + ')');
          
          // Update game status
          if (main.variables.gameState === 'check') {
            $('#status-display').html((main.variables.turn === 'w' ? 'WHITE' : 'BLACK') + ' IS IN CHECK').removeClass().addClass('check');
          } else if (main.variables.gameState === 'checkmate') {
            $('#status-display').html((main.variables.turn === 'w' ? 'WHITE' : 'BLACK') + ' IS CHECKMATED - ' + (main.variables.turn === 'w' ? 'BLACK' : 'WHITE') + ' WINS').removeClass().addClass('checkmate');
          } else if (main.variables.gameState === 'stalemate') {
            $('#status-display').html('STALEMATE - DRAW').removeClass().addClass('stalemate');
          } else if (main.variables.gameState === 'draw') {
            $('#status-display').html('DRAW BY INSUFFICIENT MATERIAL').removeClass().addClass('stalemate');
          } else {
            $('#status-display').html('').removeClass();
          }
          
          // Update takeback button
          $('#takeback-btn').prop('disabled', main.variables.moveList.length < 1);
          
          // Restart clock if needed
          if (main.variables.clockRunning && main.variables.gameMode === 'pvp') {
            main.methods.startClock();
          }
          
          // Trigger CPU move if it's CPU's turn
          if ((main.variables.gameMode === 'pvc' && main.variables.turn === 'b') || 
              (main.variables.gameMode === 'cvp' && main.variables.turn === 'w')) {
            setTimeout(() => main.methods.triggerCpuMove(), 500);
          }
          
          alert('Game loaded successfully!');
        } catch (error) {
          console.error('Error loading game:', error);
          alert('Error loading game file: ' + error.message);
        }
      };
      reader.readAsText(file);
      
      // Reset file input so same file can be loaded again
      event.target.value = '';
    },

  }
};

$(document).ready(function() {
  main.methods.gamesetup();

  $('.gamecell').click(function(e) {

    if (main.variables.gameState === 'checkmate' || main.variables.gameState === 'stalemate' || main.variables.gameState === 'draw' || main.variables.gameState === 'resigned') {
      return;
    }

    // Convert display position to board position
    let displayPos = e.target.id;
    let boardPos = main.methods.getBoardPosition(displayPos);

    var selectedpiece = {
      name: '',
      id: main.variables.selectedpiece
    };

    if (main.variables.selectedpiece == ''){
      selectedpiece.name = $('#' + displayPos).attr('chess');
    } else {
      let displaySelectedPos = main.methods.getDisplayPosition(main.variables.selectedpiece);
      selectedpiece.name = $('#' + displaySelectedPos).attr('chess');
    }

    var target = {
      name: $(this).attr('chess'),
      id: boardPos
    };

    if (main.variables.selectedpiece == '' && target.name.slice(0,1) == main.variables.turn) { 

      
      // Find the piece's actual board position (not the display square's board position)
      let pieceBoardPos = null;
      for (let [key, piece] of Object.entries(main.variables.pieces)) {
        if (piece.name === target.name) {
          pieceBoardPos = key;
          break;
        }
      }
      main.variables.selectedpiece = pieceBoardPos || boardPos;
      main.variables.highlighted = main.variables.highlighted.filter(opt => main.methods.isMoveValid(piece, opt));
      main.methods.togglehighlight(main.variables.highlighted);
      $('.' + 'green').removeClass('green');
      main.methods.togglehighlight(main.variables.highlighted);

    } else if (main.variables.selectedpiece !='' && target.name == 'null') { 

      
      let isEnPassantCapture = false;
      if (main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(target.id.split('_')[0]);
        let targetRank = parseInt(target.id.split('_')[1]);
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassantCapture = true;
        }
      }

      
      if (main.variables.highlighted.indexOf(target.id) === -1 || !main.methods.isMoveValid(selectedpiece.name, target.id)) {
        return; 
      }

      if (isEnPassantCapture) {
        
        main.methods.capture(target);
        main.methods.endturn();
      } else if (selectedpiece.name == 'w_king' || selectedpiece.name == 'b_king'){
        
        let t0 = (selectedpiece.name == 'w_king');
        let t1 = (selectedpiece.name == 'b_king');
        let t2 = (main.variables.pieces[selectedpiece.name].moved == false);
        let t3 = (main.variables.pieces['b_rook2'].moved == false);
        let t4 = (main.variables.pieces['w_rook2'].moved == false);
        let t5 = (target.id == '7_8');
        let t6 = (target.id == '7_1');

        if (t0 && t2 && t4 && t6){ 

          let k_position = '5_1';
          let k_target = '7_1';
          let r_position = '8_1';
          let r_target = '6_1';

          main.variables.pieces['w_king'].position = '7_1';
          main.variables.pieces['w_king'].moved = true;
          let displayKPos = main.methods.getDisplayPosition(k_position);
          let displayKTarget = main.methods.getDisplayPosition(k_target);
          let displayRPos = main.methods.getDisplayPosition(r_position);
          let displayRTarget = main.methods.getDisplayPosition(r_target);
          
          $('#'+displayKPos).html('');
          $('#'+displayKPos).attr('chess','null');
          $('#'+displayKTarget).html(main.variables.pieces['w_king'].img);
          $('#'+displayKTarget).attr('chess','w_king');

          main.variables.pieces['w_rook2'].position = '6_1';
          main.variables.pieces['w_rook2'].moved = true;
          $('#'+displayRPos).html('');
          $('#'+displayRPos).attr('chess','null');
          $('#'+displayRTarget).html(main.variables.pieces['w_rook2'].img);
          $('#'+displayRTarget).attr('chess','w_rook2');

          
          let moveSound = document.getElementById('move-sound');
          if (moveSound) {
            moveSound.currentTime = 0;
            moveSound.play().catch(e => console.log('Move sound play failed:', e));
          }
          
          
          main.methods.addMoveToList(selectedpiece.name, k_position, k_target, false, false);
          
          main.methods.endturn();

        } else if (t1 && t2 && t3 && t5){ 

          let k_position = '5_8';
          let k_target = '7_8';
          let r_position = '8_8';
          let r_target = '6_8';

          
          main.variables.pieces['b_king'].position = '7_8';
          main.variables.pieces['b_king'].moved = true;
          let displayKPos = main.methods.getDisplayPosition(k_position);
          let displayKTarget = main.methods.getDisplayPosition(k_target);
          let displayRPos = main.methods.getDisplayPosition(r_position);
          let displayRTarget = main.methods.getDisplayPosition(r_target);
          
          $('#'+displayKPos).html('');
          $('#'+displayKPos).attr('chess','null');
          $('#'+displayKTarget).html(main.variables.pieces['b_king'].img);
          $('#'+displayKTarget).attr('chess','b_king');

          main.variables.pieces['b_rook2'].position = '6_8';
          main.variables.pieces['b_rook2'].moved = true;
          $('#'+displayRPos).html('');
          $('#'+displayRPos).attr('chess','null');
          $('#'+displayRTarget).html(main.variables.pieces['b_rook2'].img);
          $('#'+displayRTarget).attr('chess','b_rook2');

          
          let moveSound = document.getElementById('move-sound');
          if (moveSound) {
            moveSound.currentTime = 0;
            moveSound.play().catch(e => console.log('Move sound play failed:', e));
          }
          
          
          main.methods.addMoveToList(selectedpiece.name, k_position, k_target, false, false);
          
          main.methods.endturn();
          
        } else { 
          main.methods.move(target);
          main.methods.endturn();
        }

      } else { 

        main.methods.move(target);
        main.methods.endturn();

      }
        
    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) != target.name.slice(0,1)){ 
      
      if (selectedpiece.id != target.id && main.variables.highlighted.indexOf(target.id) != (-1)) { 
        
        
        if (!main.methods.isMoveValid(selectedpiece.name, target.id)) {
          return; 
        }
        
        
        main.methods.capture(target);
        main.methods.endturn();
        
      }

    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) == target.name.slice(0,1)){ 

      
      main.methods.togglehighlight(main.variables.highlighted);
      main.variables.highlighted.length = 0;

      main.variables.selectedpiece = boardPos;
      main.methods.moveoptions(target.name);

    }

  });

  $('body').contextmenu(function(e) {
    e.preventDefault();
  });

  // Game mode change handler
  $('#game-mode').change(function() {
    main.methods.setGameMode($(this).val());
  });

  // CPU difficulty change handler
  $('#cpu-difficulty').change(function() {
    main.methods.setCpuDifficulty(parseInt($(this).val()));
  });

  $('body').contextmenu(function(e) {
    e.preventDefault();
  });

});