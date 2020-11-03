module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Pilih Yuk"; // Replace your title here
      return args;
    });
  }
};
