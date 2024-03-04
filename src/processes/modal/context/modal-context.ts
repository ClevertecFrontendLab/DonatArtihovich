import ModalModes from "@utils/const/modal-modes";
import { createContext } from "react";

type ModalContextType = {
    mode: ModalModes | null;
    setMode: (m: ModalModes | null) => void;
}

export const ModalContext = createContext<ModalContextType | null>(null)