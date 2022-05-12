import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StudentList = () => {
    const [students, setStudents] = useState([])
    const fetchData = async () => {
        try {
            let res = await axios.get("http://localhost:5000/students")
            setStudents(res.data.students)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStudent = async (id) => {
        try {
            let res = await axios.delete(`http://localhost:5000/students/${id}`)
            setStudents([...students.filter((s) => s._id !== id)])

        } catch (error) {
            console.log(error)
        }
    }


    const updateMarks = async (rollNo)=>{
        try {
            let res = await axios.post(`http://localhost:5000/students/${rollNo}`)
            // setStudents([...students.filter((s) => s._id !== id)])

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">RollNo</th>
                        <th scope="col">CC</th>
                        <th scope="col">AI</th>
                        <th scope="col">WAD</th>
                        <th scope="col">CNS</th>
                        <th scope="col">DSBDA</th>
                        <th scope="col">Actions</th>


                    </tr>
                </thead>
                <tbody>

                    {
                        students.length > 0 && students.map((student) => (
                            <tr>
                                <td>{student.name}</td>
                                <td>{student.rollNo}</td>
                                <td>{student.CC_Marks}</td>
                                <td>{student.AI_Marks}</td>
                                <td>{student.WAD_Marks}</td>
                                <td>{student.CNS_Marks}</td>
                                <td>{student.DSBDA_Marks}</td>
                                <td>

                                    <i style={{cursor: "pointer"}} onClick={() => deleteStudent(student._id)} className="fa-solid fa-trash-can"></i> |
                                    <i style={{cursor: "pointer"}} className="fa-solid fa-pen-clip" onClick={() => deleteStudent(student._id)}></i>


                                </td>

                            </tr>

                        ))

                    }



                </tbody>
            </table>

        </div>
    )
}

export default StudentList
