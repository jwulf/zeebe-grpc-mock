import { Controller } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  TopologyResponse,
  PartitionBrokerRole,
  CreateWorkflowInstanceResponse,
  CreateWorkflowInstanceRequest,
  ActivateJobsRequest,
  ActivateJobsResponse,
} from 'zeebe-node';
import { Mock } from '../constants';

@Controller()
export class GrpcController {
  backpressureOn: any;
  constructor(private readonly grpcService: GrpcService) {
    this.backpressureOn = true;
  }

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

  @GrpcMethod('Gateway', 'CreateWorkflowInstance')
  createWorkflowInstance(
    data: CreateWorkflowInstanceRequest,
  ): CreateWorkflowInstanceResponse {
    // tslint:disable-next-line: no-console
    console.log(data);
    return {
      bpmnProcessId: Mock.bpmnProcessId,
      version: Mock.version,
      workflowInstanceKey: Mock.workflowInstanceKey,
      workflowKey: Mock.workflowKey,
    };
  }

  @GrpcMethod('Gateway', 'ActivateJobs')
  async activateJobs(data: ActivateJobsRequest): Promise<ActivateJobsResponse> {
    console.log(data);
    if (this.backpressureOn) {
      const exception = new RpcException({
        message: 'Broker backpressure in effect',
        status: 8,
      });
      throw exception;
    }
    return new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            jobs: [
              {
                bpmnProcessId: Mock.bpmnProcessId,
                customHeaders: '{}',
                deadline: '132421343214',
                elementId: 'arstrast',
                elementInstanceKey: 'arstsartsar',
                key: '3214341',
                retries: 10,
                type: 'get-customer-record',
                variables: '{}',
                worker: data.worker,
                workflowDefinitionVersion: Mock.version,
                workflowInstanceKey: Mock.workflowInstanceKey,
                workflowKey: Mock.workflowKey,
              },
            ],
          }),
        2000,
      ),
    );
  }
}
