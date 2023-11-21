import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get Welcome Message', operationId: 'getHello' })
  @ApiOkResponse({ description: 'Greeting message' })
  getHello(): string {
    return this.appService.getHello();
  }
}
