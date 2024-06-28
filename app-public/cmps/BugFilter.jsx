const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy, pageCount }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
            value= target.checked ?-1:1
                break

            default:
                break;
        }
        

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }



    // function handleTitleChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, title: value }))
    // }

    // function handleSeverityChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, severity: value }))
    // }
    function onGetPage(diff) {
        if (filterBy.pageIdx === 0 && diff === -1) return
        if (filterBy.pageIdx === pageCount - 1 && diff === 1) return
        setFilterByToEdit(prev => ({ ...prev, pageIdx: prev.pageIdx + diff }))

    }
function setDirValueToNumber(){
    
}
    const { title, severity, sortBy, sortDir } = filterByToEdit
    return (
        <section className="bug-filter">
            <h2>Filter Our Bugs</h2>
            <label htmlFor="title">Title: </label>
            <input value={title} onChange={handleChange} type="text" placeholder="By Title" id="title" name="title" />

            <label htmlFor="severity">Severity: </label>
            <input value={severity} onChange={handleChange} type="number" placeholder="By Severity" id="severity" name="severity" />

            <section className="sort-bugs">
            <label htmlFor="sortBy">Sort by:</label>
                <select name="sortBy" value={sortBy} onChange={handleChange}>
                    <option value="">Select Sorting</option>
                    <option value="title">Title</option>
                    <option value="severity">Severity</option>
                    <option value="createdAt">Created At</option>
                </select>

                <label htmlFor="sortDir">Sort descending:</label>
                <input
                    type="checkbox"
                    name="sortDir"
                    id="sortDir"
                    onChange={handleChange}
                />
            </section>
            <button onClick={() => onGetPage(-1)}>-</button>
            <span>{filterByToEdit.pageIdx + 1}</span>
            <button onClick={() => onGetPage(1)}>+</button>
        </section>
    )
}