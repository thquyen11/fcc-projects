import * as React from "react";
import { connect } from "react-redux";
import { translateMarkdown, resetState, resizeEditor, resizePreview } from "./aMarkdownPreviewer";
import "./cMarkdownPreviewer.css";



interface StateProps{
    markedText: string,
    editorMaximized: boolean,
    previewMaximized: boolean,
}

const mapStateToProps = (state: any): StateProps =>{
    return {
        markedText: state.Markdown.markedText,
        editorMaximized: state.Zoom.editorMaximized,
        previewMaximized: state.Zoom.previewMaximized,
    }
}

interface DispatchProps{
    onEditorChange: typeof translateMarkdown,
    resetState: typeof resetState,
    resizeEditor: typeof resizeEditor,
    resizePreview: typeof resizePreview,
}

const mapDispatchToProps = (dispatch: any): DispatchProps =>{
    return {
        onEditorChange: (event: any) => dispatch(translateMarkdown(event)),
        resetState: ()=> dispatch(resetState()),
        resizeEditor: ()=> dispatch(resizeEditor()),
        resizePreview: ()=> dispatch(resizePreview()),
    }
}

interface Props extends StateProps, DispatchProps{

}

class MarkdownPreviewer extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const rows:number = 5;
        const { markedText, onEditorChange, editorMaximized, previewMaximized, resizeEditor, resizePreview } = this.props;
        const classes: any[] = editorMaximized ? 
                                ["editorWrap maximized",
                                "previewWrap hide",
                                "fa fa-compress"]
                                : previewMaximized?
                                    ["editorWrap hide",
                                    "previewWrap maximized",
                                    "fa fa-compress"]
                                : ["editorWrap",
                                    "previewWrap",
                                    "fa fa-arrows-alt"]
            
        return(
            <div className="container">
                <div className={classes[0]}>  
                    <div className="container">
                        <div className="row text-left" id="toolbar">
                            <h5>Editor</h5>
                            <i className={classes[2]} onClick={resizeEditor}></i>
                        </div>
                    </div>
                    <textarea id="editor" rows={rows} onChange={onEditorChange}></textarea>
                </div> 
                <div className={classes[1]}>
                    <div className="container">
                        <div className="row text-left" id="toolbar">
                            <h5>Preview</h5>
                            <i className={classes[2]} onClick={resizePreview}></i>
                        </div>
                    </div>
                    <div id="preview">
                        <p>{markedText}</p>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.resetState();
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(MarkdownPreviewer);