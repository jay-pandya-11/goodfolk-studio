"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear().toString();
const getServerYear = () => "";

export function CurrentYear() {
  return useSyncExternalStore(subscribe, getCurrentYear, getServerYear);
}
