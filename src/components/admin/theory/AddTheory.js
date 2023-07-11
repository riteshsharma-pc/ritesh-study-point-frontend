import React, { useContext, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import theoryContext from '../../../context/theory/theoryContext';

const AddTheory = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ course: "bca", sem: "", unit: "", subjectcode: "", topic: "", imp: false, ytLink: ""})
    const editor = useRef(null)
    const [description, setdescription] = useState("")
    const { addTheory } = useContext(theoryContext)

    const submitTheory = async (event) => {
        setLoading(true)
        event.preventDefault();
        await addTheory(data.course, data.sem, data.subjectcode, data.unit, data.topic, data.imp, data.ytLink, description)
        setLoading(false)
    }
    const handleChange = (event) => setData({ ...data, [event.target.name]: event.target.value })
    const handleCheckboxChange = (event) => setData({ ...data, [event.target.name]: event.target.checked })
    return (
        <div className='container'>
            <form className=''>
                <label className='form-label' htmlFor="course">Course: </label>
                <select name="course" id="course" className="form-select" onChange={handleChange} required>
                    <option value="bca">BCA</option>
                    <option value="mscit">MSc CA & IT</option>
                    <option value="pgdca">PGDCA</option>
                </select>
                <label className='form-label' htmlFor="sem">Sem:</label>
                <span className='text-danger'>{data.sem.length === 0 ? " *please enter sem" : ""}</span>
                <input type="number" className="form-control" name="sem" id="sem" onChange={handleChange} required />
                <label className='form-label' htmlFor="subjectcode">Subject Code</label>
                <span className='text-danger'>{data.subjectcode.length === 0 ? " *please enter Subject Code" : ""}</span>
                <input type="number" className="form-control" name="subjectcode" id="subcode" onChange={handleChange} />
                <label className='form-label' htmlFor="unit">Unit</label>
                <span className='text-danger'>{data.unit.length === 0 ? " *please enter unit" : ""}</span>
                <input type="number" className="form-control" name="unit" id="unit" onChange={handleChange} required />

                <label className='form-label' htmlFor="topic">topic:</label>
                <span className='text-danger'>{data.topic.length === 0 ? " *please enter topic" : ""}</span>
                <input type="text" className="form-control" name="topic" id="topic-input" style={{ width: "100vh" }} onChange={handleChange} required />

                <label className='form-label' htmlFor="imp">is IMP?</label>
                <input type="checkbox" name="imp" id="imp" onChange={handleCheckboxChange} style={{ height: "30px", width: "30px" }} />
                <br />
                <label className='form-label' htmlFor="ytLink">Youtube Tutorial Video Link</label>
                <input type="text" className='form-control' name="ytLink" id="ytLink" onChange={handleChange} />
                <label className='form-label' htmlFor="description">Enter description:</label>
                <span className='text-danger'>{description.length === 0 ? "please enter description" : ""}</span>
                <JoditEditor
                    ref={editor}
                    // value={content}
                    onChange={newContent => setdescription(newContent)}
                />
                <button disabled={data.course.length === 0 || data.sem.length === 0 || data.subjectcode.length === 0 || data.unit.length === 0 || data.topic.length === 0 || description.length === 0 || loading === true} type="submit" className='btn btn-primary' onClick={submitTheory}>Submit Topic</button>
            </form>
        </div>
    )
}

export default AddTheory