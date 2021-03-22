import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle, MenuItem, Select,
    TextField
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import React, {useState} from "react";
import {addTask, editTask} from '../Redux/actions/task-actions'
import {User} from "../Models/User";
import {Task} from "../Models/Task";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles({
    root: {
        margin: '10px'
    },
    textInput: {
        padding: '2px 20px',
        margin: '0 10px'
    },
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '10px 30px',
    },
})

interface ITEProps {
    isOpen: boolean,
    onClose: () => void,
    addNew: typeof addTask,
    editTask: typeof editTask,
    users: User[],
    task: null | Task,
}

export const TaskEdit: React.FC<ITEProps> = ({isOpen, onClose, addNew, editTask, users = [], task}) => {
    const [title, setTitle] = useState(task?.title ?? '')
    const [desc, setDesc] = useState(task?.desc ?? '')
    const [datestart, setDateStart] = useState<Date | null>(task?.datestart ?? new Date())
    const [dateend, setDateEnd] = useState<Date | null>(task?.dateend ?? new Date())
    const [priority, setPriority] = useState(task?.priority ?? 1)
    const [employeeid, setEmployeeid] = useState(task?.employeeid ?? 1)
    const styles = useStyles()

    const handleChangeTitle = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTitle(event.target.value as string);
    };
    const handleChangeDesc = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDesc(event.target.value as string);
    };
    const handleChangeDateStart = (date: Date | null) => {
        setDateStart(date);
    };
    const handleChangeDateEnd = (date: Date | null) => {
        setDateEnd(date);
    };
    const handleChangePriority = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPriority(event.target.value as number);
    };
    const handleChangeEmployee = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEmployeeid(event.target.value as number);
    };
    const handleSubmit = () => {
        if (task === null)
            addNew({title, desc, datestart, dateend, priority, employeeid: employeeid})
        else
            editTask({
                id: task?.id,
                title,
                desc,
                datestart,
                dateupdate: new Date(),
                dateend,
                priority,
                status: task?.status,
                employeeid: employeeid,
                creatorid: 1
            })
        onClose()
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog open={isOpen} onClose={onClose} className={styles.root} aria-labelledby="form-dialog-title">
                <DialogTitle
                    id="form-dialog-title">{task === null ? 'Создание задачи' : 'Редактирование задачи'}</DialogTitle>
                <TextField className={styles.textInput} id="title" margin="normal" label="Заголовок" value={title} onChange={handleChangeTitle}/>
                <TextField className={styles.textInput} id="desc" margin="normal" label="Описание" value={desc} onChange={handleChangeDesc}/>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="datestart"
                    label="Date Start"
                    value={datestart}
                    className={styles.textInput}
                    onChange={handleChangeDateStart}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="dateend"
                    label="Date End"
                    value={dateend}
                    className={styles.textInput}
                    onChange={handleChangeDateEnd}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <Select id="priority" label="Приоритет" className={styles.textInput} value={priority} onChange={handleChangePriority}>
                    <MenuItem key={1} value={1}>Низкий</MenuItem>
                    <MenuItem key={2} value={2}>Средний</MenuItem>
                    <MenuItem key={3} value={3}>Высокий</MenuItem>
                </Select>
                <Select id="employee" label="Сотрудник" className={styles.textInput} value={employeeid} onChange={handleChangeEmployee}>
                    {users.map(item => <MenuItem key={item.id} value={item.id}>{item.login}</MenuItem>)}
                </Select>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={handleSubmit}
                            color="primary">
                        {task === null ? 'Создать' : 'Изменить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiPickersUtilsProvider>
    )
}
