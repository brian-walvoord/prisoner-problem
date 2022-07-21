function createRandomBoxesArray(num) {
  let boxesArr = [];
  let numberArr = [];
  for (let i = 0; i < num; i++) {
    numberArr.push(i);
  };
  for (let i = 0; i < num; i++) {
    let length = numberArr.length;
    let randomNum = Math.floor(Math.random() * length);
    boxesArr.push(numberArr[randomNum]);
    numberArr.splice(randomNum, 1);
  };
  return boxesArr;
};

function randomGuesses(times) {
  let resultsArray = [];
  for (let i = 0; i < times; i++) {
    const boxes = createRandomBoxesArray();
    let count = 0;
    for (let prisoner = 0; prisoner < 100; prisoner++) {
      let temporaryBoxes = boxes;
      let result = false;
      for (let choice = 0; choice < 50; choice++) {
        let length = temporaryBoxes.length;
        let randomNum = Math.floor(Math.random() * length);
        if (temporaryBoxes[randomNum] === prisoner) {
          result = true;
          break;
        } else {
          temporaryBoxes.splice(randomNum, 1);
        };
      };
      if (result === true) {
        count++;
      };
    };
    if (count < 100) {
      resultsArray.push(false);
    } else {
      resultsArray.push(true);
    };
  };
  return resultsArray;
};



function smartGuesses(prisonerNum, times) {
  let resultsArray = [];
  let openBoxesNum = prisonerNum / 2;
  for (let i = 0; i < times; i++) {
    const boxes = createRandomBoxesArray(prisonerNum);
    let count = 0;
    for (let prisoner = 0; prisoner < prisonerNum; prisoner++) {
      let result = false;
      let currentBox = prisoner;
      for (let choice = 0; choice < openBoxesNum; choice++) {
        if (boxes[currentBox] === prisoner) {
          result = true;
          break;
        } else {
          currentBox = boxes[currentBox];
        };
      };
      if (result === true) {
        count++;
      };
    };
    if (count < prisonerNum) {
      resultsArray.push(false);
    } else {
      resultsArray.push(true);
    };
  };
  return resultsArray;
};



function printSmartResults(prisonerNum, testNum) {
  let results = smartGuesses(prisonerNum, testNum);
  let successRate = 0;
  for (let e of results) {
    if (e === true) {
      successRate++;
    };
  };

  // prepend to existing table
  let myTable = document.getElementsByTagName('table')[0];
  let row = myTable.insertRow(1);
  let prisonerNumCell = row.insertCell(0);
  let testNumCell = row.insertCell(1);
  let percentageCell = row.insertCell(2);
  prisonerNumCell.innerHTML = prisonerNum;
  testNumCell.innerHTML = testNum;
  percentageCell.innerHTML = successRate / results.length;
};



function assignValues() {
  let prisonerNum = document.getElementById('prisonerNum').value;
  let testNum = document.getElementById('testNum').value;
  printSmartResults(prisonerNum, testNum);
};