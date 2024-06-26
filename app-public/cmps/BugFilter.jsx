const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy,pageCount }) {

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
                value = target.checked
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
function onGetPage(diff){
   if( filterBy.pageIdx===0 && diff===-1) return
   if(filterBy.pageIdx===pageCount - 1 && diff===1) return
    setFilterByToEdit(prev => ({ ...prev, pageIdx: prev.pageIdx+diff } ))
    // let pageIdx = filterByToEdit.pageIdx + diff
    // if (pageIdx < 0) pageIdx = pageCount - 1
    // if (pageIdx > pageCount - 1) pageIdx = 0
    // setFilterByToEdit(prev => ({ ...prev, pageIdx }))
}

    const { title, severity } = filterByToEdit
    return (
        <section className="bug-filter">
            <h2>Filter Our Bugs</h2>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={handleChange} type="text" placeholder="By Title" id="title" name="title" />

                <label htmlFor="severity">Severity: </label>
                <input value={severity} onChange={handleChange} type="number" placeholder="By Severity" id="severity" name="severity" />

                <button onClick={() => onGetPage(-1)}>-</button>
                <span>{filterByToEdit.pageIdx + 1}</span>
                <button onClick={() => onGetPage(1)}>+</button>
        </section>
    )
}