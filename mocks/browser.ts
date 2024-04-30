import { setupWorker } from "msw/browser";
import handlers from "./api/handlers";

export const worker = setupWorker(...handlers);
