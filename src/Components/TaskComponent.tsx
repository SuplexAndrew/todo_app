import {Task} from "../Models/Task";
import React, {useState} from "react";
import "./Task.css"
import moment from "moment";
import {User} from "../Models/User";
import {upTaskStatus} from "../Redux/actions/task-actions";

interface ITaskProps {
    item: Task,
    users: User[],
    openTaskEdit: (data:Task) => void,
    upStatus: typeof upTaskStatus
}

enum Priority {
    'Низкий' = 1,
    'Средний',
    'Высокий',
}

enum Status {
    'Готово к выполнению' = 1,
    'Выполняется',
    'Выполнено',
    'Отменено'
}

export const TaskComponent: React.FC<ITaskProps> = ({item, users, openTaskEdit, upStatus}) => {
    const [info, setInfo] = useState(false)
    let color = moment(item.dateend) < moment(new Date()) ?
        (item.status === 3 ? "text-green" :
            "text-danger") : "text-dark"
    const handleUpStatus = () => {
        upStatus(item.id)
    }
    return (
        <div className="main">
            <div className="task">
                <div className="i1">
                    <div className="p0">
                        <h4 className={color}>{item.title}</h4>
                    </div>
                    <h5 className="p1">Ответственный: {users[item.employeeid - 1]?.lastname ?? '123'}</h5>
                    <p className="p2">Дата Окончания: {item.dateend}</p>
                    <p className="p3">Приоритет: {Priority[item.priority]}</p>
                    <p className="p4">Статус: {Status[item.status]}</p>
                </div>
                <div className="i2">.
                    {item.status < 3 &&
                    <button type="submit" className="btn btn-info"
                            onClick={handleUpStatus}>{Status[item.status]}</button>}
                    {<button type="submit" className="btn btn-info"
                             onClick={() => openTaskEdit(item)} >Изменить</button>}
                </div>
            </div>
            <div>
                <button type="submit" className="btn binfo"
                        onClick={() => setInfo(!info)}>
                </button>
            </div>
            {info &&
            <div className="task">
                <h5>Описание:</h5>
                <p>{item.desc}</p>
                <p>Дата создания: {item.datestart}</p>
                <p>Дата обновления: {item.dateupdate}</p>
                <p>Создатель: {item.creatorid}</p>
            </div>}
        </div>
    )
}
