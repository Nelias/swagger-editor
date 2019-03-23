import * as React from 'react';
import { connect } from 'react-redux';

class Editor extends React.Component<any, any> {

    render() {
        return(
            <textarea style={{width: "800px", overflowY: "scroll"}} 
            className="editor-field" 
            name="editor" 
            defaultValue={JSON.stringify(this.props.spec, undefined, 2)}
            onChange={(event) => this.props.onTextChange(event.target.value)}>
            </textarea>
        )
    }
}

const mapStateToProps = (state: any, ownProps: any = {}) => {
    return {
        spec: state.spec
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTextChange: (value: string) => dispatch({type: 'TEXT_CHANGE', value: value})
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Editor);

