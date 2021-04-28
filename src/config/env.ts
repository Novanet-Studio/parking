import path from 'path';
import { config } from 'dotenv';

export default function (): void {
  config({
    path: path.resolve(__dirname, `../../.env`),
  });
}
