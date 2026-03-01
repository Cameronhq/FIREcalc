"use client";

import { useEffect } from "react";
import { useFireStore } from "@/store/useFireStore";

export function StoreHydrator() {
  useEffect(() => {
    useFireStore.persist.rehydrate();
  }, []);

  return null;
}
