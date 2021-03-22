export type Task = {
    id: number
    title: string
    desc: string
    datestart: Date | null
    dateend: Date | null
    dateupdate: Date
    priority: number
    status: number
    employeeid: number
    creatorid: number
}

export interface TasksState {
    items: Task[],
    loading: boolean;
    error: null | string;
    needed: boolean
}

export enum TaskActionTypes {
    FETCH_TASKS = 'FETCH_TASKS',
    FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
    POST_TASKS_SUCCESS = 'POST_TASKS_SUCCESS',
    FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
}

interface fetchTaskAction {
    type: TaskActionTypes.FETCH_TASKS
}
interface postTaskAction {
    type: TaskActionTypes.POST_TASKS_SUCCESS,
    payload: boolean
}

interface fetchTaskSuccessAction {
    type: TaskActionTypes.FETCH_TASKS_SUCCESS
    payload: Task[]
}

interface fetchTaskErrorAction {
    type: TaskActionTypes.FETCH_TASKS_ERROR
    payload: string
}

export type TaskAction = fetchTaskAction | fetchTaskErrorAction | fetchTaskSuccessAction | postTaskAction
