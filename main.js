(function() {
  'use strict';
  let color = '#EF382B';
  let activeTool = 'draw';
// Build a grid of pixels
  const makeBoard = function(height, width) {
    const artBoard = document.createElement('div');
    artBoard.classList.add('borders', 'artBoard')
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


  const setColor = function() {
    color = document.getElementById("colorPicker").value;
  }
// Recolor pixels
  const recolor = function(pixel) {
    pixel.style.backgroundColor = color;
    pixel.style.border = "0";
  };

// Set tool
  const setTool = function(tool) {
    activeTool = tool;
  }

// Do action with tool
  const useTool = function(event) {
    const target = event.target;
    if (target.className === 'artBoard' || target.className === 'row') {
      return;
    }
    if (activeTool === 'draw') {
      recolor(target);
    } else if (activeTool === 'erase') {
      erase(target);
    }
  }

// Color picker functions
  const openPicker = function() {
    const elem = document.getElementById('colorPicker');
    if(elem) {
        elem.click();
    }
  }


// Add event listeners
  document.querySelector('.artBoard').addEventListener('click', useTool);
  document.getElementById('drawTool').addEventListener('click', function(){setTool('draw')});
  document.getElementById('colorTool').addEventListener('click', openPicker);
  document.querySelector('#colorPicker').addEventListener('input', setColor)
})();
