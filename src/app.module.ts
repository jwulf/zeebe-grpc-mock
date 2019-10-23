import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ControlPlaneModule } from './control-plane/control-plane.module';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [ControlPlaneModule, GrpcModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
