import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import theoryContext from '../../../context/theory/theoryContext';
import ShowTheoryItem from './ShowTheoryItem';

const ShowTheory = () => {
    const [data, setData] = useState({ _id: "", course: "", sem: "", unit: "", subjectcode: "", topic: "", imp: false, ytLink: "" })
    const [description, setdescription] = useState("")
    const [loading, setLoading] = useState(false)
    const editor = useRef(null)
    const edittheory = useRef();
    const closeEdittheory = useRef()
    const { allTheory, getTheory, updateTheory } = useContext(theoryContext)
    useEffect(() => {
        getTheory();
        // eslint-disable-next-line
    }, [])

    const passCurrenttheoryToModal = (currenttheory) => {
        edittheory.current.click()
        setData({
            _id: currenttheory._id,
            course: currenttheory.course,
            sem: currenttheory.sem,
            subjectcode: currenttheory.subjectCode,
            unit: currenttheory.unit,
            topic: currenttheory.topic,
            imp: currenttheory.imp,
            ytLink: currenttheory.ytLink,
        })
        setdescription(currenttheory.description)
    }

    const sendupdateTheoryReq = async () => {
        setLoading(true)
        const response = await updateTheory(data, description)
        console.log(response);
        if (response.success === true) {
            closeEdittheory.current.click()
            alert("Theory updated successfully")
        }
        else alert(response.response)
        setLoading(false)
    }
    const config = useMemo(
        () => ({
            readonly: false,
        }),
        []
    );
    const handleChange = (event) => setData({ ...data, [event.target.name]: event.target.value })
    const handleCheckboxChange = (event) => setData({ ...data, [event.target.name]: event.target.checked })

    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={edittheory} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label className='form-label' htmlFor="course">Course: </label>
                            <select name="course" id="course" className="form-select" value={data.course} onChange={handleChange} required>
                                <option value="bca">BCA</option>
                                <option value="mscit">MSc CA & IT</option>
                                <option value="pgdca">PGDCA</option>
                            </select>
                            <label className='form-label' htmlFor="sem">Sem:</label>
                            <span className='text-danger'>{data.sem.length === 0 ? " *please enter sem" : ""}</span>
                            <input type="number" className="form-control" name="sem" id="sem" onChange={handleChange} value={data.sem} required />
                            <label className='form-label' htmlFor="subjectcode">Subject Code</label>
                            <span className='text-danger'>{data.subjectcode.length === 0 ? " *please enter Subject Code" : ""}</span>
                            <input type="number" className="form-control" name="subjectcode" id="subcode" onChange={handleChange} value={data.subjectcode} />
                            <label className='form-label' htmlFor="unit">Unit</label>
                            <span className='text-danger'>{data.unit.length === 0 ? " *please enter unit" : ""}</span>
                            <input type="number" className="form-control" name="unit" id="unit" onChange={handleChange} value={data.unit} required />

                            <label className='form-label' htmlFor="topic">topic:</label>
                            <span className='text-danger'>{data.topic.length === 0 ? " *please enter topic" : ""}</span>
                            <input type="text" className="form-control" name="topic" id="topic-input" onChange={handleChange} value={data.topic} required />

                            <label className='form-label' htmlFor="imp">is IMP?</label>
                            <input type="checkbox" name="imp" id="imp" value={data.imp} checked={data.imp} onChange={handleCheckboxChange} style={{ height: "30px", width: "30px" }} />
                            <br />
                            <label className='form-label' htmlFor="ytLink">Youtube Tutorial Video Link</label>
                            <input type="text" className='form-control' name="ytLink" id="ytLink" onChange={handleChange} value={data.ytLink} />
                            <label className='form-label' htmlFor="description">Enter description:</label>
                            <span className='text-danger'>{description.length === 0 ? "please enter description" : ""}</span>
                            <JoditEditor
                                ref={editor}
                                value={description}
                                config={config}
                                onChange={(newContent) => setdescription(newContent)}
                                onBlur={(newContent) => setdescription(newContent)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button ref={closeEdittheory} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={data.course.length === 0 || data.sem.length === 0 || data.subjectcode.length === 0 || data.unit.length === 0 || data.topic.length === 0 || description.length === 0 || loading === true} type="button" className="btn btn-primary" onClick={sendupdateTheoryReq}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td style={{ border: "1px solid black" }}>id</td>
                        <td style={{ border: "1px solid black" }}>course</td>
                        <td style={{ border: "1px solid black" }}>sem</td>
                        <td style={{ border: "1px solid black" }}>subjectCode</td>
                        <td style={{ border: "1px solid black" }}>unit</td>
                        <td style={{ border: "1px solid black" }}>topic</td>
                        <td style={{ border: "1px solid black" }}>imp</td>
                        <td style={{ border: "1px solid black" }}>YT</td>
                        <td style={{ border: "1px solid black" }}>description</td>
                        <td style={{ border: "1px solid black" }}>date</td>
                        <td style={{ border: "1px solid black" }}>edit</td>
                        <td style={{ border: "1px solid black" }}>delete</td>
                    </tr>
                </thead>
                <tbody style={{ border: "1px solid black" }}>
                    {allTheory.map((theory) => {
                        return <ShowTheoryItem key={theory._id} passCurrenttheoryToModal={passCurrenttheoryToModal} theory={theory} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShowTheory