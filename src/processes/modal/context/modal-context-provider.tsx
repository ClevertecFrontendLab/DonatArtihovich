import { useState } from "react"
import { ModalContext } from "./modal-context"
import { ModalErrors } from "@utils/const/modal-errors"

type ModalContextProviderProps = {
    children: React.ReactNode;
}

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
    const [mode, setMode] = useState<ModalErrors | null>(null)

    return (
        <ModalContext.Provider value={{ mode, setMode }}>
            {children}
        </ModalContext.Provider>
    )
}