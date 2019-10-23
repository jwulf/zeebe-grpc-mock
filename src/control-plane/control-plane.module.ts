import { Module } from '@nestjs/common';
import { ControlPlaneController } from './control-plane.controller';
import { ControlPlaneService } from './control-plane.service';
import { GrpcModule } from '../grpc/grpc.module';

@Module({
  imports: [GrpcModule],
  controllers: [ControlPlaneController],
  providers: [ControlPlaneService],
})
export class ControlPlaneModule {}
