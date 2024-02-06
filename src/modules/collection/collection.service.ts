import { Injectable } from "@nestjs/common";
import { Result } from "@root/types/Result.type";
import { Effect, pipe } from "effect";

@Injectable()
export class CollectionService {
  public getCollection(address: string): Result<never, { address: string }> {
    return pipe({ address }, Effect.succeed);
  }
}
