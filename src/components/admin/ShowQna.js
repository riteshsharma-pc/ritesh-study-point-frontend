import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import qnaContext from '../../context/general/qnaContext'
import ShowQnaItem from './ShowQnaItem'
import JoditEditor from 'jodit-react';

const ShowQna = () => {
    const [data, setData] = useState({ _id: "", course: "", sem: "", unit: "", subjectcode: "", question: "", imp: false, ytLink: "" })
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)
    const editor = useRef(null)
    const editQnA = useRef()
    const closeEditQna = useRef()
    const { allqna, getQnA, updateQnA } = useContext(qnaContext)
    useEffect(() => {
        getQnA();
        // eslint-disable-next-line
    }, [])

    const passCurrentQnAToModal = (currentQnA) => {
        editQnA.current.click()
        setData({
            _id: currentQnA._id,
            course: currentQnA.course,
            sem: currentQnA.sem,
            subjectcode: currentQnA.subjectCode,
            unit: currentQnA.unit,
            question: currentQnA.question,
            imp: currentQnA.imp,
            ytLink: currentQnA.ytLink,
        })
        setAnswer(currentQnA.answer)
    }

    const sendUpdateQnAReq = async () => {
        setLoading(true)
        const response = await updateQnA(data, answer)
        console.log(response);
        if (response.success === true) {
            closeEditQna.current.click()
            alert("Q&A updated successfully")
        }
        else{
            alert(response.response)
        }
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
            <button type="button" ref={editQnA} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                            <label className='form-label' htmlFor="question">Question:</label>
                            <span className='text-danger'>{data.question.length === 0 ? " *please enter question" : ""}</span>
                            <input type="text" className="form-control" name="question" id="question-input" onChange={handleChange} value={data.question} required />

                            <label className='form-label' htmlFor="imp">is IMP?</label>
                            <input type="checkbox" name="imp" id="imp" onChange={handleCheckboxChange} style={{ height: "30px", width: "30px" }} />
                            <br />
                            <label className='form-label' htmlFor="ytLink">Youtube Tutorial Video Link</label>
                            <input type="text" className='form-control' name="ytLink" id="ytLink" onChange={handleChange} value={data.ytLink} />
                            <label className='form-label' htmlFor="answer">Enter Answer:</label>
                            <span className='text-danger'>{answer.length === 0 ? "please enter answer" : ""}</span>
                            <JoditEditor
                                ref={editor}
                                value={answer}
                                config={config}
                                onChange={(newContent) => setAnswer(newContent)}
                                onBlur={(newContent) => setAnswer(newContent)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button ref={closeEditQna} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={data.course.length === 0 || data.sem.length === 0 || data.subjectcode.length === 0 || data.unit.length === 0 || data.question.length === 0 || answer.length === 0 || loading === true} type="button" className="btn btn-primary" onClick={sendUpdateQnAReq}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <td style={{ border: "1px solid black" }}>id</td>
                    <td style={{ border: "1px solid black" }}>course</td>
                    <td style={{ border: "1px solid black" }}>sem</td>
                    <td style={{ border: "1px solid black" }}>subjectCode</td>
                    <td style={{ border: "1px solid black" }}>unit</td>
                    <td style={{ border: "1px solid black" }}>question</td>
                    <td style={{ border: "1px solid black" }}>imp</td>
                    <td style={{ border: "1px solid black" }}>YT</td>
                    <td style={{ border: "1px solid black" }}>answer</td>
                    <td style={{ border: "1px solid black" }}>date</td>
                    <td style={{ border: "1px solid black" }}>edit</td>
                    <td style={{ border: "1px solid black" }}>delete</td>
                </thead>
                <tbody style={{ border: "1px solid black" }}>
                    {allqna.map((qna) => {
                        return <ShowQnaItem key={qna._id} passCurrentQnAToModal={passCurrentQnAToModal} qna={qna} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShowQna