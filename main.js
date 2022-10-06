// UNSUED
// const generateArrayOfN = (n) => Array.from(Array(n).keys());
// const generateFields = () => {
//   const fieldsArray = generateArrayOfN(FIELDS * FIELDS);

//   const fields = fieldsArray.map((field, index) => {
//     const x = index % FIELDS;
//     const y = Math.floor(index / FIELDS);

//     return { x, y };
//   });

//   return fields;
// };

//
// CONFIG
const FIELDS = 4;
const KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
//
// STATE
let candy;
let robot;
let score = 0;
//

// Utils
const generateRandomNumberFromRange = ({ from = 0, to }) => {
  return Math.floor(Math.random() * (to + 1 - from) + from);
};

const generateRandomCoordinate = () => {
  return generateRandomNumberFromRange({ to: FIELDS - 1 });
};

const generateRandomField = () => {
  return { x: generateRandomCoordinate(), y: generateRandomCoordinate() };
};

const logPositions = () => {
  console.info("robot ", robot);
  console.info("candy ", candy);
};

const logSuccess = () => {
  console.log(
    `%c You scored at x:${robot.x}, y:${robot.y}. Your score is: ${score}`,
    "background: #222; color: #bada55"
  );
};

const logNewGame = () => {
  console.log(`%c START`, "background: #222; color: #bada55");
};

const logInstructions = () => {
  console.log("Use keyboard arrows to move the robot");
  console.log("Match robot's and candy's x and y coordinates");
  console.log("Top left corner is 0,0");
  console.log("x grows from left to right.");
  console.log("y grows from top to bottom.");
}

// THE GAME
const generateCandy = () => {
  const newCandy = generateRandomField();

  if (newCandy.x === robot.x && newCandy.y === robot.y) generateCandy();

  return (candy = newCandy);
};

const generateRobot = () => {
  robot = generateRandomField();
};

const moveRobot = ({ key }) => {
  if (!KEYS.includes(key)) return;

  switch (key) {
    case "ArrowUp":
      if (robot.y === 0) return;
      robot = { ...robot, y: robot.y - 1 };
      break;
    case "ArrowDown":
      if (robot.y === FIELDS - 1) return;
      robot = { ...robot, y: robot.y + 1 };
      break;
    case "ArrowLeft":
      if (robot.x === 0) return;
      robot = { ...robot, x: robot.x - 1 };
      break;
    case "ArrowRight":
      if (robot.x === FIELDS - 1) return;
      robot = { ...robot, x: robot.x + 1 };
      break;
    default:
      return;
  }



  if (robot.x === candy.x && robot.y === candy.y) {
    score++;
    generateCandy();
    logSuccess();
    logNewGame();
    logPositions();
    return;
  }
  
    logPositions();
};

// INIT
const init = () => {
  logInstructions();
  logNewGame();
  generateRobot();
  generateCandy();
  logPositions();

  window.addEventListener("keydown", moveRobot);

  return () => window.removeEventListener("keydown", moveRobot);
};

// CLEANUP
const cleanup = init();
