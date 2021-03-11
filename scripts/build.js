const {spawnSync} = require('./utils')

const branch =
  process.env.BRANCH || spawnSync('git rev-parse --abbrev-ref HEAD')

// eslint-disable-next-line no-console
console.log(`Building for branch "${branch}"`)

spawnSync('npx react-scripts build --profile', {stdio: 'inherit'})
