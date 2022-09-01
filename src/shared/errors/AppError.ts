class AppError {
  public readonly message: string;
  public readonly statuscCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statuscCode = statusCode;
  }
}

export default AppError;
