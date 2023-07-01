import React from "react";
import QnaContext from "./qnaContext";

const QnaState = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const addQnA = async (course, sem, subjectCode, unit, question, imp, ytLink, answer, code, codeOutput) => {
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
            "code": code,
            "codeOutput": codeOutput
        });
        let response = await fetch(`${BASE_URL}api/data/addqnA`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        console.log(data);
        alert(data.response)
    }
    return (
        <QnaContext.Provider value={{ addQnA }}>
            {props.children}
        </QnaContext.Provider>
    )
}

export default QnaState;