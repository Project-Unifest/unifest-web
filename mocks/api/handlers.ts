import boothHandler from "./booth";
import helloHandler from "./hello";
import memberHandler from "./members";

const handlers = [...helloHandler, ...boothHandler, ...memberHandler];

export default handlers;
