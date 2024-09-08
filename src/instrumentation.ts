// Next.js picks up instrumentation.ts file in /src directory
export async function register() {
  // early return doesn't work
  // if (
  //   process.env.NEXT_RUNTIME === "nodejs" &&
  //   process.env.NODE_ENV === "development"
  // ) {
  //   const { server } = await import("@/mocks/node");
  //   server.listen();
  // }
}
