import boothHandler from "./booth";
import helloHandler from "./hello";
import memberHandler from "./members";
import queueHandler from "./queue";

const handlers = [
  ...helloHandler,
  ...boothHandler,
  ...memberHandler,
  ...queueHandler,
];

export default handlers;
