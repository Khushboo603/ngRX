import { BlogModel, Blogs } from "../Blog/blog.model";
import { CounterModal } from "../counter.modal";

export interface AppStateModel {
    counter: CounterModal,
    blog: Blogs
}