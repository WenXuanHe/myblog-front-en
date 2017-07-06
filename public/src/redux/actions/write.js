// { type: 'FETCH_POSTS' }
// { type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
// { type: 'FETCH_POSTS', status: 'success', response: { ... } }

const createNewWork = ({status='', payload=''}) => ({
  type: 'CREATE_NEW_WORK',
  payload:payload,
  status:status
})

const changeActiveWork = ({status='', payload=''}) => ({
    type:'CHANGE_ACTIVE_WORK',
    payload:payload,
    status:status
})


export default{
    createNewWork,
    changeActiveWork
}