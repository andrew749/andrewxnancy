const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = '/'
let basePath = ''

// if (isGithubActions) {
//   // trim off `<owner>/`
//   const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

//   assetPrefix = `/`
//   basePath = `/andrewxnancy`
// }

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
}
