import { useRoutes } from "react-router-dom";
import AdminContainer from "./AdminContainer";
import GlobalRoutes from "./GlobalRoutes";


export default function ThemeRoutes() {
    return useRoutes([AdminContainer, GlobalRoutes])
}