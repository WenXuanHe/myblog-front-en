
export default function(duraing:number, format:string='m'){
    //以一分钟为最低间隔时间
    let base = 60*1000;
    let date = new Date();
    let translate = {
        m: base,
        h: 60*base,
        d: 24*60*base
    }

    date.setTime(date.getTime() + duraing * translate[format]);

    return date;
}