import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { TopologyResponse, PartitionBrokerRole } from 'zeebe-node';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('Gateway', 'Topology')
  topology(data: {}): TopologyResponse {
    return {
      brokers: [
        {
          host: 'localhost',
          nodeId: 0,
          partitions: [
            {
              partitionId: 1,
              role: PartitionBrokerRole.LEADER,
            },
          ],
          port: 26501,
        },
      ],
      clusterSize: 1,
      partitionsCount: 1,
      replicationFactor: 1,
    };
  }
}
