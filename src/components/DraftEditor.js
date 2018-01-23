// import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';


// class DraftEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = (editorState) => this.setState({editorState});
//   }

//   _onBoldClick() {
//     this.onChange(RichUtils.toggleInlineStyle(
//       this.state.editorState,
//       "BOLD"
//     ));
//   }

//   _onItalicClick() {
//     this.onChange(RichUtils.toggleInlineStyle(
//       this.state.editorState,
//       "ITALIC"
//     ));
//   }

//   _onUnderlineClick() {
//     this.onChange(RichUtils.toggleInlineStyle(
//       this.state.editorState,
//       "UNDERLINE"
//     ));
//   }

//   render() {
//     return (
//         <div className="editor-container">
//             <h1>Draft.js Editor</h1>
//             <button onClick={this._onBoldClick.bind(this)}>Bold</button>
//             <button onClick={this._onItalicClick.bind(this)}>Italic</button>
//             <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>


//             <div className="editor-div">
//             <Editor editorState={this.state.editorState} onChange={this.onChange} />
//             </div>
//         </div>
//     );
//   }
// }

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

class DraftEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    console.log(this.state.value.toString('html'))
    // if (this.props.onChange) {
    //   // Send the changes up to the parent component as an HTML string.
    //   // This is here to demonstrate using `.toString()` but in a real app it
    //   // would be better to avoid generating a string on each change.
    //   this.props.onChange(
    //     value.toString('html')
    //   );
    // }
  };

  // onSubmit(){
  //   console.log("submit")
  // }

  render () {
    return (
      <div>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
        />
        <div>
          {this.state.value.toString('markdown')}
          <br />
          {this.state.value.toString('html')}
        </div>
      </div>
    );
  }
}


export default DraftEditor;



