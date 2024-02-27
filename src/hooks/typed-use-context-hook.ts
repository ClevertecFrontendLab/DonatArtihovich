import { Context, useContext } from "react";

export const useRequiredContext = <T>(ctx: Context<T | null>): T => (
    useContext(ctx) ?? (() => { throw new Error('Context is null')})()
)