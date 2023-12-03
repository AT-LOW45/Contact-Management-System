class MissingFieldsError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export default MissingFieldsError;
