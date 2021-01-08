import { Route, Switch } from "react-router-dom"
import "./App.css"
import NavBar from "./Components/NavBar"
import BodyContainer from "./Containers/BodyContainer"
import InfoPageContainer from "./Containers/InfoPageContainer"

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route
          path="/pathfinding-visualizer/info"
          component={InfoPageContainer}
        />
        <Route path="/pathfinding-visualizer" component={BodyContainer} />
      </Switch>
    </>
  )
}

export default App
