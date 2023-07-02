import React, { useContext, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import qnaContext from '../../context/general/qnaContext';

const AddQnA = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ course: "bca", sem: "", unit: "", subjectcode: "", question: "", imp: false, ytLink: ""})
    const editor = useRef(null)
    const [answer, setAnswer] = useState("")
    const { addQnA } = useContext(qnaContext)

    const submitQueAndAns = async (event) => {
        setLoading(true)
        event.preventDefault();
        await addQnA(data.course, data.sem, data.subjectcode, data.unit, data.question, data.imp, data.ytLink, answer)
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

                <label className='form-label' htmlFor="question">Question:</label>
                <span className='text-danger'>{data.question.length === 0 ? " *please enter question" : ""}</span>
                <input type="text" className="form-control" name="question" id="question-input" style={{ width: "100vh" }} onChange={handleChange} required />

                <label className='form-label' htmlFor="imp">is IMP?</label>
                <input type="checkbox" name="imp" id="imp" onChange={handleCheckboxChange} style={{ height: "30px", width: "30px" }} />
                <br />
                <label className='form-label' htmlFor="ytLink">Youtube Tutorial Video Link</label>
                <input type="text" className='form-control' name="ytLink" id="ytLink" onChange={handleChange} />
                <label className='form-label' htmlFor="answer">Enter Answer:</label>
                <span className='text-danger'>{answer.length === 0 ? "please enter answer" : ""}</span>
                <JoditEditor
                    ref={editor}
                    // value={content}
                    onChange={newContent => setAnswer(newContent)}
                />
                <button disabled={data.course.length === 0 || data.sem.length === 0 || data.subjectcode.length === 0 || data.unit.length === 0 || data.question.length === 0 || answer.length === 0 || loading === true} type="submit" className='btn btn-primary' onClick={submitQueAndAns}>Submit Question and answer</button>
            </form>
        </div>
    )
}

export default AddQnA