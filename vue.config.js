module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://81.68.214.197:8081/',
        target: 'http://81.68.214.197:8081/',
        ws: true,
        changeOrigin: true
      },
      '/show': {
        target: 'http://81.68.214.197:8081/',
        ws: true,
        changeOrigin: true
      },
      '/dict': {
        target: 'http://81.68.214.197:8081/',
        ws: true,
        changeOrigin: true
      },
      '/background': {
        target: 'http://81.68.214.197:8081/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}