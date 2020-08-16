module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'YouTube',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}
