import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serveSite(@Res() res: Response) {
    const filePath = join(__dirname, '..', 'public', 'index.html');
    return res.sendFile(filePath);
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
