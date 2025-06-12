export default () => ({
  upload: {
    config: {
      sizeLimit: 100 * 1024 * 1024, // 100MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
      // Validação de tipos de arquivo
      provider: 'local',
      providerOptions: {
        localServer: {
          maxage: 300000
        }
      }
    }
  }
});
