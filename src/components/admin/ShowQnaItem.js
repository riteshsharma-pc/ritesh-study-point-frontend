import React from 'react'
import parser from 'html-react-parser';

const ShowQnaItem = (props) => {
    const { qna, passCurrentQnAToModal } = props
    return (
        <>
            <tr>
                <td style={{ border: "1px solid black" }}>{qna._id}</td>
                <td style={{ border: "1px solid black" }}>{qna.course}</td>
                <td style={{ border: "1px solid black" }}>{qna.sem}</td>
                <td style={{ border: "1px solid black" }}>{qna.subjectCode}</td>
                <td style={{ border: "1px solid black" }}>{qna.unit}</td>
                <td style={{ border: "1px solid black" }}>{qna.question}</td>
                <td style={{ border: "1px solid black" }}>{qna.imp}</td>
                <td style={{ border: "1px solid black" }}>{qna.ytLink}</td>
                <td style={{ border: "1px solid black" }}>{parser(qna.answer)}</td>
                <td style={{ border: "1px solid black" }}>{qna.date}</td>
                <td style={{ border: "1px solid black" }}><button onClick={() => passCurrentQnAToModal(qna)}><i class="bi bi-pencil-square" /></button></td>
                <td style={{ border: "1px solid black" }}><button><i class="bi bi-trash3-fill"></i></button></td>
            </tr>
        </>
    )
}

export default ShowQnaItem