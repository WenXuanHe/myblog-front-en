let React = require('react');

const myButton = (props) => {
    let { className, func, value} = props;
     return (
            <a className={ "btn " + className} href="javascript:void(0);" onClick={func}>{value}</a>
        )
}
module.exports = myButton;
