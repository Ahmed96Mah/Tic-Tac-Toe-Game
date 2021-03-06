let turn: number[] = [1, 2],
  plays: number = 0;

// Font Awesome icons Animations
const fontAwesomeAnimate = (evt: Event) => {
  if (
    (evt.target! as HTMLElement).nodeName === 'I' &&
    (evt.target! as HTMLElement).classList.contains('fa-brands')
  ) {
    (evt.target! as HTMLElement).classList.toggle('fa-beat-fade');
    (evt.target! as HTMLElement).classList.toggle('fa-beat-style');
  }
};

// Click Processing Function
const processClick = (evt: Event) => {
  const plyr1Choices = document.querySelector('#one')!.querySelectorAll('i');
  const plyr2Choices = document.querySelector('#two')!.querySelectorAll('i');

  if (
    (evt.target! as HTMLElement).nodeName === 'I' &&
    (evt.target! as HTMLElement).classList.contains('fa-circle')
  ) {
    // First, Check that the game hasn't started yet.
    let emptyGrid: string;
    if (
      (evt.target! as HTMLElement).parentElement!.classList.contains('choice')
    ) {
      // Only check the grid if the symbol clicked were in the choice div
      emptyGrid = checkGrid();
    }
    if (emptyGrid! === '') {
      // If it is clear, then allow choice selection & modification.
      if ((evt.target! as HTMLElement).dataset.div === 'one') {
        // make sure that only one symbol is selected in each choice div
        if (
          !plyr1Choices[1].classList.contains('active') &&
          !plyr2Choices[0].classList.contains('active')
        ) {
          (evt.target! as HTMLElement).classList.toggle('fa-cir');
          (evt.target! as HTMLElement).classList.toggle('active');
          displayTurn(plyr1Choices, plyr2Choices);
        } else {
          // else reject the selection
          (evt.target! as HTMLElement).classList.toggle('fa-shake');
          setTimeout(() => {
            (evt.target! as HTMLElement).classList.toggle('fa-shake');
          }, 400);
        }
      } else {
        // make sure that only one symbol is selected in each choice div
        if (
          !plyr2Choices[1].classList.contains('active') &&
          !plyr1Choices[0].classList.contains('active')
        ) {
          (evt.target! as HTMLElement).classList.toggle('fa-cir');
          (evt.target! as HTMLElement).classList.toggle('active');
          displayTurn(plyr1Choices, plyr2Choices);
        } else {
          // else reject the selection
          (evt.target! as HTMLElement).classList.toggle('fa-shake');
          setTimeout(() => {
            (evt.target! as HTMLElement).classList.toggle('fa-shake');
          }, 400);
        }
      }
    } else {
      // Else, don't allow players to change their choices until the game is concluded.
      (evt.target! as HTMLElement).classList.toggle('fa-shake');
      (evt.target! as HTMLElement).classList.toggle('not-allowed');
      setTimeout(() => {
        (evt.target! as HTMLElement).classList.toggle('fa-shake');
        (evt.target! as HTMLElement).classList.toggle('not-allowed');
      }, 400);
      if (
        (evt.target! as HTMLElement).parentElement!.classList.contains('choice')
      ) {
        setTimeout(() => {
          alert(
            `Players can't change their choices while the game is underway!`
          );
        }, 500);
      }
    }
  } else if (
    (evt.target! as HTMLElement).nodeName === 'I' &&
    (evt.target! as HTMLElement).classList.contains('fa-xmark')
  ) {
    // First, Check that the game hasn't started yet.
    let emptyGrid: string;
    if (
      (evt.target! as HTMLElement).parentElement!.classList.contains('choice')
    ) {
      emptyGrid = checkGrid();
    }
    if (emptyGrid! === '') {
      // If it is clear, then allow choice selection & modification.
      if ((evt.target! as HTMLElement).dataset.div === 'one') {
        if (
          !plyr1Choices[0].classList.contains('active') &&
          !plyr2Choices[1].classList.contains('active')
        ) {
          (evt.target! as HTMLElement).classList.toggle('fa-x');
          (evt.target! as HTMLElement).classList.toggle('active');
          displayTurn(plyr1Choices, plyr2Choices);
        } else {
          (evt.target! as HTMLElement).classList.toggle('fa-shake');
          setTimeout(() => {
            (evt.target! as HTMLElement).classList.toggle('fa-shake');
          }, 400);
        }
      } else {
        if (
          !plyr2Choices[0].classList.contains('active') &&
          !plyr1Choices[1].classList.contains('active')
        ) {
          (evt.target! as HTMLElement).classList.toggle('fa-x');
          (evt.target! as HTMLElement).classList.toggle('active');
          displayTurn(plyr1Choices, plyr2Choices);
        } else {
          (evt.target! as HTMLElement).classList.toggle('fa-shake');
          setTimeout(() => {
            (evt.target! as HTMLElement).classList.toggle('fa-shake');
          }, 400);
        }
      }
    } else {
      // Else, don't allow players to change their choices until the game is concluded.
      (evt.target! as HTMLElement).classList.toggle('fa-shake');
      (evt.target! as HTMLElement).classList.toggle('not-allowed');
      setTimeout(() => {
        (evt.target! as HTMLElement).classList.toggle('fa-shake');
        (evt.target! as HTMLElement).classList.toggle('not-allowed');
      }, 400);
      if (
        (evt.target! as HTMLElement).parentElement!.classList.contains('choice')
      ) {
        setTimeout(() => {
          alert(
            `Players can't change their choices while the game is underway!`
          );
        }, 500);
      }
    }
  } else if (
    (evt.target! as HTMLElement).nodeName === 'DIV' &&
    (evt.target! as HTMLElement).classList.contains('content')
  ) {
    // First, process the players' choices to determine the cell's style
    const choice1 = processChoice(1, plyr1Choices, plyr2Choices);
    const choice2 = processChoice(2, plyr1Choices, plyr2Choices);
    if (!(choice1 === '') && !(choice2 === '')) {
      // make sure both players have provided their choices first
      if (!(evt.target! as HTMLElement).classList.contains('active')) {
        // if it isn't an already activated cell
        if (turn[0] === 1) {
          if (choice1 === 'o') {
            (evt.target! as HTMLElement).innerHTML =
              '<i class="fa-regular fa-circle"></i>';
            (evt.target! as HTMLElement).classList.toggle('o');
            (evt.target! as HTMLElement).classList.toggle('active');
          } else {
            (evt.target! as HTMLElement).innerHTML =
              '<i class="fa-solid fa-xmark"></i>';
            (evt.target! as HTMLElement).classList.toggle('x');
            (evt.target! as HTMLElement).classList.toggle('active');
          }
        } else {
          if (choice2 === 'o') {
            (evt.target! as HTMLElement).innerHTML =
              '<i class="fa-regular fa-circle"></i>';
            (evt.target! as HTMLElement).classList.toggle('o');
            (evt.target! as HTMLElement).classList.toggle('active');
          } else {
            (evt.target! as HTMLElement).innerHTML =
              '<i class="fa-solid fa-xmark"></i>';
            (evt.target! as HTMLElement).classList.toggle('x');
            (evt.target! as HTMLElement).classList.toggle('active');
          }
        }
        plays += 1; // with each successful play, increase the plays counter
        if (plays >= 5) {
          // start cheking for wins after the 5th play (earliest opportunity for a win)
          checkWin(choice1, plays);
        }
        turn.reverse(); // then switch for the other player's turn
        displayTurn(plyr1Choices, plyr2Choices); // highlight the NEXT turn
      } else {
        // if the cell has been already populated, reject the click and maintain the player's turn
        (evt.target! as HTMLElement)
          .querySelector('i')!
          .classList.toggle('fa-shake');
        setTimeout(() => {
          (evt.target! as HTMLElement)
            .querySelector('i')!
            .classList.toggle('fa-shake');
        }, 400);
      }
    } else {
      // if one or both of the players haven't choosen their symbols before clicking on the grid
      alert('Both Players should provide their selection first!');
    }
  }
};

