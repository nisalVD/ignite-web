import React, {Component} from 'react'
import DraftEditor from './DraftEditor'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';



class AddModulePage extends Component {

    static propTypes = {
        onChange: PropTypes.func,
      };

    state = {
        value: RichTextEditor.createEmptyValue()

        
    }

    handleSubmit(event){
        // Prevent default form submission
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        // Get entered values
        const heading = elements.heading.value
        const content = this.state.value
        console.log(elements)
        // onSubmit({ heading })
    }

    onChange = (value) => {
        this.setState({value});
        // console.log(this.state.value.toString('html'))
        console.log(this.state.value)

        // if (this.props.onChange) {
        //   // Send the changes up to the parent component as an HTML string.
        //   // This is here to demonstrate using `.toString()` but in a real app it
        //   // would be better to avoid generating a string on each change.
        //   this.props.onChange(
        //     value.toString('html')
        //   );
        // }
      };

    render(){
    
    return (
        <div className="admin-page">
            <div>
                ADD MODULE
                <br /><br />

                <form onSubmit={this.handleSubmit.bind(this)}> 

                    <label>
                    {'Module Name'}
                    </label>
                    <br />
                    <input
                    type="text"
                    name="heading"
                    autoFocus="true"
                    />
                    <br /><br />
                    <label>
                    {'Content'}
                    </label>
                    <br /><br />
                    <div>
                        <RichTextEditor
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <div>
                        {this.state.value.toString('html')}
                        </div>
                    </div>
                    <br /><br />
                    <button type="submit">Submit</button>
                </form>                    
            </div>     
        </div>
    );
}
}

export default AddModulePage