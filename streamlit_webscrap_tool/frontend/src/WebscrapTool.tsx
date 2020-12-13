import {
  StreamlitComponentBase,
  withStreamlitConnection
} from "streamlit-component-lib";
import React, { ReactNode } from "react"
import MarkdownPreview from '@uiw/react-markdown-preview';
import JsxParser from 'react-jsx-parser'
import CloseIcon from '@material-ui/icons/Close';
import './index.css'

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class WebscrapTool extends StreamlitComponentBase<State> {

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const html_print = this.props.args["html_print"];
    const html = this.props.args["html"];
    return (
      <div className='code__render'>
        {
          html_print.map((code: string, index: number) => {
            return (
              <div className='code__block' key={`code__${index}`} id={`code__${index}`}>
                <div className='code__header'>
                  <div className='code__headerLeft'>
                    <span className='code__index'>No. {index}</span>
                  </div>
                  <div className='code__headerRight'>
                    <CloseIcon onClick={() => this.onClicked(index)} />
                  </div>
                </div>
                <div className='code__views'>
                  <div className='code__markdown'>
                    <MarkdownPreview source={code} />
                  </div>
                  <div className='code__view'>
                    <JsxParser jsx={html[index]} />
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
    )
  }

  /** Click handler */
  private onClicked = (index: any): void => {
    document.getElementById(`code__${index}`).remove();
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(WebscrapTool)
