export class AssertionError extends Error {
  constructor(
    public actual: any,
    public expected: any,
    public message: string,
  ) {
    super(message);
  }
}
