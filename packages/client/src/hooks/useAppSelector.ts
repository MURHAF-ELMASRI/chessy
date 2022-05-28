import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "src/core/store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
