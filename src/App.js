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
        <Route path="/info" component={InfoPageContainer} />
        <Route path="/" component={BodyContainer} />
      </Switch>
    </>
  )
}

export default App
