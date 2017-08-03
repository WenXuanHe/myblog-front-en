import {addOne} from '../public/javascripts/src/PraiseButton';

describe("Thumb", function() {
  it(" add async", function(done) {
    let add = addOne('/proxy');
    add(1).then(function(res){
        if(res && res.result && res.result.number
         && typeof res.result.number === 'number'){
            done();
        }
    });
  });
});