import type { Response } from 'express';

class ServerResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  private static messageReply(
    res: Response,
    statusCode: number,
    message: string,
  ): Response {
    return res.status(statusCode).send({ message });
  }

  public internalServerError(errorMessage: string): Response {
    return ServerResponse.messageReply(this.res, 500, errorMessage);
  }

  public notFound(message?: string): Response {
    return ServerResponse.messageReply(this.res, 404, message || 'Not Found');
  }

  public badRequest(message?: string): Response {
    return ServerResponse.messageReply(this.res, 400, message || 'Bad Request');
  }

  public unauthorized(message?: string): Response {
    return ServerResponse.messageReply(
      this.res,
      401,
      message || 'Unauthorized',
    );
  }

  public forbidden(message?: string): Response {
    return ServerResponse.messageReply(this.res, 403, message || 'Forbidden' );
  }
}

export default ServerResponse;
