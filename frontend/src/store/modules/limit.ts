import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "@/store";
import { audioController, pause } from "@/store/modules/audio";
import { safelyParseJSON } from "@/utils/safelyParseJson";
import { eventBus, EventsEnum } from "@/utils/eventBus";

//because we will prevent play if user has reached limit
let originalPlayFn = audioController.play;
export const getIsLimitReached = () => audioController.play !== originalPlayFn;
function handleOverLimit() {
  const currentState = store.getState();
  if (currentState.limit.value < currentState.limit.playedToday) {
    audioController.play = () =>
      new Promise((resolve) => {
        resolve();
      });
    store.dispatch(pause());
    eventBus.emit(EventsEnum.limitReach);
  }
}

setTimeout(handleOverLimit);
//Simple, not 100% accurate audio tracker
setInterval(() => {
  const currentState = store.getState();
  if (currentState.limit.value > 0 && currentState.audio.isPlaying) {
    //Not count seconds if user click on 'play' when play is not working
    if (!getIsLimitReached()) store.dispatch(addPlayedToday(1));
    handleOverLimit();
  }
}, 1000);

interface IPlayInfo {
  playedToday: number;
  date: string;
}
function getPlayedToday() {
  const playInfo: IPlayInfo = safelyParseJSON(localStorage.getItem("playInfo"));
  if (!playInfo) return 0;
  if (generateDateString() === playInfo.date) {
    return playInfo.playedToday;
  }
  return 0;
}

function generateDateString() {
  const date = new Date();
  return `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`;
}

function setPlayInfo(playedToday: number) {
  const playInfo = {
    playedToday,
    date: generateDateString(),
  };
  localStorage.setItem("playInfo", JSON.stringify(playInfo));
}

const initialState = {
  //seconds
  value: Number(localStorage.getItem("limit")) || 0,
  playedToday: getPlayedToday(),
};

const limitSlice = createSlice({
  name: "limit",
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      if (state.value < action.payload) {
        localStorage.setItem("limit", action.payload.toString());
      }
      state.value = action.payload;
      audioController.play = originalPlayFn;
    },
    addPlayedToday(state, action: PayloadAction<number>) {
      state.playedToday += action.payload;
      setPlayInfo(state.playedToday);
    },
  },
});

export const { setLimit, addPlayedToday } = limitSlice.actions;

export default limitSlice.reducer;
