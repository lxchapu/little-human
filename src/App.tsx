import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';

import type { LittleHumanRef, History, HumanOption } from './types';
import { ActionType, WidgetType } from './utils/enums';
import { DOWNLOAD_DELAY, SETTINGS, TRIGGER_PROBABILITY } from './utils/constant';
import { name as appName } from '../package.json';
import { getRandomHumanOption, showConfetti } from './utils';

import './App.scss';

import LittleHuman from './components/LittleHuman';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import ActionGroup from './components/ActionGroup';
import GenerateGroup from './components/GenerateGroup';
import Configurator from './components/Configurator';
import BatchDownloadModal from './components/modal/BatchDownloadModal';

function App() {
  const [flipped, setFlipped] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const littleHumanRef = useRef<LittleHumanRef>(null);
  const [history, updateHistory] = useImmer<History>({
    past: [],
    present: getRandomHumanOption(),
    future: [],
  });
  const [humanList, setHumanList] = useState<HumanOption[]>([]);
  const humanListVisible = humanList.length > 0;

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

    const trigger = document.createElement('a');
    trigger.href = dataURL;
    trigger.download = `${appName}.png`;
    trigger.click();

    setTimeout(() => {
      setDownloading(false);
    }, DOWNLOAD_DELAY);
  }

  function generateRandomHuman() {
    const randomOption = getRandomHumanOption();

    if (Math.random() <= TRIGGER_PROBABILITY) {
      randomOption.widgets[WidgetType.Body].color = SETTINGS.specialColor;
      randomOption.widgets[WidgetType.Bottom].color = SETTINGS.specialColor;
      randomOption.widgets[WidgetType.Item].shapeIndex = SETTINGS.specialItemShapeIndex;
      showConfetti();
    }

    updateHistory((draft) => {
      draft.past.push(history.present);
      draft.future = [];
      draft.present = randomOption;
    });
  }

  async function generateMultipleHumans() {
    const { default: hash } = await import('object-hash');

    const humanMap = [...Array(30)].reduce<Map<string, HumanOption>>((res) => {
      let randomHumanOption: HumanOption;
      let hashKey: string;

      do {
        randomHumanOption = getRandomHumanOption();
        hashKey = hash.sha1(randomHumanOption);
      } while (res.has(hashKey));

      res.set(hashKey, randomHumanOption);

      return res;
    }, new Map());

    const list = Array.from(humanMap.values());

    setHumanList(list);
  }

  return (
    <main className="main">
      <Container>
        <div className="content-view">
          <Header />

          <div className="playground">
            <LittleHuman humanOption={history.present} flipped={flipped} ref={littleHumanRef} />
            <ActionGroup
              action={handleAction}
              downloading={downloading}
              canUndo={history.past.length > 0}
              canRedo={history.future.length > 0}
            />
            <GenerateGroup
              clickRandom={generateRandomHuman}
              clickMultiple={generateMultipleHumans}
            />
            <Configurator humanOption={history.present} onChange={updateHistory} />
          </div>

          <Footer />
        </div>

        <canvas
          id="confetti"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
          }}
        ></canvas>
      </Container>

      <BatchDownloadModal
        visible={humanListVisible}
        humanList={humanList}
        regenerate={generateMultipleHumans}
        close={() => {
          setHumanList([]);
        }}
      />
    </main>
  );
}

export default App;
