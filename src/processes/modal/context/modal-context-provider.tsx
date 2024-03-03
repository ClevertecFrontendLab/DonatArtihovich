import { useState } from "react"
import { ModalContext } from "./modal-context"
import ModalModes from "@utils/const/modal-modes";

type ModalContextProviderProps = {
    children: React.ReactNode;
}

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
    const [mode, setMode] = useState<ModalModes | null>(null)

    return (
        <ModalContext.Provider value={{ mode, setMode }}>
            {children}
        </ModalContext.Provider>
    )
}