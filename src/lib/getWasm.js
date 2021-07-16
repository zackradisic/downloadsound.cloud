export const getWasm = async () => {
  if (typeof window !== 'undefined') {
    // See: https://github.com/gatsbyjs/gatsby/issues/26364#issuecomment-673753931
    /* eslint no-useless-concat: "off" */
    return await import('../id3/' + 'pkg/id3.js')
  }
}
