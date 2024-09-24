import { createReducer, on } from "@ngrx/store";
import { blogState } from "./blog.state";
import { addblog, addblogsuccess, deleteblog, loadblog, loadblogfail, loadblogsuccess, updateblog } from "./blog.actions";
import { BlogModel } from "./blog.model";

const _blogReducer = createReducer(blogState,
    on(loadblog, (state) => {
        return {
            ...state
        }
    }),
    on(loadblogsuccess, (state,action) => {
        return {
            ...state,
            bloglist: [...action.bloglist],
            Errormessage: ''
        }
    }),
    on(loadblogfail, (state,action) => {
        return {
            ...state,
            bloglist: [],
            Errormessage: action.Errortext
        }
    }),
    // on(addblog, (state,action) => {
    //     const _blog={...action.bloginput};
    //     _blog.id = state.bloglist.length+1;
    //     return {
    //         ...state,
    //         bloglist: [...state.bloglist,_blog]
    //     }
    // }),
    on(addblogsuccess, (state,action) => {
        const _blog={...action.bloginput};
        return {
            ...state,
            bloglist: [...state.bloglist,_blog]
        }
    }),
    on(updateblog, (state,action) => {
        const _blog={...action.bloginput};
        const updatedblog = state.bloglist.map(blog => {
            return _blog.id === blog.id?_blog:blog;
        })
        return {
            ...state,
            bloglist: updatedblog
        }
    }),
    on(deleteblog, (state,action) => {
        const updatedblog = state.bloglist.filter((data: BlogModel) => {
            return data.id !== action.id;
        })
        return {
            ...state,
            bloglist: updatedblog
        }
    })
)

export  function blogReducer(state: any, action: any) {
    return _blogReducer(state, action);
}