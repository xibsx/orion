const chalk = require('chalk');

// Color console output
function color(text, color) {
  return {
    yellow: chalk.yellowBright(text),
    green: chalk.greenBright(text),
    red: chalk.redBright(text)
  }[color] || text;
}

// Generate session ID
function genSessionId() {
  return Math.random().toString(36).substring(2, 8);
}

module.exports = { color, genSessionId };
