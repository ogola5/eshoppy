// utils/ipfs.js

import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export async function uploadToIPFS(data) {
  const { path } = await ipfs.add(data);
  return path;
}
