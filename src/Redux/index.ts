import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskReducer} from "./reducers/TaskReducer";
import {UserReducer} from "./reducers/UserReducer";
import thunk from "redux-thunk";
import {UserListReducer} from "./reducers/UserListReducer";

export const rootReducer = combineReducers({tasks: TaskReducer, user: UserReducer, users: UserListReducer})
export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

