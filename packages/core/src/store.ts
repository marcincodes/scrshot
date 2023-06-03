import { createStore } from "@stencil/store";

const params = new URLSearchParams(window.location.search);

const { state, onChange } = createStore({
  isDebug: false,
  isScreenshot: params.has('scrshot') || false
});

// function darkenPag

onChange('isDebug', value => {
  // console.log(window);
  state.isDebug = value;
});

export default state;
