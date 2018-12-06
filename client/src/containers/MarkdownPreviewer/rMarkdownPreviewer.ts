import { TRANSLATE_MARKDOWN, RESET_STATE, RESIZE_EDITOR, RESIZE_PREVIEW } from "./constans";



const initialMarkdown = {
    bareText: "",
    markedText: "",
}

export const Markdown = (state= initialMarkdown, action:any = {}) =>{
    switch(action.type){
        case TRANSLATE_MARKDOWN:
            return Object.assign({}, state, {bareText: action.payload.bareText, markedText: action.payload.markedText})
        case RESET_STATE:
            return Object.assign({}, state, {bareText: action.payload.bareText, markedText: action.payload.markedText})  
        default:
            return state;
    }
}

const initialZoom = {
    editorMaximized: false,
    previewMaximized: false,
}

export const Zoom = (state= initialZoom, action: any={})=>{
    const editorMaximized = state.editorMaximized;
    const previewMaximized = state.previewMaximized;

    switch(action.type){
        case RESIZE_EDITOR:
            return Object.assign({}, state, {editorMaximized: !editorMaximized})
        case RESIZE_PREVIEW:
            return Object.assign({}, state, {previewMaximized: !previewMaximized})
        default:
            return state;
    }
        
}