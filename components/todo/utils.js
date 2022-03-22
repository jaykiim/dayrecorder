export const getTodosByCat = (todos) => {
  return todos.reduce((acc, todo) => {
    // 현재 todo의 카테고리명
    const categoryName = todo.userColor?.userCategory?.categoryName || '미분류'

    // 현재 todo와 동일한 카테고리에 속한 todo들
    const categoryItems = acc[categoryName] || []

    return {
      ...acc,
      [todo.userColor.userCategory.categoryName]: [...categoryItems, todo],
    }
  }, {})
}
