import React, { useContext } from 'react'
import parser from 'html-react-parser';
import theoryContext from '../../../context/theory/theoryContext';

const ShowTheoryItem = (props) => {
    const {deleteTheory} = useContext(theoryContext)
    const { theory, passCurrenttheoryToModal } = props
    return (
        <>
            <tr>
                <td style={{ border: "1px solid black" }}>{theory._id}</td>
                <td style={{ border: "1px solid black" }}>{theory.course}</td>
                <td style={{ border: "1px solid black" }}>{theory.sem}</td>
                <td style={{ border: "1px solid black" }}>{theory.subjectCode}</td>
                <td style={{ border: "1px solid black" }}>{theory.unit}</td>
                <td style={{ border: "1px solid black" }}>{theory.topic}</td>
                <td style={{ border: "1px solid black" }}> <input type="checkbox" checked={theory.imp} /> </td>
                <td style={{ border: "1px solid black" }}>{theory.ytLink}</td>
                <td style={{ border: "1px solid black" }}>{parser(theory.description)}</td>
                <td style={{ border: "1px solid black" }}>{theory.date}</td>
                <td style={{ border: "1px solid black" }}><button onClick={() => passCurrenttheoryToModal(theory)}><i className="bi bi-pencil-square" /></button></td>
                <td style={{ border: "1px solid black" }}><button onClick={()=> deleteTheory(theory._id) }><i className="bi bi-trash3-fill"></i></button></td>
            </tr>
        </>
    )
}

export default ShowTheoryItem