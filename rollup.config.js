import pkg from './package.json';
const banner = `
/*! ${pkg.name} v${pkg.version} | ${pkg.description} | 
* Copyright ${new Date().getFullYear()} | ${pkg.license} license */`;

const formats = ['iife', 'es', 'cjs']

export default formats.map(format => {
  return {
    input: 'src/js/es-module/main.js',
    output: {
      file: `dist/js/hello${format === 'iife' ? '' : `.${format}`}.js`,
      format: format,
      name: 'hello',
      banner: banner
    }
  }
})