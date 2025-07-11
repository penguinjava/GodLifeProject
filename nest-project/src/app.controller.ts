import { Request} from 'express';
import { Controller, Get, Req, Delete, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }

  @Delete(':userId/memo/:memoId')
  deleteUserMemo(@Param() params: {[key: string]: string}) {
    return `userId: ${params.userId}, memoId: ${params.memoId};`;
  }
}
