export const getShowFunction = (value) => {
    switch (value) {
        case "Все":
            return a => true;
        case "Сегодня":
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) <= 24;
        case "Завтра":
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) < 24 * 2;
        case "Неделя":
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) < 24 * 7;
        case "Месяц":
            return a => Math.abs((Date.now() - Date.parse(a.dateend)) / (3600 * 1000)) < 24 * 30;
        default:
            return a => true;
    }
}

export const getSortFunction = (value) => {
    switch (value) {
        case "Дате начала":
            return (a, b) => (a.datestart > b.dateStart) ? 1 :
                (a.dateStart < b.dateStart) ? -1 : 0;
        case "Дате окончания":
            return (a, b) => (Date.parse(a.dateend) > Date.parse(b.dateend)) ? 1 :
                (Date.parse(a.dateend) < Date.parse(b.dateend)) ? -1 : 0;
        case "Последнему обновлению":
            return (a, b) => (Date.parse(a.dateupdate) > Date.parse(b.dateupdate)) ? 1 :
                (Date.parse(a.dateupdate) < Date.parse(b.dateupdate)) ? -1 : 0;
        case "Алфавиту":
            return (a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 :
                (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 0;
        case "Приоритету":
            return (a, b) => (a.priority < b.priority) ? 1 : (a.priority > b.priority) ? -1 : 0;
        default:
            return (a, b) => (a > b) ? 1 : (a < b) ? -1 : 0;
    }
}
