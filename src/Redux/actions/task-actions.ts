import {Task, TaskAction, TaskActionTypes} from "../../Models/Task";
import {Dispatch} from "redux";
import axios from "axios";


export interface INewTaskProps {
    title: string
    desc: string
    datestart: Date | null
    dateend: Date | null
    priority: number
    employeeid: number
}

export const addTask = (data: INewTaskProps) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        dispatch({type: TaskActionTypes.FETCH_TASKS})
        const t = {
            title: data.title,
            desc: data.desc,
            datestart: data.datestart,
            dateend: data.dateend,
            dateupdate: new Date(),
            priority: data.priority,
            status: 1,
            employeeid: data.employeeid,
            creatorid: 1
        }
        axios.post('http://localhost:8000/api/create', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(t)
        })
            .then(response => {
                dispatch({type: TaskActionTypes.POST_TASKS_SUCCESS, payload: response.data})
            })
            .catch(err => {
                dispatch({
                    type: TaskActionTypes.FETCH_TASKS_ERROR,
                    payload: err.message
                })
            })
    }
}
export const upTaskStatus = (data: number) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        dispatch({type: TaskActionTypes.FETCH_TASKS})
        console.log(data)
        axios.post('http://localhost:8000/api/up', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(response => {
                dispatch({type: TaskActionTypes.POST_TASKS_SUCCESS, payload: response.data})
            }
            )

            .catch(err => {
                dispatch({
                    type: TaskActionTypes.FETCH_TASKS_ERROR,
                    payload: err.message
                })
            })
    }
}
export const editTask = (data: Task) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        dispatch({type: TaskActionTypes.FETCH_TASKS})
        axios.post('http://localhost:8000/api/edit', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(response => {
                dispatch({type: TaskActionTypes.POST_TASKS_SUCCESS, payload: response.data})
            })
            .catch(err => {
                dispatch({
                    type: TaskActionTypes.FETCH_TASKS_ERROR,
                    payload: err.message
                })
            })
    }
}
export const fetchTasks = (id: number | undefined) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        dispatch({type: TaskActionTypes.FETCH_TASKS})
        axios.get(`http://localhost:8000/api/tasks?id=${id}`).then(response =>
            dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: response.data})
        )
            .catch(err =>
                dispatch({
                    type: TaskActionTypes.FETCH_TASKS_ERROR,
                    payload: err
                }))

    }
}

