import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { common } from "./webpack.common";
// import portFinderSync from "portfinder-sync";
const portFinderSync = require("portfinder-sync");
import r from "webpack-dev-server";

const infoColor = (_message: string) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

const devConfig: Configuration = {
  ...common,
  stats: "errors-warnings",
  mode: "development",
  infrastructureLogging: {
    level: "warn",
  },
  devServer: {
    host: "local-ip",
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: "all",
    hot: false,
    watchFiles: ["src/**", "static/**"],
    static: {
      watch: true,
      directory: path.join(__dirname, "../static"),
    },
    client: {
      logging: "none",
      overlay: true,
      progress: false,
    },
    setupMiddlewares: function (middlewares, devServer) {
      console.log(
        "------------------------------------------------------------"
      );
      console.log(devServer.options.host);
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const domain1 = `http${https}://${devServer.options.host}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2
        )}`
      );

      return middlewares;
    },
  },
};

export default devConfig;
