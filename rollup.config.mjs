import {readFileSync} from 'fs';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import sass from 'rollup-plugin-sass';

const packageJson = readFileSync('./package.json');
const external = Object.keys({...packageJson.dependencies, ...packageJson.devDependencies, ...packageJson.peerDependencies});

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true,
    exports: 'named'
  },
  external,
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'build',
    rootDir: 'src',
    exclude: ['**/*.test.ts']
  }), sass()],
});
