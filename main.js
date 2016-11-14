(function() {
  'use strict';
  let color = '#EF382B';
  let activeTool = 'draw';
  const colored = [];
  let mouseDown = false;

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

// Set tool
  const setTool = function(event) {
    const target = event.target;
    if (target.tagName !== 'BUTTON' || target.id === 'colorTool') {
      return;
    }
    if (target.id === 'gridToggle') {
      target.classList.toggle('off');
      document.querySelector('.artBoard').classList.toggle('borders');
      return
    }
    showTool(target);
    switch (target.id) {
      case "drawTool":
        activeTool = 'draw';
        return;
      case "eraseTool" :
        activeTool = 'eraser';
        return;
      case "fillTool" :
        activeTool = 'fill';
        return;
      case "eyedropperTool" :
        activeTool = 'eyedropper';
        return;
      default: console.log(`${event.target.id} isn't a tool but it definitely should be.`);
    }
  }

// Show selected tool

  const showTool = function(target) {
    const buttons = document.getElementsByTagName('button');
    for (const button of buttons) {
      button.classList.remove('selected');
    }
    target.classList.add('selected');
  }

// Do action with tool
  const useTool = function(target) {
    if (target.classList.contains('artBoard') || target.classList.contains('row')) {
      return;
    }
    if (activeTool === 'draw') {
      recolor(target);
    } else if (activeTool === 'eraser') {
      erase(target);
    } else if (activeTool === 'fill') {
      fill(target);
    } else if (activeTool === 'eyedropper') {
      color = target.style.backgroundColor;
      document.querySelector('header').style.backgroundColor = color;
    }
  }

// Trigger color picker
  const openPicker = function() {
    document.getElementById('colorPicker').click();
  }

// Set Color
  const setColor = function() {
    color = document.getElementById('colorPicker').value;
    document.querySelector('header').style.backgroundColor = color;
  }

// Recolor pixel
  const recolor = function(pixel) {
    pixel.style.backgroundColor = color;
    pixel.style.borderColor = color;
    colored.push(pixel);
  };

// Erase pixel
  const erase = function(pixel) {
    pixel.style.backgroundColor = null;
    pixel.style.borderColor = '#222';
  }

// Fill pixels
  const fill = function(target) {
    if (target.style.backgroundColor === '') {
      return;
    }
    const oldColor = target.style.backgroundColor;
    for (const pixel of colored) {
      if (pixel.style.backgroundColor === oldColor) {
        pixel.style.backgroundColor = color;
        pixel.style.borderColor = color;
      }
    }
  }

// Drag paint functions

  const mouseState = function(event) {
    if (event.type === 'mousedown') {
      mouseDown = true;
      return;
    }
    mouseDown = false;
  }

  const dragPaint = function(event) {
    if (!mouseDown) {
      return;
    }
    useTool(event.target);
  }

// Set recent color
  const setRecent = function(event) {
    if (event.target.tagName !== 'LI') {
      return;
    }
    color = event.target.style.backgroundColor;
    document.querySelector('header').style.backgroundColor = color;
}

// Add event listeners
  document.querySelector('body').addEventListener('mousedown', mouseState);
  document.querySelector('body').addEventListener('mouseup', mouseState);
  document.getElementById('tools').addEventListener('click', setTool);
  document.querySelector('.artBoard').addEventListener('click', function(){useTool(event.target)});
  document.querySelector('.artBoard').addEventListener('mouseout', dragPaint);
  document.querySelector('.artBoard').addEventListener('mouseover', dragPaint);
  document.getElementById('colorTool').addEventListener('click', openPicker);
  document.querySelector('#colorPicker').addEventListener('input', setColor);
  document.querySelector('#recentColors').addEventListener('click', setRecent)
})();
