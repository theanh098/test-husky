import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PrismaModule } from "@root/libs/prisma/prisma.module";

import { EVMStreamCommand } from "./evm.stream.command";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.${process.env.APP || "local"}.env`
    }),
    PrismaModule
  ],
  providers: [EVMStreamCommand]
})
export class CommandModule {}
