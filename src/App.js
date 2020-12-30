import { Provider } from "react-redux";
import "./App.css";
import Main from "./component";

import configStore from "./redux/configStore";
const store = configStore();

function App() {

  return (
    <>
    
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}

export default App;
