import { useState } from "react";
import { useImmer } from "use-immer";

import "./App.scss";
import LittleHuman from "./components/LittleHuman";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ActionGroup from "./components/ActionGroup";
import GenerateGroup from "./components/GenerateGroup";
import Configurator from "./components/Configurator";
import type { HumanOption } from "./types";
import { ActionType } from "./utils/enums";

function App() {
  const [humanOption, updateHumanOption] = useImmer<HumanOption>({
    widgets: {
      head: {
        shapeIndex: 0,
        color: "#000000",
      },
      body: {
        shapeIndex: 0,
        color: "#ffffff",
      },
      bottom: {
        shapeIndex: 0,
        color: "#000000",
      },
      item: {
        shapeIndex: 0,
      },
    },
    skinColor: "#ffffff",
    strokeColor: "#000000",
  });
  const [flipped, setFlipped] = useState(false);

  function handleAction(actionType: ActionType) {
    switch (actionType) {
      case ActionType.Flip:
        setFlipped(!flipped);
        break;
    }
  }

  return (
    <main className="main">
      <Container>
        <Header />

        <div className="content-view">
          <div className="playground">
            <LittleHuman humanOption={humanOption} flipped={flipped} />
            <ActionGroup action={handleAction} />
            <GenerateGroup />
            <Configurator
              humanOption={humanOption}
              onChange={updateHumanOption}
            />
          </div>
        </div>

        <Footer />
      </Container>
    </main>
  );
}

export default App;
