import { routerReducer } from "@ngrx/router-store";
import { blogReducer } from "../Blog/blog.reducer";
import { counterReducer } from "../counter.reducer";

export const AppState= {
    counter: counterReducer,
    blog: blogReducer,
    // app: AppReducer,
    router: routerReducer
}