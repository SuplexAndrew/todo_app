import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {getSortFunction} from "./CompareFunction";
import {getShowFunction} from "./CompareFunction";
import {Task} from '../Models/Task'
import {TaskComponent} from './TaskComponent';
import {useActions} from "../Hooks/useActions";
import {TaskEdit} from "./TaskEdit";
import {useStore} from "react-redux";
import {User} from "../Models/User";


const optionShow = ["Все", "Сегодня", "Завтра", "Неделя", "Месяц"]
const optionSort = ["Дате начала", "Дате окончания", "Последнему обновлению", "Алфавиту", "Приоритету",]

interface IProps {
    user: User,
}

export const Main: React.FC<IProps> = ({user}) => {
    const {addTask, editTask, upTaskStatus, fetchTasks, fetchUserList} = useActions()
    const store = useStore()
    const [show, setShow] = useState<string>(optionShow[0])
    const [sort, setSort] = useState<string>(optionSort[0])
    const [group, setGroup] = useState<number>(0)
    const [taskEdited, setTaskEdited] = useState<null | Task>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Task[]>([])
    const [users, setUsers] = useState<User[]>([])

    store.subscribe(() => {
        //После создания или редактирования задачи, задаем needed = true,
        // что служит сигналом, что нужно сделать фетч и обновить данные
        if (store.getState().tasks.needed)
            fetchTasks(user.id)
    })
    store.subscribe(() => setUsers(store.getState().users.users))
    store.subscribe(() => setTasks(store.getState().tasks.items))

    useEffect(() => {
        fetchUserList(user?.id)
        //fetchTasks(user.id)
    }, [])

    const SelectShowOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setShow(event.target.value)
    }
    const SelectSortOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value)
    }
    const SelectGroupOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const t = users.find(x => x.id.toString() === event.target.value)?.id
        setGroup(t ?? 0)
    }
    const OpenTaskEdit = (data: Task | null) => {
        setTaskEdited(data)
        setIsCreating(true)
    }
    const CloseTaskEdit = () => {
        setIsCreating(false)
        setTaskEdited(null)
    }
    return (
        <>
            <div className="d-flex flex-column flex-md-row align-items-center
                px-md-4 mb-3 bg-white border-bottom mb-3">
                <label>Отображать на:</label>
                <select className='mb-2' value={show} onChange={SelectShowOnChange}>
                    {optionShow.map(item => <option value={item}>{item}</option>)}
                </select>
                <label className='ml-2'>Сортировать по:</label>
                <select className='mb-2 mr-2' value={sort} onChange={SelectSortOnChange}>
                    {optionSort.map(item => <option value={item}>{item}</option>)}
                </select>
                <label>Группировать по:</label>
                <select className='mb-2' value={group} onChange={SelectGroupOnChange}>
                    <option value={0}>Все</option>
                    {users.map(item => <option value={item.id}>{item.lastname}</option>)}
                </select>
                {user?.id === user?.leaderid &&
                <button className='btn btn-info ml-3 mb-2'
                        onClick={() => OpenTaskEdit(null)}>Создать новую задачу</button>}
            </div>
            {isCreating && <TaskEdit isOpen={isCreating} addNew={addTask} editTask={editTask} task={taskEdited}
                                     onClose={CloseTaskEdit} users={users}/>}
            <div className="mb-3 text-center">
                {tasks
                    .filter( group !== 0 ? x => x.employeeid === group : x => true)
                    .filter(getShowFunction(show))
                    .sort(getSortFunction(sort))
                    .map(i => <TaskComponent key={i.id} item={i}
                                             users={users} openTaskEdit={OpenTaskEdit}
                                             upStatus={upTaskStatus}
                                             isLead={user?.id === user?.leaderid}/>)}
            </div>
        </>
    );
}
