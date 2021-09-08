import './App.css';
import { Route, Switch } from "react-router-dom";
import Table from './screens/table';
import Form from './screens/form';
function App() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={Table} />
          <Route path="/form" component={Form} />
        </Switch>
      </div>
  );
}

export default App;
