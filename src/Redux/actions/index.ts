import * as UserActionCreators from './user-actions'
import * as UserListActionCreators from './userlist-actions'
import * as TodoActionCreators from './task-actions'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ...TodoActionCreators,
    ...UserActionCreators,
    ...UserListActionCreators
}
