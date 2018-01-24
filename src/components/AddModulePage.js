import React, {Component} from 'react'
import DraftEditor from './DraftEditor'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {postNewModule} from '../api/adminData'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {Redirect} from 'react-router-dom';




class AddModulePage extends Component {

    static propTypes = {
        onChange: PropTypes.func,
      };

    state = {
        value: RichTextEditor.createEmptyValue(),
        redirect: false
    }

    handleSubmit(event){
        // Prevent default form submission
        event.preventDefault()

        const form = event.target
        const elements = form.elements
        // Get entered values
        const name = elements.name.value
        const content = this.state.value.toString('html') 
        console.log(elements)
        // onSubmit({ name })

        postNewModule(name, this.state.value.toString('html'))
        .then(res => console.log(res.data))
        .then(() => this.setState({redirect: true}))

        
    }

    onChange = (value) => {
        this.setState({value});
        console.log(this.state.value.toString('html'))
        // console.log(this.state.value)

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
    if (this.state.redirect)
        return (<Redirect to={{
            pathname: '/admin',
    }} />)
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
                    name="name"
                    autoFocus="true"
                    className="add-module-name"
                    />
                    <br /><br />
                    <label>
                    {'Content'}
                    </label>
                    <br />
                    <div className="editor-container">
                        <RichTextEditor
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <br /><br />
                    <Button
                    raised 
                    type="submit"
                    color="primary"
                    className={this.props.classes.button}
                    >
                    CREATE MODULE
                    </Button>                
                </form>                    
            </div>     
        </div>
    );
}
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      width: 500,
      height: 100
    }
  });

  export default withStyles(styles)(AddModulePage);
