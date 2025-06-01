import { createContext, useState, useEffect } from "react";

import FetchHelper from "../fetch-helper.js";

export const TrackerListContext = createContext();

function TrackerListProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [trackerListDto, setTrackerListDto] = useState({
    state: "ready", // one of ready/pending/error
    data: null,
    error: null,
  });

  async function handleLoad() {
    setTrackerListDto((current) => {
      return { ...current, data: undefined, state: "pending" };
    });
    const result = await FetchHelper.tracker.list({ date: selectedMonth });

    setTrackerListDto((current) => {
      if (result.ok) {
        return { ...current, state: "ready", data: result.data, error: null };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, [selectedMonth]);
  /* eslint-enable */

  async function handleCreate(dtoIn) {
    setTrackerListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.tracker.create(dtoIn);
    setTrackerListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleUpdate(dtoIn) {
    setTrackerListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.tracker.update(dtoIn);
    setTrackerListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList[itemIndex] = dtoIn;
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleDelete(dtoIn) {
    setTrackerListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.tracker.delete(dtoIn);
    setTrackerListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  const value = {
    ...trackerListDto,
    selectedMonth,
    setSelectedMonth,
    handlerMap: { handleLoad, handleCreate, handleUpdate, handleDelete },
  };

  return (
    <TrackerListContext.Provider value={value}>
      {children}
    </TrackerListContext.Provider>
  );
}

export default TrackerListProvider;
