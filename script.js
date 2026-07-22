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
        $('#' + main.variables.pieces[gamepiece].position).html(main.variables.pieces[gamepiece].img);
        $('#' + main.variables.pieces[gamepiece].position).attr('chess', gamepiece);
      }
      
      if (main.variables.cpuColor === 'w') {
        setTimeout(() => main.methods.triggerCpuMove(), 500);
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
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'b');
          });

          break;
        case 'b_king':
        
          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'w');
          });

          break;
        case 'w_knight':

          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'b');
          });

          break;

        case 'b_knight':

          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'w');
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
              
              if (coordinate[0] < sp.x || coordinate[0] > sp.x){ 
                return (isEnPassant || ($('#' + val).attr('chess') != 'null' && ($('#' + val).attr('chess')).slice(0,1) == 'b')); 
              } else { 
                if (coordinate[1] == (parseInt(sp.y) + 2) && $('#' + sp.x + '_' + (parseInt(sp.y) + 1)).attr('chess') != 'null'){
                  
                } else {
                  return ($('#' + val).attr('chess') == 'null'); 
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
            
            if (coordinate[0] < sp.x || coordinate[0] > sp.x){ 
              return (isEnPassant || ($('#' + val).attr('chess') != 'null' && ($('#' + val).attr('chess')).slice(0,1) == 'w')); 
            } else { 
              if (coordinate[1] == (parseInt(sp.y) - 2) && $('#' + sp.x + '_' + (parseInt(sp.y) - 1)).attr('chess') != 'null'){
                
              } else {
                return ($('#' + val).attr('chess') == 'null'); 
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
            if ($('#' + val).attr('chess') == 'null'){
              console.log(val)
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'b') {
              flag = true;
              console.log(val)
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'w') {
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
            if ($('#' + val).attr('chess') == 'null'){
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'w') {
              flag = true;
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'b') {
              flag = true;
            }
          }
        });

      return coordinates;
      
    },

    capture: function (target) {
      let selectedpiece = {
        name: $('#' + main.variables.selectedpiece).attr('chess'),
        id: main.variables.selectedpiece
      };

      let pieceType = main.variables.pieces[selectedpiece.name].type;
      let isPawn = pieceType.includes('pawn');
      let isEnPassant = false;
      
      
      if (isPawn && main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(target.id.split('_')[0]);
        let targetRank = parseInt(target.id.split('_')[1]);
        
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassant = true;
          
          
          
          let capturedPawnRank = ep.color === 'w' ? ep.rank + 1 : ep.rank - 1;
          let capturedPawnPos = ep.file + '_' + capturedPawnRank;
          $('#' + capturedPawnPos).html('');
          $('#' + capturedPawnPos).attr('chess', 'null');
          
          
          for (let p in main.variables.pieces) {
            if (main.variables.pieces[p].position === capturedPawnPos && main.variables.pieces[p].type.includes('pawn')) {
              main.variables.pieces[p].captured = true;
              break;
            }
          }
        }
      }
      
      
      $('#' + target.id).html(main.variables.pieces[selectedpiece.name].img);
      $('#' + target.id).attr('chess',selectedpiece.name);
      
      $('#' + selectedpiece.id).html('');
      $('#' + selectedpiece.id).attr('chess','null');
      
      main.variables.pieces[selectedpiece.name].position = target.id;
      main.variables.pieces[selectedpiece.name].moved = true;
      
      if (!isEnPassant) {
        main.variables.pieces[target.name].captured = true;
      }
      
      
      main.methods.playCaptureSound();
      
      
      if (isPawn || !isEnPassant) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
      
      
      main.methods.addMoveToList(selectedpiece.name, selectedpiece.id, target.id, true, false);
      
      
      main.variables.enPassantTarget = null;
      
      
      if (isPawn) {
        let fromRank = parseInt(selectedpiece.id.split('_')[1]);
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
    },

    move: function (target) {

      let selectedpiece = $('#' + main.variables.selectedpiece).attr('chess');
      let pieceType = main.variables.pieces[selectedpiece].type;
      let isPawn = pieceType.includes('pawn');
      let fromRank = parseInt(main.variables.selectedpiece.split('_')[1]);
      let toRank = parseInt(target.id.split('_')[1]);

      
      $('#' + target.id).html(main.variables.pieces[selectedpiece].img);
      $('#' + target.id).attr('chess',selectedpiece);
      
      $('#' + main.variables.selectedpiece).html('');
      $('#' + main.variables.selectedpiece).attr('chess','null');
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
      
      if (color === 'w') {
        
        main.variables.moveList.push({
          number: moveNumber,
          white: moveNotation,
          black: ''
        });
      } else {
        
        if (main.variables.moveList.length > 0 && main.variables.moveList[main.variables.moveList.length - 1].black === '') {
          main.variables.moveList[main.variables.moveList.length - 1].black = moveNotation;
        } else {
          main.variables.moveList.push({
            number: moveNumber,
            white: '',
            black: moveNotation
          });
        }
      }
      
      
      main.methods.updateMoveListDisplay();
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
      let targetCell = $('#' + targetPos).attr('chess');
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
      let targetPieceImg = $('#' + targetPos).html(); 
      let targetPieceChess = $('#' + targetPos).attr('chess'); 
      
      
      main.variables.pieces[piece].position = targetPos;
      
      let pieceImg = $('#' + originalPos).html();
      $('#' + targetPos).html(pieceImg);
      $('#' + targetPos).attr('chess', piece);
      $('#' + originalPos).html('');
      $('#' + originalPos).attr('chess', 'null');
      
      if (piece === kingName) {
        kingPos = targetPos;
      }
      
      
      if (targetPieceChess !== 'null' && targetPieceChess.slice(0,1) !== color) {
        capturedPieceName = targetPieceChess;
        capturedPieceCaptured = main.variables.pieces[targetPieceChess].captured;
        main.variables.pieces[targetPieceChess].captured = true;
      }
      
      
      if (isEnPassant && capturedPawnPos) {
        for (let p in main.variables.pieces) {
          if (main.variables.pieces[p].position === capturedPawnPos && main.variables.pieces[p].type.includes('pawn')) {
            capturedPieceName = p;
            capturedPieceCaptured = main.variables.pieces[p].captured;
            main.variables.pieces[p].captured = true;
            
            $('#' + capturedPawnPos).html('');
            $('#' + capturedPawnPos).attr('chess', 'null');
            break;
          }
        }
      }
      
      let safe = !main.methods.isKingInCheck(kingPos, color);
      
      
      main.variables.pieces[piece].position = originalPos;
      
      $('#' + originalPos).html(pieceImg);
      $('#' + originalPos).attr('chess', piece);
      $('#' + targetPos).html(targetPieceImg);
      $('#' + targetPos).attr('chess', targetPieceChess);
      
      
      if (capturedPieceName && !isEnPassant) {
        main.variables.pieces[capturedPieceName].captured = capturedPieceCaptured;
      }
      
      if (isEnPassant && capturedPieceName) {
        main.variables.pieces[capturedPieceName].captured = capturedPieceCaptured;
        
        let capturedPawnImg = main.variables.pieces[capturedPieceName].img;
        $('#' + capturedPawnPos).html(capturedPawnImg);
        $('#' + capturedPawnPos).attr('chess', capturedPieceName);
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
          moves.push(x + '_' + (y + dir));
          if (!main.variables.pieces[piece].moved && y + 2 * dir >= 1 && y + 2 * dir <= 8) {
            if ($('#' + x + '_' + (y + dir)).attr('chess') === 'null') {
              moves.push(x + '_' + (y + 2 * dir));
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
            moves.push(nx + '_' + ny);
            if ($('#' + nx + '_' + ny).attr('chess') !== 'null') break;
          }
        });
      }
      if (type.includes('bishop') || type.includes('queen')) {
        [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(dir => {
          for (let i = 1; i < 8; i++) {
            let nx = x + dir[0] * i, ny = y + dir[1] * i;
            if (nx < 1 || nx > 8 || ny < 1 || ny > 8) break;
            moves.push(nx + '_' + ny);
            if ($('#' + nx + '_' + ny).attr('chess') !== 'null') break;
          }
        });
      }

      return moves;
    },

    togglehighlight: function(options) {
      options.forEach(function(element, index, array) {
        $('#' + element).toggleClass("green");
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
      
      main.variables.isCpuThinking = false;
      
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

      
      main.methods.gamesetup();
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
      if (typeof Stockfish !== 'undefined') {
        main.variables.stockfish = Stockfish();
        main.variables.stockfish.onmessage = function(event) {
          let line = event.data;
          if (line.startsWith('bestmove')) {
            let move = line.split(' ')[1];
            if (move && move !== '(none)') {
              main.methods.makeCpuMove(move);
            }
            main.variables.isCpuThinking = false;
            main.methods.updateGameState();
          }
        };
      }
    },

    makeCpuMove: function(uciMove) {
      let fromFile = uciMove.charCodeAt(0) - 96;
      let fromRank = parseInt(uciMove[1]);
      let toFile = uciMove.charCodeAt(2) - 96;
      let toRank = parseInt(uciMove[3]);
      
      let fromPos = fromFile + '_' + fromRank;
      let toPos = toFile + '_' + toRank;
      
      let pieceName = $('#' + fromPos).attr('chess');
      if (!pieceName || pieceName === 'null') return;
      
      let target = { name: $('#' + toPos).attr('chess'), id: toPos };
      
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
        let depth = parseInt($('#cpu-difficulty').val()) || 15;
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

    setCpuDifficulty: function(difficulty) {
      main.variables.cpuDifficulty = difficulty || 20;
      if (main.variables.stockfish) {
        main.variables.stockfish.postMessage('setoption name Skill Level value ' + main.variables.cpuDifficulty);
      }
    },

    offerDraw: function() {
      if (confirm("Offer a draw? The game will end in a draw if accepted.")) {
        main.variables.gameState = 'draw';
        $('#status-display').html('DRAW BY AGREEMENT').removeClass().addClass('draw');
        $('#turn-display').html('Game Over - Draw');
        alert("Game ended in a draw by agreement!");
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

  }
};

$(document).ready(function() {
  main.methods.gamesetup();

  $('.gamecell').click(function(e) {

    if (main.variables.gameState === 'checkmate' || main.variables.gameState === 'stalemate' || main.variables.gameState === 'draw' || main.variables.gameState === 'resigned') {
      return;
    }

    var selectedpiece = {
      name: '',
      id: main.variables.selectedpiece
    };

    if (main.variables.selectedpiece == ''){
      selectedpiece.name = $('#' + e.target.id).attr('chess');
    } else {
      selectedpiece.name = $('#' + main.variables.selectedpiece).attr('chess');
    }

    var target = {
      name: $(this).attr('chess'),
      id: e.target.id
    };

    if (main.variables.selectedpiece == '' && target.name.slice(0,1) == main.variables.turn) { 

      
      main.variables.selectedpiece = e.target.id;
      main.methods.moveoptions($(this).attr('chess'));
      
      let piece = $(this).attr('chess');
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
          $('#'+k_position).html('');
          $('#'+k_position).attr('chess','null');
          $('#'+k_target).html(main.variables.pieces['w_king'].img);
          $('#'+k_target).attr('chess','w_king');

          main.variables.pieces['w_rook2'].position = '6_1';
          main.variables.pieces['w_rook2'].moved = true;
          $('#'+r_position).html('');
          $('#'+r_position).attr('chess','null');
          $('#'+r_target).html(main.variables.pieces['w_rook2'].img);
          $('#'+r_target).attr('chess','w_rook2');

          
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
          $('#'+k_position).html('');
          $('#'+k_position).attr('chess','null');
          $('#'+k_target).html(main.variables.pieces['b_king'].img);
          $('#'+k_target).attr('chess','b_king');

          main.variables.pieces['b_rook2'].position = '6_8';
          main.variables.pieces['b_rook2'].moved = true;
          $('#'+r_position).html('');
          $('#'+r_position).attr('chess','null');
          $('#'+r_target).html(main.variables.pieces['b_rook2'].img);
          $('#'+r_target).attr('chess','b_rook2');

          
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

      main.variables.selectedpiece = target.id;
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