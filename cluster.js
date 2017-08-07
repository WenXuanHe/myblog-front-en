var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var requests = 0;
var workers = {};
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    workers[i] = cluster.fork();
    workers[i].on('message', function (message) {
      if (message.cmd === 'incrementRequestTotal') {
        requests++;

        for (let j = 0; j < numCPUs; j++) {
          workers[j].send({
            cmd: 'updateOfRequestTotal',
            requests: requests
          })
        }
      }
    });
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker' + worker.process.pid + " died.");

  });

  

}else{
    //启动node服务
}