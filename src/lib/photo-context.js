import { createContext, useContext } from "react";

export const PhotoContext = createContext({ photos: [], open: () => {} });

export function usePhotos() {
  return useContext(PhotoContext);
}
