import { useRef, useState } from "react";
import { useImmer } from "use-immer";

import type { LittleHumanRef, History } from "./types";
import { ActionType } from "./utils/enums";
import { DOWNLOAD_DELAY } from "./utils/constant";
import { name as appName } from "../package.json";

import "./App.scss";

import LittleHuman from "./components/LittleHuman";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ActionGroup from "./components/ActionGroup";
import GenerateGroup from "./components/GenerateGroup";
import Configurator from "./components/Configurator";

function App() {
  const [flipped, setFlipped] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const littleHumanRef = useRef<LittleHumanRef>(null);
  const [history, updateHistory] = useImmer<History>({
    past: [],
    present: {
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
    },
    future: [],
  });

  function handleAction(actionType: ActionType) {
    switch (actionType) {
      case ActionType.Flip:
        setFlipped(!flipped);
        break;
      case ActionType.Download:
        handleDownload();
        break;
      case ActionType.Undo:
        updateHistory((draft) => {
          const last = draft.past.pop();
          if (last) {
            draft.future.push(draft.present);
            draft.present = last;
          }
        });
        break;
      case ActionType.Redo:
        updateHistory((draft) => {
          const next = draft.future.pop();
          if (next) {
            draft.past.push(draft.present);
            draft.present = next;
          }
        });
        break;
    }
  }

  async function handleDownload() {
    setDownloading(true);

    const dataURL = await littleHumanRef.current!.getDataURL();

    const trigger = document.createElement("a");
    trigger.href = dataURL;
    trigger.download = `${appName}.png`;
    trigger.click();

    setTimeout(() => {
      setDownloading(false);
    }, DOWNLOAD_DELAY);
  }

  return (
    <main className="main">
      <Container>
        <Header />

        <div className="content-view">
          <div className="playground">
            <LittleHuman
              humanOption={history.present}
              flipped={flipped}
              ref={littleHumanRef}
            />
            <ActionGroup
              action={handleAction}
              downloading={downloading}
              canUndo={history.past.length > 0}
              canRedo={history.future.length > 0}
            />
            <GenerateGroup />
            <Configurator
              humanOption={history.present}
              onChange={updateHistory}
            />
          </div>
        </div>

        <Footer />
      </Container>
    </main>
  );
}

export default App;
