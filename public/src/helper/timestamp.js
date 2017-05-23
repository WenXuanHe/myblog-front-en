export default () =>{

    let date = new Date();

    return date.toJSON().replace(/[T:-]|\..+$/g, '');
}
