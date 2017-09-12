import * as mysql from 'mysql'

export default () => {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database:'blog'
    });
    return new Promise(function(resolve, reject){
        connection.connect((err:any) => {
            if (err) {
                reject(err);
            }else{
                resolve(connection);
            }
        });
    })
    .catch(function(err){
        console.error('error connecting: ' + err.stack);
    });
};