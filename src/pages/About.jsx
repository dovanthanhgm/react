import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodos, todoSelector } from "../features/todo/todoSlice"

function About() {
    const dispatch = useDispatch()

    const data = useSelector(todoSelector)

    useEffect(() => {
        console.log('effect');
        dispatch(getTodos())
    }, [dispatch])

    return (<>
        <h1 className="text-3xl">About - {data.total}</h1>
        {
            data.todos ? data.todos.map( (element, index) => {
                return <div key={index}>
                    {element.id}-{element.todo}
                </div>
            } ) : null
        }
    </>)
}

export default About