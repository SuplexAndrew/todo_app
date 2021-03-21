import * as UserActionCreators from './user-actions'
import * as UserListActionCreators from './userlist-actions'
import * as TodoActionCreators from './task-actions'

export default {
    ...TodoActionCreators,
    ...UserActionCreators,
    ...UserListActionCreators
}