// Check if the game has started (if a cell has been activated).
const checkGrid = (): string => {
  let gridStatus: string = '';
  const row1 = document.querySelector('#row1')!.querySelectorAll('.content');
  const row2 = document.querySelector('#row2')!.querySelectorAll('.content');
  const row3 = document.querySelector('#row3')!.querySelectorAll('.content');

  //checking 1st row for activated cells
  for (const cell of row1) {
    if (cell.classList.contains('active')) {
      gridStatus = 'occupied';
    }
  }
  //checking 2nd row for activated cells
  for (const cell of row2) {
    if (cell.classList.contains('active')) {
      gridStatus = 'occupied';
    }
  }
  //checking 3rd row for activated cells
  for (const cell of row3) {
    if (cell.classList.contains('active')) {
      gridStatus = 'occupied';
    }
  }
  return gridStatus;
};

// Check Players' turns
const displayTurn = (
  plyr1Choice: NodeListOf<HTMLElement>,
  plyr2Choice: NodeListOf<HTMLElement>
) => {
  const test1 = processChoice(1, plyr1Choice, plyr2Choice);
  const test2 = processChoice(2, plyr1Choice, plyr2Choice);
  const turn1 = document.querySelector('#turn1')!;
  const turn2 = document.querySelector('#turn2')!;
  if (!(test1 === '') && !(test2 === '')) {
    // Only display turns if both choices are available
    if (turn[0] === 1) {
      turn1.classList.toggle('hglt');
      if (turn2.classList.contains('hglt')) {
        turn2.classList.toggle('hglt');
      }
    } else {
      turn2.classList.toggle('hglt');
      if (turn1.classList.contains('hglt')) {
        turn1.classList.toggle('hglt');
      }
    }
  }
};

