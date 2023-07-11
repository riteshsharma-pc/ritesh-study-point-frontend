import React, { useState } from "react";
import TheoryContext from "./theoryContext";

const TheoryState = (props) => {
    const [allTheory, setallTheory] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const addTheory = async (course, sem, subjectCode, unit, topic, imp, ytLink, description) => {
        let headersList = { "Content-Type": "application/json" }
        let bodyContent = JSON.stringify({
            "course": course,
            "sem": parseInt(sem),
            "subjectCode": parseInt(subjectCode),
            "unit": parseInt(unit),
            "topic": topic,
            "imp": imp,
            "ytLink": ytLink,
            "description": description,
        });
        let response = await fetch(`${BASE_URL}api/theory/addtheory`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        console.log(data);
        alert(data.response)
    }

    const getTheory = async () => {
        let response = await fetch(`${BASE_URL}api/theory/gettheory`, {
            method: "GET",
        });
        let data = await response.json();
        await setallTheory(data.response)
        console.log(allTheory);
    }

    const updateTheory = async (newTheoryData, description) => {
        const { _id, course, sem, subjectcode, unit, topic, imp, ytLink } = newTheoryData
        let headersList = {
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "_id": _id,
            "course": course,
            "sem": parseInt(sem),
            "subjectCode": parseInt(subjectcode),
            "unit": parseInt(unit),
            "topic": topic,
            "imp": imp,
            "ytLink": ytLink,
            "description": description
        });

        let response = await fetch(`${BASE_URL}api/theory/updatetheory`, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        if (data.success === true) {
            let newTheory = JSON.parse(JSON.stringify(allTheory))
            for (let index = 0; index < newTheory.length; index++) {
                const element = newTheory[index];
                if (element._id === _id) {
                    newTheory[index].course = course;
                    newTheory[index].sem = parseInt(sem);
                    newTheory[index].subjectCode = parseInt(subjectcode);
                    newTheory[index].unit = parseInt(unit);
                    newTheory[index].topic = topic;
                    newTheory[index].imp = imp;
                    newTheory[index].ytLink = ytLink;
                    newTheory[index].description = description;
                    break;
                }
            }
            setallTheory(newTheory);
        }
        return data
    }
    const deleteTheory = async (id) => {
        if (window.confirm("Are you sure to delete this Q&A??")) {
            let response = await fetch(`${BASE_URL}api/theory/deletetheory/${id}`, {
                method: "DELETE",
            });

            let data = await response.json();
            console.log(data);
            if (data.success === true) {
                const newTheoryData = allTheory.filter((allTheory) => { return allTheory._id !== id })
                setallTheory(newTheoryData)
                alert("Theory is deleted")
            }
            else alert(data.response)
        }
    }

    return (
        <TheoryContext.Provider value={{ addTheory, getTheory, allTheory, updateTheory, deleteTheory }}>
            {props.children}
        </TheoryContext.Provider>
    )
}

export default TheoryState;