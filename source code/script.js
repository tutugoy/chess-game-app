let main = {

  variables: {
    turn: 'w',
    selectedpiece: '',
    highlighted: [],
    gameState: 'normal',
    moveList: [],
    // New variables for advanced rules
    enPassantTarget: null, // { file: x, rank: y, color: 'w'/'b' }
    positionHistory: [], // For threefold repetition
    halfMoveClock: 0, // For 50-move rule (half-moves since last pawn move/capture)
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
      $('.gamecell').attr('chess', 'null');
      for (let gamepiece in main.variables.pieces) {
        $('#' + main.variables.pieces[gamepiece].position).html(main.variables.pieces[gamepiece].img);
        $('#' + main.variables.pieces[gamepiece].position).attr('chess', gamepiece);
      }
    },

    moveoptions: function(selectedpiece) {

      let position = { x: '', y: '' };
      position.x = main.variables.pieces[selectedpiece].position.split('_')[0];
      position.y = main.variables.pieces[selectedpiece].position.split('_')[1];

      // these options need to be var instead of let
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
          
          // Add en passant capture squares
          if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'b') {
            let ep = main.variables.enPassantTarget;
            let pawnFile = parseInt(position.x);
            let pawnRank = parseInt(position.y);
            // En passant target is 1 rank ahead for white pawn (the landing square)
            if (ep.rank === pawnRank + 1 && (ep.file === pawnFile - 1 || ep.file === pawnFile + 1)) {
              coordinates.push(ep.file + '_' + ep.rank);
            }
          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;

        case 'b_pawn':

          // calculate pawn options
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
          
          // Add en passant capture squares
          if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'w') {
            let ep = main.variables.enPassantTarget;
            let pawnFile = parseInt(position.x);
            let pawnRank = parseInt(position.y);
            // En passant target is 1 rank behind for black pawn (the landing square)
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

    options: function(startpoint, coordinates, piecetype) { // first check if any of the possible coordinates is out of bounds;
        
      coordinates = coordinates.filter(val => {
        let pos = { x: 0, y: 0 };
        pos.x = parseInt(val.split('_')[0]);
        pos.y = parseInt(val.split('_')[1]);

        if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { // if it is not out of bounds, return the coordinate;
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
              
              // Check if this is an en passant capture square
              let isEnPassant = false;
              if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'b') {
                let ep = main.variables.enPassantTarget;
                if (parseInt(coordinate[0]) === ep.file && parseInt(coordinate[1]) === ep.rank) {
                  isEnPassant = true;
                }
              }
              
              if (coordinate[0] < sp.x || coordinate[0] > sp.x){ // if the coordinate is on either side of the center, check if it has an opponent piece on it;
                return (isEnPassant || ($('#' + val).attr('chess') != 'null' && ($('#' + val).attr('chess')).slice(0,1) == 'b')); // return coordinates with opponent pieces on them or en passant
              } else { // else if the coordinate is in the center;
                if (coordinate[1] == (parseInt(sp.y) + 2) && $('#' + sp.x + '_' + (parseInt(sp.y) + 1)).attr('chess') != 'null'){
                  // do nothing if this is the pawns first move, and there is a piece in front of the 2nd coordinate;
                } else {
                  return ($('#' + val).attr('chess') == 'null'); // otherwise return the coordinate if there is no chess piece on it;
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
            
            // Check if this is an en passant capture square
            let isEnPassant = false;
            if (main.variables.enPassantTarget && main.variables.enPassantTarget.color === 'w') {
              let ep = main.variables.enPassantTarget;
              if (parseInt(coordinate[0]) === ep.file && parseInt(coordinate[1]) === ep.rank) {
                isEnPassant = true;
              }
            }
            
            if (coordinate[0] < sp.x || coordinate[0] > sp.x){ // if the coordinate is on either side of the center, check if it has an opponent piece on it;
              return (isEnPassant || ($('#' + val).attr('chess') != 'null' && ($('#' + val).attr('chess')).slice(0,1) == 'w')); // return coordinates with opponent pieces on them or en passant
            } else { // else if the coordinate is in the center;
              if (coordinate[1] == (parseInt(sp.y) - 2) && $('#' + sp.x + '_' + (parseInt(sp.y) - 1)).attr('chess') != 'null'){
                // do nothing if this is the pawns first move, and there is a piece in front of the 2nd coordinate;
              } else {
                return ($('#' + val).attr('chess') == 'null'); // otherwise return the coordinate if there is no chess piece on it;
              }
            }
          });

          break;
      }      

      return coordinates;
    },

    w_options: function (position,coordinates) {
      
      let flag = false;
      
      coordinates = coordinates.map(function(val){ // convert the x,y into actual grid id coordinates;
          return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
        }).filter(val => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split('_')[0]);
          pos.y = parseInt(val.split('_')[1]);
  
          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { // if it is not out of bounds, return the coordinate;
            return val;
          }
        }).filter(val => { // algorithm to determine line-of-sight movement options for bishop/rook/queen;
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
      
      coordinates = coordinates.map(function(val){ // convert the x,y into actual grid id coordinates;
          return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
        }).filter(val => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split('_')[0]);
          pos.y = parseInt(val.split('_')[1]);
  
          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { // if it is not out of bounds, return the coordinate;
            return val;
          }
        }).filter(val => { // algorithm to determine line-of-sight movement options for bishop/rook/queen;
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
      
      // Check for en passant capture
      if (isPawn && main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(target.id.split('_')[0]);
        let targetRank = parseInt(target.id.split('_')[1]);
        
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassant = true;
          // Remove the captured pawn from the board
          // If white pawn moved (ep.color === 'w'), captured pawn is on rank ABOVE target (ep.rank + 1)
          // If black pawn moved (ep.color === 'b'), captured pawn is on rank BELOW target (ep.rank - 1)
          let capturedPawnRank = ep.color === 'w' ? ep.rank + 1 : ep.rank - 1;
          let capturedPawnPos = ep.file + '_' + capturedPawnRank;
          $('#' + capturedPawnPos).html('');
          $('#' + capturedPawnPos).attr('chess', 'null');
          
          // Find and mark the captured pawn
          for (let p in main.variables.pieces) {
            if (main.variables.pieces[p].position === capturedPawnPos && main.variables.pieces[p].type.includes('pawn')) {
              main.variables.pieces[p].captured = true;
              break;
            }
          }
        }
      }
      
      //new cell
      $('#' + target.id).html(main.variables.pieces[selectedpiece.name].img);
      $('#' + target.id).attr('chess',selectedpiece.name);
      //old cell
      $('#' + selectedpiece.id).html('');
      $('#' + selectedpiece.id).attr('chess','null');
      //moved piece
      main.variables.pieces[selectedpiece.name].position = target.id;
      main.variables.pieces[selectedpiece.name].moved = true;
      // captured piece
      if (!isEnPassant) {
        main.variables.pieces[target.name].captured = true;
      }
      
      // Update half-move clock: reset on capture or pawn move
      if (isPawn || !isEnPassant) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
      
      // Add move to move list
      main.methods.addMoveToList(selectedpiece.name, selectedpiece.id, target.id, true, false);
      
      // Clear en passant target after any move
      main.variables.enPassantTarget = null;
      
      // Set new en passant target if pawn moved two squares
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

      // new cell
      $('#' + target.id).html(main.variables.pieces[selectedpiece].img);
      $('#' + target.id).attr('chess',selectedpiece);
      // old cell
      $('#' + main.variables.selectedpiece).html('');
      $('#' + main.variables.selectedpiece).attr('chess','null');
      main.variables.pieces[selectedpiece].position = target.id;
      main.variables.pieces[selectedpiece].moved = true;
      
      // Update half-move clock: reset on pawn move, increment otherwise
      if (isPawn) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
      
      // Add move to move list
      main.methods.addMoveToList(selectedpiece, main.variables.selectedpiece, target.id, false, false);
      
      // Clear en passant target after any move
      main.variables.enPassantTarget = null;
      
      // Set new en passant target if pawn moved two squares
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

        // Update resign button text
        $('#resign-btn').html('Resign (Black)');

        // Update position history for threefold repetition
        main.methods.updatePositionHistory();
        
        // Check for threefold repetition
        if (main.methods.checkThreefoldRepetition()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY THREEFOLD REPETITION').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by threefold repetition!');
          return;
        }
        
        // Check for 50-move rule
        if (main.methods.checkFiftyMoveRule()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY 50-MOVE RULE').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by 50-move rule!');
          return;
        }

        main.methods.updateGameState();

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

        // Update resign button text
        $('#resign-btn').html('Resign (White)');

        // Update position history for threefold repetition
        main.methods.updatePositionHistory();
        
        // Check for threefold repetition
        if (main.methods.checkThreefoldRepetition()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY THREEFOLD REPETITION').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by threefold repetition!');
          return;
        }
        
        // Check for 50-move rule
        if (main.methods.checkFiftyMoveRule()) {
          main.variables.gameState = 'draw';
          $('#status-display').html('DRAW BY 50-MOVE RULE').removeClass().addClass('draw');
          $('#turn-display').html('Game Over - Draw');
          alert('Draw by 50-move rule!');
          return;
        }

        main.methods.updateGameState();

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
      
      // Convert position to algebraic notation
      let fromFile = String.fromCharCode(96 + parseInt(fromPos.split('_')[0]));
      let fromRank = fromPos.split('_')[1];
      let toFile = String.fromCharCode(96 + parseInt(toPos.split('_')[0]));
      let toRank = toPos.split('_')[1];
      
      let moveNotation = '';
      
      // Piece letter (K, Q, R, B, N, or empty for pawn)
      let pieceLetter = '';
      if (pieceType === 'king') pieceLetter = 'K';
      else if (pieceType === 'queen') pieceLetter = 'Q';
      else if (pieceType === 'rook') pieceLetter = 'R';
      else if (pieceType === 'bishop') pieceLetter = 'B';
      else if (pieceType === 'knight') pieceLetter = 'N';
      
      // Check for castling
      if (pieceType === 'king' && Math.abs(parseInt(fromPos.split('_')[0]) - parseInt(toPos.split('_')[0])) === 2) {
        if (toPos.split('_')[0] === '7') {
          moveNotation = 'O-O'; // Kingside castle
        } else if (toPos.split('_')[0] === '3') {
          moveNotation = 'O-O-O'; // Queenside castle
        }
      } else {
        // Regular move
        moveNotation = pieceLetter;
        
        // Add capture indicator
        if (captured) {
          if (pieceType === 'pawn') {
            moveNotation += fromFile;
          }
          moveNotation += 'x';
        }
        
        moveNotation += toFile + toRank;
        
        // Add promotion notation
        if (promotion) {
          moveNotation += '=Q'; // Default to queen promotion
        }
      }
      
      // Check for check/checkmate
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
      
      // Add to move list
      let moveNumber = Math.floor(main.variables.moveList.length / 2) + 1;
      
      if (color === 'w') {
        // White's move - start new move
        main.variables.moveList.push({
          number: moveNumber,
          white: moveNotation,
          black: ''
        });
      } else {
        // Black's move - complete the pair
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
      
      // Update the move list display
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
      
      // Scroll to bottom
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
      
      // Check for en passant capture
      if (isPawn && main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(targetPos.split('_')[0]);
        let targetRank = parseInt(targetPos.split('_')[1]);
        
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassant = true;
          // If white pawn moved (ep.color === 'w'), captured pawn is on rank ABOVE target (ep.rank + 1)
          // If black pawn moved (ep.color === 'b'), captured pawn is on rank BELOW target (ep.rank - 1)
          let capturedPawnRank = ep.color === 'w' ? ep.rank + 1 : ep.rank - 1;
          capturedPawnPos = ep.file + '_' + capturedPawnRank;
        }
      }
      
      let originalPos = main.variables.pieces[piece].position;
      let capturedPieceName = null;
      let capturedPieceCaptured = false;
      
      // Simulate the move
      main.variables.pieces[piece].position = targetPos;
      
      if (piece === kingName) {
        kingPos = targetPos;
      }
      
      // For en passant, temporarily mark the captured pawn as captured
      if (isEnPassant && capturedPawnPos) {
        for (let p in main.variables.pieces) {
          if (main.variables.pieces[p].position === capturedPawnPos && main.variables.pieces[p].type.includes('pawn')) {
            capturedPieceName = p;
            capturedPieceCaptured = main.variables.pieces[p].captured;
            main.variables.pieces[p].captured = true;
            break;
          }
        }
      }
      
      let safe = !main.methods.isKingInCheck(kingPos, color);
      
      // Restore state
      main.variables.pieces[piece].position = originalPos;
      if (isEnPassant && capturedPieceName) {
        main.variables.pieces[capturedPieceName].captured = capturedPieceCaptured;
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
        // En passant captures
        if (main.variables.enPassantTarget) {
          let ep = main.variables.enPassantTarget;
          // Only allow en passant if the target pawn is the opposite color
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
      // Reset all piece positions to initial state
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

      // Reset game state variables
      main.variables.turn = 'w';
      main.variables.selectedpiece = '';
      main.variables.highlighted = [];
      main.variables.gameState = 'normal';
      main.variables.moveList = [];
      // Reset new chess rule variables
      main.variables.enPassantTarget = null;
      main.variables.positionHistory = [];
      main.variables.halfMoveClock = 0;

      // Clear any highlights on the board
      $('.gamecell').removeClass('green');

      // Clear all board cells to fix remnant icon issue
      $('.gamecell').html('');
      $('.gamecell').attr('chess', 'null');

      // Reset the UI
      $('#turn-display').html("It's White's Turn!");
      $('#status-display').html('').removeClass('check checkmate stalemate draw');
      $('#move-list').html('');
      $('#resign-btn').html('Resign (White)');

      // Re-setup the game board
      main.methods.gamesetup();
    },

    // ===== NEW CHESS RULES =====

    // Generate a position key for threefold repetition detection
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

    // Check for threefold repetition
    checkThreefoldRepetition: function() {
      let key = main.methods.getPositionKey();
      let count = 0;
      for (let i = 0; i < main.variables.positionHistory.length; i++) {
        if (main.variables.positionHistory[i] === key) count++;
      }
      return count >= 2; // Current position + 2 previous = 3 total
    },

    // Check for 50-move rule
    checkFiftyMoveRule: function() {
      return main.variables.halfMoveClock >= 100; // 50 moves = 100 half-moves
    },

    // Update position history for threefold repetition
    updatePositionHistory: function() {
      let key = main.methods.getPositionKey();
      main.variables.positionHistory.push(key);
    },

    // Update half-move clock for 50-move rule
    updateHalfMoveClock: function(isPawnMove, isCapture) {
      if (isPawnMove || isCapture) {
        main.variables.halfMoveClock = 0;
      } else {
        main.variables.halfMoveClock++;
      }
    },

    // Reset en passant target
    resetEnPassantTarget: function() {
      main.variables.enPassantTarget = null;
    },

    // Set en passant target after a pawn moves two squares
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

    // Check if a move is an en passant capture
    isEnPassantCapture: function(pawn, targetPos) {
      if (!main.variables.enPassantTarget) return false;
      let targetFile = parseInt(targetPos.split('_')[0]);
      let targetRank = parseInt(targetPos.split('_')[1]);
      return targetFile === main.variables.enPassantTarget.file && 
             targetRank === main.variables.enPassantTarget.rank &&
             pawn.type.startsWith(main.variables.enPassantTarget.color === 'w' ? 'b' : 'w');
    },

    // Handle en passant capture
    handleEnPassantCapture: function(pawn, targetPos) {
      let capturedPawnRank = pawn.type.startsWith('w') ? targetPos.split('_')[1] - 1 : parseInt(targetPos.split('_')[1]) + 1;
      let capturedPawnPos = main.variables.enPassantTarget.file + '_' + capturedPawnRank;
      
      // Find and mark the captured pawn
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

    if (main.variables.selectedpiece == '' && target.name.slice(0,1) == main.variables.turn) { // show options

      // moveoptions
      main.variables.selectedpiece = e.target.id;
      main.methods.moveoptions($(this).attr('chess'));
      
      let piece = $(this).attr('chess');
      main.variables.highlighted = main.variables.highlighted.filter(opt => main.methods.isMoveValid(piece, opt));
      main.methods.togglehighlight(main.variables.highlighted);
      $('.' + 'green').removeClass('green');
      main.methods.togglehighlight(main.variables.highlighted);

    } else if (main.variables.selectedpiece !='' && target.name == 'null') { // move selected piece piece

      // Check if this is an en passant capture
      let isEnPassantCapture = false;
      if (main.variables.enPassantTarget) {
        let ep = main.variables.enPassantTarget;
        let targetFile = parseInt(target.id.split('_')[0]);
        let targetRank = parseInt(target.id.split('_')[1]);
        if (targetFile === ep.file && targetRank === ep.rank) {
          isEnPassantCapture = true;
        }
      }

      // Check if move is valid (both legal chess move and doesn't leave king in check)
      if (main.variables.highlighted.indexOf(target.id) === -1 || !main.methods.isMoveValid(selectedpiece.name, target.id)) {
        return; // Illegal move - don't allow it
      }

      if (isEnPassantCapture) {
        // En passant capture - call capture() instead of move()
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

        if (t0 && t2 && t4 && t6){ // castle w_king

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

          // Add move to list
          main.methods.addMoveToList(selectedpiece.name, k_position, k_target, false, false);
          
          main.methods.endturn();

        } else if (t1 && t2 && t3 && t5){ // castle b_king

          let k_position = '5_8';
          let k_target = '7_8';
          let r_position = '8_8';
          let r_target = '6_8';

          // w_king
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

          // Add move to list
          main.methods.addMoveToList(selectedpiece.name, k_position, k_target, false, false);
          
          main.methods.endturn();
          
        } else { // move selectedpiece (non-castling king move)
          main.methods.move(target);
          main.methods.endturn();
        }

      } else { // else if selecedpiece.name is not white/black king than move

        main.methods.move(target);
        main.methods.endturn();

      }
        
    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) != target.name.slice(0,1)){ // capture a piece
      
      if (selectedpiece.id != target.id && main.variables.highlighted.indexOf(target.id) != (-1)) { // if it's not trying to capture pieces not in its movement range
        
        // Check if capture is valid
        if (!main.methods.isMoveValid(selectedpiece.name, target.id)) {
          return; // Illegal capture - don't allow it
        }
        
        // capture
        main.methods.capture(target);
        main.methods.endturn();
        
      }

    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) == target.name.slice(0,1)){ // toggle move options

      // toggle
      main.methods.togglehighlight(main.variables.highlighted);
      main.variables.highlighted.length = 0;

      main.variables.selectedpiece = target.id;
      main.methods.moveoptions(target.name);

    }

  });

  $('body').contextmenu(function(e) {
    e.preventDefault();
  });

});