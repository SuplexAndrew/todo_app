import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {getSortFunction} from "./CompareFunction";
import {getShowFunction} from "./CompareFunction";
import {Task} from '../Models/Task'
import {TaskComponent} from './TaskComponent';
import {useTypedSelector} from "../Hooks/useTypedSelector";
import {useActions} from "../Hooks/useActions";
import {TaskEdit} from "./TaskEdit";
import {useStore} from "react-redux";
import {User} from "../Models/User";
import {UserListState} from "../Redux/reducers/UserListReducer";

const optionShow = ["Все", "Сегодня", "Завтра", "Неделя", "Месяц"]
const optionSort = ["Дате начала", "Дате окончания", "Последнему обновлению", "Алфавиту", "Приоритету",]

export const Main = () => {
    const store = useStore()
    const {addTask, editTask, upTaskStatus, fetchTasks, fetchUserList} = useActions()
    store.subscribe(() => setTasks(store.getState().tasks.items))
    store.subscribe(() => setTasksShowed(store.getState().tasks.items.filter(getShowFunction(show))))
    store.subscribe(() => setUsers(store.getState().users.users))


    const user = useTypedSelector(state => state.user)
    const [tasks, setTasks] = useState<Task[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [tasksShowed, setTasksShowed] = useState<Task[]>(tasks)
    const [show, setShow] = useState<string>(optionShow[0])
    const [sort, setSort] = useState<string>(optionSort[0])
    const [taskEdited, setTaskEdited] = useState<null | Task>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    useEffect(() => {
        fetchUserList()
        fetchTasks()
    }, [])

    const SelectShowOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShow(event.target.value)
        setTasksShowed(tasks.filter(getShowFunction(event.target.value)).sort(getSortFunction(sort)))
    }
    const SelectSortOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value)
        setTasksShowed(tasks.sort(getSortFunction(event.target.value)).filter(getShowFunction(show)))
    }
    const OpenTaskEdit = (data: Task | null) => {
        setTaskEdited(data)
        console.log(data)
        setIsCreating(true)
    }
    const CloseTaskEdit = () => {
        setIsCreating(false)
        setTaskEdited(null)
    }
    return (
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center
                px-md-4 mb-3 bg-white border-bottom mb-3">
                <label>Отображать на:</label>
                <select className='mb-2' value={show} onChange={SelectShowOnChange}>
                    {optionShow.map(item => <option value={item}>{item}</option>)}
                </select>
                <label className='ml-2'>Сортировать по:</label>
                <select className='mb-2' value={sort} onChange={SelectSortOnChange}>
                    {optionSort.map(item => <option value={item}>{item}</option>)}
                </select>
                {//user.id === user.leaderid.toString() &&
                    <button className='btn btn-info ml-3 mb-2'
                            onClick={() => OpenTaskEdit(null)}>Создать новую задачу</button>}
            </div>
            {isCreating && <TaskEdit isOpen={isCreating} addNew={addTask} editTask={editTask} task={taskEdited}
                      onClose={CloseTaskEdit} users={users}/>}
            <div className="mb-3 text-center">
                {tasksShowed.map(i => <TaskComponent key={i.id} item={i} users={users} openTaskEdit={OpenTaskEdit}
                                                     upStatus={upTaskStatus}/>)}
            </div>
        </div>
    );

}
