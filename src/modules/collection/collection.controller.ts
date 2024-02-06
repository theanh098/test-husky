import { Controller, Get, Param } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { genericApi } from "@root/shared/helpers/generic-api.helper";

@Controller("collections")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get(":address")
  getCollection(@Param("address") address: string) {
    return genericApi(this.collectionService.getCollection(address));
  }
}
