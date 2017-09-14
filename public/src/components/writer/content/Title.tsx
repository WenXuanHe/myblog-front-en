import * as React from 'react'

interface Props{

    title:string,
    onChange:(title:string) => void,
    onBlur: () => void
}

export default class Title extends React.PureComponent<Props>{

    titleChange = (e) => {
        this.props.onChange(e.target.value);
    }

    render(){
        return <header className='mb2'>
            <input type='text' value={this.props.title || ''} onChange={this.titleChange} onBlur={this.props.onBlur} />
        </header>
    }
}