import { ModalErrors } from "@utils/const/modal-errors";
import { createContext } from "react";

type ModalContextType = {
    mode: ModalErrors | null;
    setMode: (m: ModalErrors | null) => void;
}

export const ModalContext = createContext<ModalContextType | null>(null)