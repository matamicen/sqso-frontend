import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

const reactotron =
  process.env.NODE_ENV !== "production"
    ? Reactotron.configure({ name: "SuperQso Web" }) // we can use plugins here -- more on this later
        .use(reactotronRedux())
        .connect()
    : null; // let's connect!

export default reactotron;
