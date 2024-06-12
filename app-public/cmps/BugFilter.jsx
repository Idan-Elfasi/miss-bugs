const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {

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

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    // function handleTitleChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, title: value }))
    // }

    // function handleSeverityChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, severity: value }))
    // }


    const { title, severity } = filterByToEdit
    return (
        <section className="bug-filter">
            <h2>Filter Our Bugs</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={handleChange} type="text" placeholder="By Title" id="title" name="title" />

                <label htmlFor="severity">Severity: </label>
                <input value={severity} onChange={handleChange} type="number" placeholder="By Severity" id="severity" name="severity" />

                <button>Set Filter</button>
            </form>
        </section>
    )
}