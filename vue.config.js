module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://164vn05658.iask.in/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}