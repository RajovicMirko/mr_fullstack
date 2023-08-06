const requireDir = require("require-dir");
const controllers = requireDir("../controllers");

const appRouter = (express, app) => {
  const router = express.Router();

  // all routes
  const allControllers = Object.values(controllers).reduce(
    (acc, controller) => ({
      ...acc,
      ...controller,
    }),
    {}
  );

  Object.values(allControllers).forEach(
    ({ method, url, handler, middleware }) => {
      const baseMiddleware = (req, res, next) => {
        next();
      };
      const middlewareFn = middleware ?? baseMiddleware;

      router[method](url, middlewareFn, handler);
    }
  );

  app.use("/api", router);

  // not found 404
  app.use((req, res) => {
    res.status(404).json({ error: "Not Found", path: req.path });
  });
};

module.exports = appRouter;
