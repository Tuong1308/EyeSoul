import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import './load-test-env';

// Bring the Docker Postgres test database up to the latest migration once per run.
export default function globalSetup() {
  execSync('npx prisma migrate deploy', {
    cwd: resolve(__dirname, '..'),
    env: process.env,
    stdio: 'pipe',
  });
}