// Detect each player's choice (by checking the clicked symbols)
const processChoice = (
  plyr: number,
  plyr1Choice: NodeListOf<HTMLElement>,
  plyr2Choice: NodeListOf<HTMLElement>
) => {
  let choice: string = ''; // return an empty string if the player hasn't choosen a symbol
  if (plyr === 1) {
    for (const c of plyr1Choice) {
      if (c.classList.contains('active')) {
        // if a symbol is clicked (choosen)
        if (c.dataset.ch === 'c') {
          choice = 'o';
        } else {
          choice = 'x';
        }
        break;
      }
    }
    return choice;
  } else {
    for (const c of plyr2Choice) {
      if (c.classList.contains('active')) {
        if (c.dataset.ch === 'c') {
          choice = 'o';
        } else {
          choice = 'x';
        }
        break;
      }
    }
    return choice;
  }
};

// check for winners (starting from 5th play)
const checkWin = (plyr1Choice: string, numOfPlays: number) => {
  let Arr1: string[] = [];
  let Arr2: string[] = [];
  let Arr3: string[] = [];
  const row1 = document.querySelector('#row1')!.querySelectorAll('.content');
  const row2 = document.querySelector('#row2')!.querySelectorAll('.content');
  const row3 = document.querySelector('#row3')!.querySelectorAll('.content');
  const count1 = document.querySelector('#count1')!;
  const count2 = document.querySelector('#count2')!;

  for (const cell of row1) {
    // Check what occupies the cells on row 1
    if (cell.classList.contains('o')) {
      // If the cell has o
      Arr1.push('o');
    } else if (cell.classList.contains('x')) {
      // If the cell has x
      Arr1.push('x');
    } else {
      // If the cell is empty
      Arr1.push(' ');
    }
  }

  for (const cell of row2) {
    // Check what occupies the cells on row 2
    if (cell.classList.contains('o')) {
      // If the cell has o
      Arr2.push('o');
    } else if (cell.classList.contains('x')) {
      // If the cell has x
      Arr2.push('x');
    } else {
      // If the cell is empty
      Arr2.push(' ');
    }
  }

  for (const cell of row3) {
    // Check what occupies the cells on row 3
    if (cell.classList.contains('o')) {
      // If the cell has o
      Arr3.push('o');
    } else if (cell.classList.contains('x')) {
      // If the cell has x
      Arr3.push('x');
    } else {
      // If the cell is empty
      Arr3.push(' ');
    }
  }

  if (numOfPlays < 9) {
    // Before reaching the 9th play check for win options
    const bar = document.querySelector('.bar')!;
    /* Checking Win options */
    if (
      (Arr1[0] === 'o' && Arr1[1] === 'o' && Arr1[2] === 'o') ||
      (Arr1[0] === 'x' && Arr1[1] === 'x' && Arr1[2] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('horz-1');
      if (plyr1Choice === Arr1[0]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr2[0] === 'o' && Arr2[1] === 'o' && Arr2[2] === 'o') ||
      (Arr2[0] === 'x' && Arr2[1] === 'x' && Arr2[2] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('horz-2');
      if (plyr1Choice === Arr2[0]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr3[0] === 'o' && Arr3[1] === 'o' && Arr3[2] === 'o') ||
      (Arr3[0] === 'x' && Arr3[1] === 'x' && Arr3[2] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('horz-3');
      if (plyr1Choice === Arr3[0]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr1[0] === 'o' && Arr2[0] === 'o' && Arr3[0] === 'o') ||
      (Arr1[0] === 'x' && Arr2[0] === 'x' && Arr3[0] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('vert-1');
      if (plyr1Choice === Arr1[0]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr1[1] === 'o' && Arr2[1] === 'o' && Arr3[1] === 'o') ||
      (Arr1[1] === 'x' && Arr2[1] === 'x' && Arr3[1] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('vert-2');
      if (plyr1Choice === Arr1[1]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr1[2] === 'o' && Arr2[2] === 'o' && Arr3[2] === 'o') ||
      (Arr1[2] === 'x' && Arr2[2] === 'x' && Arr3[2] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('vert-3');
      if (plyr1Choice === Arr1[2]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr1[0] === 'o' && Arr2[1] === 'o' && Arr3[2] === 'o') ||
      (Arr1[0] === 'x' && Arr2[1] === 'x' && Arr3[2] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('deg-1');
      if (plyr1Choice === Arr1[0]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    } else if (
      (Arr1[2] === 'o' && Arr2[1] === 'o' && Arr3[0] === 'o') ||
      (Arr1[2] === 'x' && Arr2[1] === 'x' && Arr3[0] === 'x')
    ) {
      bar.classList.toggle('hide');
      bar.classList.toggle('deg-2');
      if (plyr1Choice === Arr1[2]) {
        // Increase the player win count
        count1.textContent = (Number(count1.textContent) + 1).toString();
        count1.classList.toggle('fa-beat');
        setTimeout(() => {
          count1.classList.toggle('fa-beat');
        }, 5000);
      } else {
        count2.textContent = (Number(count2.textContent) + 1).toString();
        count2.classList.toggle('fa-beat');
        setTimeout(() => {
          count2.classList.toggle('fa-beat');
        }, 5000);
      }
      setTimeout(endGame, 3000);
    }
  } else {
    // In case of a draw, initiate the reset process faster
    setTimeout(endGame, 1500);
  }
};

// Initiate the game's ending operation
const endGame = () => {
  const endPanel = document.querySelector('.winner')!;
  const grid = document.querySelector('.grid')!;

  endPanel.classList.toggle('hide'); // display the winner panel
  endPanel.classList.toggle('fa-bounce'); // add the font awesome effect on the panel
  grid.classList.toggle('hide');
  setTimeout(restartGame, 3000); // wait for the grid to disappear first
};

// Game reset function
const restartGame = () => {
  const row1 = document.querySelector('#row1')!.querySelectorAll('.content');
  const row2 = document.querySelector('#row2')!.querySelectorAll('.content');
  const row3 = document.querySelector('#row3')!.querySelectorAll('.content');
  const turns = document.querySelector('.cont1')!.querySelectorAll('.turn');
  const choiceDiv1 = document.querySelector('#one')!.querySelectorAll('i');
  const choiceDiv2 = document.querySelector('#two')!.querySelectorAll('i');
  const endPanel = document.querySelector('.winner')!;
  const grid = document.querySelector('.grid')!;
  const bar = document.querySelector('.bar')!;

  // First, clear the grid
  for (const cell of row1) {
    cell.innerHTML = '';
    if (cell.classList.contains('active')) {
      cell.classList.toggle('active');
      if (cell.classList.contains('x')) {
        cell.classList.toggle('x');
      } else if (cell.classList.contains('o')) {
        cell.classList.toggle('o');
      }
    }
  }
  for (const cell of row2) {
    cell.innerHTML = '';
    if (cell.classList.contains('active')) {
      cell.classList.toggle('active');
      if (cell.classList.contains('x')) {
        cell.classList.toggle('x');
      } else if (cell.classList.contains('o')) {
        cell.classList.toggle('o');
      }
    }
  }
  for (const cell of row3) {
    cell.innerHTML = '';
    if (cell.classList.contains('active')) {
      cell.classList.toggle('active');
      if (cell.classList.contains('x')) {
        cell.classList.toggle('x');
      } else if (cell.classList.contains('o')) {
        cell.classList.toggle('o');
      }
    }
  }

  // Second, Clear the turns
  for (const plyrTurn of turns) {
    if (plyrTurn.classList.contains('hglt')) {
      plyrTurn.classList.toggle('hglt');
    }
  }

  // Then, clear players' choices
  for (const iElem of choiceDiv1) {
    if (iElem.classList.contains('active')) {
      iElem.classList.toggle('active');
      if (iElem.classList.contains('fa-cir')) {
        iElem.classList.toggle('fa-cir');
      } else if (iElem.classList.contains('fa-x')) {
        iElem.classList.toggle('fa-x');
      }
    }
  }
  for (const iElem of choiceDiv2) {
    if (iElem.classList.contains('active')) {
      iElem.classList.toggle('active');
      if (iElem.classList.contains('fa-cir')) {
        iElem.classList.toggle('fa-cir');
      } else if (iElem.classList.contains('fa-x')) {
        iElem.classList.toggle('fa-x');
      }
    }
  }
  bar.classList.value = 'bar hide'; // reset the win detection bar
  endPanel.classList.toggle('fa-bounce');
  endPanel.classList.toggle('hide'); // hide the winner panel
  grid.classList.toggle('hide'); // show back the grid after resetting it
  turn = [1, 2]; // Reset the starting order
  plays = 0; // Reset the num of plays global variable
};

const init = () => {
  const socialIcons = document.querySelectorAll('i')!;

  // Initializing Event Listeners
  document.addEventListener('click', processClick);
  for (const icon of socialIcons) {
    icon.addEventListener('mouseenter', fontAwesomeAnimate);
    icon.addEventListener('mouseleave', fontAwesomeAnimate);
  }
};

document.addEventListener('DOMContentLoaded', init); // Run the app after the DOM is ready
