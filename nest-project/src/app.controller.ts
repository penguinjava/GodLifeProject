import { Request } from 'express';
import { Controller, Get, Req, Delete, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@/common/dto/api-response.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
