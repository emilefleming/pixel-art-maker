(function() {
  'use strict';
  let color = 'red';
// Build a grid of pixels
  const makeBoard = function(height, width) {
    const artBoard = document.createElement('div');
    artBoard.className = 'artBoard';
    for (let i = 0; i < height; i++) {
      const row = document.createElement('div');
      for (let i = 0; i < width; i++) {
        const cell = document.createElement('div');
        row.appendChild(cell);
        row.className = 'row';
      }
      artBoard.appendChild(row);
    }
    return artBoard;
  }
  document.querySelector('main').appendChild(makeBoard(100, 100));

// Recolor pixels
  const recolor = function(event) {
    const pixel = event.target;
    if (pixel.className === 'artBoard' || pixel.className === 'row') {
      return;
    }
    pixel.style.backgroundColor = color;
    pixel.style.border = "0";
  };
  document.querySelector('.artBoard').addEventListener('click', recolor);
})();
