if (process.env.NODE_ENV !== "production") {
  const Reactotron = require("reactotron-react-js").default;
  const { trackGlobalErrors } = require("reactotron-react-js");

  const { reactotronRedux } = require("reactotron-redux");

  Reactotron.configure({ name: "SuperQso Web", secure: false })

    .use(reactotronRedux())
    .use(trackGlobalErrors({ offline: false }))

    .connect();

  // Reactotron.clear()

  console.tron = Reactotron;
}
