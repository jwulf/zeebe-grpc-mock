import { Injectable } from '@nestjs/common';
import { ActivateJobsResponse } from 'zeebe-node';

@Injectable()
export class GrpcService {
  jobs: ActivateJobsResponse[] = [];

  getJobs() {
    return this.jobs;
  }

  putJob(job: ActivateJobsResponse) {
    this.jobs.push(job);
  }
}
