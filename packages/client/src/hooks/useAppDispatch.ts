import { useDispatch } from "react-redux";
import { AppDispatch } from "src/core/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
