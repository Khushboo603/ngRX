export interface BlogModel {
    id: number,
    title: string,
    // description: string
    body: string
}

export interface Blogs {
    bloglist: BlogModel[],
    Errormessage: string
}