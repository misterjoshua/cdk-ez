/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const channelCharacterEncoding = "utf-8";
const channelFileDescriptor = 0;

const fs = require("fs");
// console.log("Running...");

const inputString = fs.readFileSync(
  channelFileDescriptor,
  channelCharacterEncoding
);
console.log(inputString);

process.exit(0);
