const dirs = {
  'esbuild': require('esbuild'),
};

const libName = process.env.LIB;

async function main() {
  for (const dir in dirs) {
    try {
      await dirs[dir].build({
        bundle: true,
        entryPoints: [`${__dirname}/src/${libName}.js`],
        outdir: `${__dirname}/${dir}`,
        minify: true,
        format: 'cjs',
        define: {
          'process.env.NODE_ENV': '"production"',
        },
      });
    } catch (e) {
      console.error(e)
    }
  }
}

main();
