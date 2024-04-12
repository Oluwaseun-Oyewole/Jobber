import { JobSlice } from "@/app/store/query";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducers";

export const store = () => {
  return configureStore({
    reducer: {
      rootReducer,
      [JobSlice.reducerPath]: JobSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([JobSlice.middleware]),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
