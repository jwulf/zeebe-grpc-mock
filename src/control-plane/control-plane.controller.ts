import { Controller, Post, Body, Param } from '@nestjs/common';
import { GrpcService } from '../grpc/grpc.service';

@Controller('control-plane')
export class ControlPlaneController {
  constructor(private readonly appService: GrpcService) {}
  @Post('/:jobType')
  createJob(@Body() data, @Param() param) {
    const { jobType } = param;
    this.appService.putJob({
      jobs: [
        {
          type: jobType,
          ...data,
        },
      ],
    });
  }
}
