import {Reducer} from "react";
import {TaskAction, TaskActionTypes, TasksState} from "../../Models/Task";

const InitialState: TasksState = {
    items: [],
    loading: false,
    error: null,
    needed: true
}
export const TaskReducer: Reducer<TasksState, TaskAction> = (state = InitialState, action: TaskAction) => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {...state, loading: true, error: null, items: state.items, needed: false }

        case TaskActionTypes.FETCH_TASKS_SUCCESS:
            console.log(action.payload)
            return {...state, loading: false, error: null, items: action.payload, needed: false }

        case TaskActionTypes.POST_TASKS_SUCCESS:
            return {...state, loading: false, error: null, items: state.items, needed: true}

        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {...state, loading: false, error: action.payload, items: state.items, needed: false }

        default:
            return state
    }
}
