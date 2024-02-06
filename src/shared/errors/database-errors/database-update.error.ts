import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Effect as E, pipe } from "effect";

import { Result } from "@root/types/Result.type";
import { ENDCODED_ERROR_CODE, type AnyHow } from "../anyhow";

export class DatabaseUpdateError implements AnyHow {
  static readonly _tag = "DatabaseUpdateError";

  static infer(err: AnyHow): err is DatabaseUpdateError {
    return DatabaseUpdateError._tag === err._tag;
  }

  static into(error: unknown): Result<DatabaseUpdateError, never> {
    return E.fail(new DatabaseUpdateError(error));
  }

  static tryCatch<T>(
    tryPromise: (signal: AbortSignal) => Promise<T>
  ): Result<DatabaseUpdateError, T> {
    return E.tryPromise({
      catch: error => new DatabaseUpdateError(error),
      try: tryPromise
    });
  }

  constructor(public readonly error: unknown) {}

  public readonly _tag = DatabaseUpdateError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      errorCode: ENDCODED_ERROR_CODE["DatabaseUpdateError"],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  public logError(): void {
    return pipe(
      E.logError(`Database update error with reasons: ${this.error}`),
      E.runSync
    );
  }
}
