export const wrapResponse = (code: number, message: string, data: unknown) => {
  return {
    code,
    message,
    data,
  };
};
