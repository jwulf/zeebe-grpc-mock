import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:26500',
      package: 'gateway_protocol',
      protoPath: join(__dirname, '..', 'proto/gateway.proto'),
    },
  });
  // tslint:disable-next-line: no-console
  await app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
