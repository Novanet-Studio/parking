import path from 'path';
import { config } from 'dotenv';

export default function() {
  config({
    path: path.resolve(__dirname, `../../.env`),
  });
}
