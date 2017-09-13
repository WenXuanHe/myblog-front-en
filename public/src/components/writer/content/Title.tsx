import * as React from 'react'

interface Props{

    title:string,
    onChange:() => void,
    onBlur: () => void
}

export default class Title extends React.PureComponent<Props>{

    render(){
        return <header className='mb2'>
            <input type='text' value={this.props.title} onChange={this.props.onChange} onBlur={this.props.onBlur} />
        </header>
    }
}