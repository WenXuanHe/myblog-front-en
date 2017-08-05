
var KeyMirror = require( 'keymirror' );

let  ActionTypes = KeyMirror({
    CREATE_NEW_WORK: null,
    CHANGE_ACTIVE_WORK: null,
    CREATE_NEW_ARTICLE: null,
    CHANGE_ACTIVE_ARTICLE: null,
    UPDATE_ARTICLE_INFO: null,
    UPDATE_TITLE:null,
    DELETE_ARTICLE: null
}); 

module.exports = ActionTypes;