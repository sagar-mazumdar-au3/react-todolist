export const isCompletedExist = (todoList) => {
    let isExist = false;
    todoList?.forEach((todo) => {
        if (todo?.isCompleated)
            isExist = true
    })
    return isExist;
}