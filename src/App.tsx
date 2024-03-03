import "./App.scss";
import LittleHuman from "./components/LittleHuman";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ActionGroup from "./components/ActionGroup";
import GenerateGroup from "./components/GenerateGroup";
import Configurator from "./components/Configurator";

function App() {
  return (
    <main className="main">
      <Container>
        <Header />

        <div className="content-view">
          <div className="playground">
            <LittleHuman />
            <ActionGroup />
            <GenerateGroup />
            <Configurator />
          </div>
        </div>

        <Footer />
      </Container>
    </main>
  );
}

export default App;
