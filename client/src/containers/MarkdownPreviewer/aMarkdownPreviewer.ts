import { TRANSLATE_MARKDOWN, RESET_STATE, RESIZE_EDITOR, RESIZE_PREVIEW } from "./constans";
import * as marked from "marked";



export const translateMarkdown = (event: any)=>{
    const markedText = marked(event.target.value);
    console.log(markedText);

    return{
        type: TRANSLATE_MARKDOWN,
        payload: {
            bareText: event.target.value,
            markedText: markedText,
        }
    }
}

export const resetState = ()=>{
    return{
        type: RESET_STATE,
        payload: {
            bareText: "",
            markedText: "",
            editorMaximized: false,
            previewMaximized: false,
        }
    }
}

export const resizeEditor = ()=>{
    return{
        type: RESIZE_EDITOR,
        payload: {},
    }
}

export const resizePreview=()=>{
    return{
        type: RESIZE_PREVIEW,
        payload: {},
    }
}