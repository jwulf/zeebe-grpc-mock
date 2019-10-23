import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ZBClient } from 'zeebe-node';

// tslint:disable: no-console

describe('Topology', () => {
  it('Can service a Topology request', async done => {
    const zb = new ZBClient({
      loglevel: 'DEBUG',
      retry: false,
      onConnectionError: () => console.log('Connection Error'),
    });
    const t = await zb.topology();
    expect(t.clusterSize).toBe(1);
    console.log('Here!');
    zb.close().then(done);
  });
});

xdescribe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Can service a Topology request', done => {
    jest.setTimeout(15000);
    const zb = new ZBClient({ loglevel: 'DEBUG' });
    setTimeout(() => {
      expect(zb.connected).toBe(true);
      done();
    }, 10000);
  });
});
