# Javascript Chess Game
### Credit: Abdul at THE SOLUTION HUB

A fully-featured chess game built with vanilla JavaScript, jQuery, and CSS. Features complete standard chess rules plus advanced tournament rules.

## Features Implemented

### Core Chess Rules
- **Standard piece movement**: King, Queen, Rook, Bishop, Knight, Pawn
- **Capture mechanics**: Standard captures with algebraic notation (e.g., `exd5`, `Nxf3`)
- **Check detection**: Real-time check status display
- **Checkmate detection**: Automatic game end with `#` notation
- **Stalemate detection**: Draw when no legal moves and not in check
- **Castling**: Kingside (O-O) and Queenside (O-O-O) with full validation
  - King and rook must not have moved
  - Path must be clear
  - King cannot be in, move through, or end in check
- **Pawn promotion**: Automatic queen promotion on 8th/1st rank

### Advanced Rules
- **En Passant**: Capture pawn that moved two squares
  - Visual highlight of en passant target square
  - Correct capture mechanics (removes pawn from adjacent rank)
  - Only available immediately after opponent's double-move
- **Threefold Repetition**: Automatic draw detection
  - Tracks full position including castling rights and en passant
  - Draws when same position occurs 3 times
  - Alert notification on draw
- **Fifty-Move Rule**: Automatic draw detection
  - Half-move clock resets on pawn moves and captures
  - Draws after 100 half-moves (50 full moves) without progress
  - Alert notification on draw
- **Draw by Agreement**: "Offer Draw" button with confirmation
- **Resignation**: "Resign" button with confirmation dialog

### Move Validation & Safety
- **Legal move filtering**: Only highlights moves that don't leave king in check
- **King safety simulation**: Temporarily simulates moves to verify king safety
- **En passant simulation**: Correctly simulates en passant captures for validation
- **Capture simulation**: Temporarily removes captured pieces during validation
- **DOM synchronization**: Keeps DOM and piece objects in sync during simulation

### Audio System (Web Audio API)
- **Move sound**: Sine wave 440→220Hz
- **Capture sound**: Square wave 330→165Hz
- **Castle sound**: Two-tone sequence
- **Check sound**: Triangle wave 660→880Hz
- **No external dependencies**: All sounds generated programmatically

### Visual Design (8-bit/Arcade Theme)
- **Fonts**: Press Start 2P (headers) + VT323 (monospace)
- **CRT scanline overlay**: Subtle horizontal lines
- **Vignette effect**: Darkened edges
- **Pixel-perfect borders**: 2px solid with inset shadows
- **Neon glow effects**: White/amber/red text shadows
- **Hover animations**: Scale + glow on squares
- **Valid move pulse**: Animated glow on legal destinations
- **Custom scrollbars**: Arcade-styled for move list
- **Game over modal**: Alert dialogs for checkmate/stalemate/draw

### User Interface Objects
- **Turn display**: "It's White's Turn!" / "It's Black's Turn"
- **Status display**: CHECK, CHECKMATE, STALEMATE, DRAW states with pulsing animations
- **Move list panel**: Side panel with numbered moves
- **Control buttons**: Restart, Offer Draw, Resign
- **Responsive layout**: Flexbox side-by-side (board + move list)
- **Rank/file labels**: 1-8 and a-h with grid positioning

## File Structure
```
javascript-chess-game/
├── index.html      # Main HTML structure
├── script.js       # Game logic
├── style.css       # 8-bit arcade styling
└── README.markdown # This file
```

## Getting Started
1. Open `index.html` in any modern browser
2. Click a piece to select it (valid moves highlight)
3. Click a highlighted square to move
4. Use buttons: Restart Game, Offer Draw, Resign

## Controls
- **Click piece** → Select (shows legal moves)
- **Click highlighted square** → Move piece
- **Click own piece** → Switch selection
- **Restart Game** → Reset to initial position
- **Offer Draw** → Propose draw to opponent
- **Resign** → Concede the game

## Future Enhancements
- Pawn promotion dialog (Queen/Rook/Bishop/Knight choice)
- Drag-and-drop movement
- PGN export/import
- Chess engine opponent (Stockfish)
- Online multiplayer
- Clock/timer
- Theme selector
- Sound toggle
- Keyboard navigation