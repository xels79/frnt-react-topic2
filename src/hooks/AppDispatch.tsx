import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;