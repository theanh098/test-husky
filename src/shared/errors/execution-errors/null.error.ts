import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Effect as E, pipe } from "effect";

import { ENDCODED_ERROR_CODE, type AnyHow } from "../anyhow";
import { Result } from "@root/types/Result.type";

export class NullError implements AnyHow {
  static readonly _tag = "NullError";

  static infer(err: AnyHow): err is NullError {
    return NullError._tag === err._tag;
  }

  static into(reasons: string): Result<NullError, never> {
    return E.fail(new NullError(reasons));
  }

  constructor(public readonly reasons: string) {}

  public readonly _tag = NullError._tag;

  public endCode(): InternalServerErrorException {
    return new InternalServerErrorException({
      errorCode: ENDCODED_ERROR_CODE["NullError"],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  public logError(): void {
    return pipe(
      E.logError(`Null value error with reason: ${this.reasons}`),
      E.runSync
    );
  }
}
