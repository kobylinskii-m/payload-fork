import getPort from 'get-port';
import path from 'path';
import { v4 as uuid } from 'uuid';
import shelljs from 'shelljs';
import express from 'express';
import type { CollectionConfig } from '../../src/collections/config/types';
import type { InitOptions } from '../../src/config/types';
import payload from '../../src';

type Options = {
  __dirname: string;
  init?: Partial<InitOptions>;
};

export async function initPayloadE2E(__dirname: string): Promise<{ serverURL: string }> {
  const webpackCachePath = path.resolve(__dirname, '../../node_modules/.cache/webpack');
  shelljs.rm('-rf', webpackCachePath);
  return initPayloadTest({
    __dirname,
    init: {
      local: false,
    },
  });
}

export async function initPayloadTest(options: Options): Promise<{ serverURL: string }> {
  const initOptions = {
    local: true,
    secret: uuid(),
    mongoURL: `mongodb://localhost/${uuid()}`,
    ...(options.init || {}),
  };

  process.env.NODE_ENV = 'test';
  process.env.PAYLOAD_CONFIG_PATH = path.resolve(options.__dirname, './config.ts');

  const port = await getPort();

  if (!initOptions?.local) {
    initOptions.express = express();
  }

  await payload.initAsync(initOptions);

  if (initOptions.express) {
    initOptions.express.listen(port);
  }

  return { serverURL: `http://localhost:${port}` };
}

export const openAccess: CollectionConfig['access'] = {
  read: () => true,
  create: () => true,
  delete: () => true,
  update: () => true,
};
