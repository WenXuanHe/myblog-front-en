export default (status, msg, result={}):{status:number, msg: string, result:any} => {
    return {
        status, result, msg
    }
}
