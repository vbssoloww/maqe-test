// import * as readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

function isValidCommand(walkingCode: string): boolean {
  return /^(?:[RL]|W\d+)+$/.test(walkingCode);
}

// Example usage:

function maqeBot(walkingCode: string): string {
  if (!isValidCommand(walkingCode)) {
    return "Invalid input";
  }

  let x: number = 0;
  let y: number = 0;
  let direction: string = "North";
  const directions: string[] = ["North", "East", "South", "West"];

  for (let i = 0; i < walkingCode.length; i++) {
    const command: string = walkingCode[i];
    const nextChar: string | undefined = walkingCode[i + 1];

    if (command === "R") {
      direction = directions[(directions.indexOf(direction) + 1) % 4];
    } else if (command === "L") {
      direction = directions[(directions.indexOf(direction) + 3) % 4];
    } else if (command === "W" && nextChar && !isNaN(parseInt(nextChar))) {
      let distanceStr: string = "";
      while (walkingCode[i + 1] && !isNaN(parseInt(walkingCode[i + 1]))) {
        distanceStr += walkingCode[++i];
      }
      const distance: number = parseInt(distanceStr, 10);
      switch (direction) {
        case "North":
          y += distance;
          break;
        case "East":
          x += distance;
          break;
        case "South":
          y -= distance;
          break;
        case "West":
          x -= distance;
          break;
      }
    }
  }

  return `X: ${x} Y: ${y} Direction: ${direction}`;
}

const inputData = process.argv[2];

console.log(maqeBot(inputData));

// self testing
// console.log(maqeBot("RW15RW1"));

// rl.question("Please enter the walking code for MAQE Bot: ", (input) => {
//   console.log(maqeBot(input));
//   rl.close();
// });
