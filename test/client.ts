import { ZBClient } from 'zeebe-node';

const zbc = new ZBClient();

async function main() {
  const w = zbc.createWorker(
    null,
    'get-customer-records',
    (job, complete) => {
      console.log(job);
    },
    {
      retry: true,
    },
  );
}

main();
