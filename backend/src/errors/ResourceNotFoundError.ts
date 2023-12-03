class ResourceNotFoundError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export default ResourceNotFoundError;
