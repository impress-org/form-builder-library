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
    format: 'es'
  },
  plugins: [typescript(), sass()],
  external
})

// export default defineConfig({
//     input: 'src/index.ts',
//     output: [
//     {
//       file: packageJson.main,
//       format: 'cjs', // commonJS
//       sourcemap: true,
//     },
//     {
//       file: packageJson.module,
//       format: 'esm', // ES Modules
//       sourcemap: true,
//     },
//   ],
//     external: [...Object.keys(globals), '@wordpress/components', '@wordpress/compose', '@wordpress/element'],
// });
