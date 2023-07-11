import React, { useState } from "react";
import QnaContext from "./qnaContext";

const QnaState = (props) => {
    const [allqna, setAllqna] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const addQnA = async (course, sem, subjectCode, unit, question, imp, ytLink, answer) => {
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "course": course,
            "sem": parseInt(sem),
            "subjectCode": parseInt(subjectCode),
            "unit": parseInt(unit),
            "question": question,
            "imp": imp,
            "ytLink": ytLink,
            "answer": answer,
        });
        let response = await fetch(`${BASE_URL}api/qna/addqnA`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        console.log(data);
        alert(data.response)
    }

    const getQnA = async () => {
        let response = await fetch(`${BASE_URL}api/qna/getqna`, {
            method: "GET",
        });
        let data = await response.json();
        await setAllqna(data.response)
        console.log(allqna);
    }

    const updateQnA = async (newQnaData, answer) => {
        const { _id, course, sem, subjectcode, unit, question, imp, ytLink } = newQnaData
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "_id": _id,
            "course": course,
            "sem": parseInt(sem),
            "subjectCode": parseInt(subjectcode),
            "unit": parseInt(unit),
            "question": question,
            "imp": imp,
            "ytLink": ytLink,
            "answer": answer
        });

        let response = await fetch(`${BASE_URL}api/qna/updateqna`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        if (data.success === true) {
            let newQna = JSON.parse(JSON.stringify(allqna))
            for (let index = 0; index < newQna.length; index++) {
                const element = newQna[index];
                if (element._id === _id) {
                    newQna[index].course = course;
                    newQna[index].sem = parseInt(sem);
                    newQna[index].subjectCode = parseInt(subjectcode);
                    newQna[index].unit = parseInt(unit);
                    newQna[index].question = question;
                    newQna[index].imp = imp;
                    newQna[index].ytLink = ytLink;
                    newQna[index].answer = answer;
                    break;
                }
            }
            setAllqna(newQna);
        }
        return data
    }
    const deleteQnA = async (id) => {
        if (window.confirm("Are you sure to delete this Q&A??")) {
            let response = await fetch(`${BASE_URL}api/qna/deleteqna/${id}`, {
                method: "DELETE",
            });

            let data = await response.json();
            console.log(data);
            if (data.success === true) {
                const newQnaData = allqna.filter((allqna) => { return allqna._id !== id })
                setAllqna(newQnaData)
                alert("Q&A is deleted")
            }
            else alert(data.response)
        }
    }

    return (
        <QnaContext.Provider value={{ addQnA, getQnA, allqna, updateQnA, deleteQnA }}>
            {props.children}
        </QnaContext.Provider>
    )
}

export default QnaState;