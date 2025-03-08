import React, { useState } from 'react';
import axios from 'axios';
import './SubjectForm.css'; // Import the CSS file for styling

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{
        s_name: '',
        s_code: '',
        unit: '',
        grade: '',
        point: 0 
    }]);

    const [message, setMessage] = useState(''); 
    const [overallGPA, setOverallGPA] = useState(0); 

    // Function to handle input change
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSubjects = [...subjects];
        updatedSubjects[index] = { ...updatedSubjects[index], [name]: value };

        // Automatically calculate point based on grade
        updatedSubjects[index].point = calculatePoint(updatedSubjects[index].grade);

        setSubjects(updatedSubjects);
    };

    const calculatePoint = (grade) => {
        switch (grade) {
            case 'A':
                return 4.0;
            case 'B':
                return 3.0;
            case 'C':
                return 2.0;
            case 'D':
                return 1.0;
            case 'F':
                return 0.0;
            default:
                return 0.0;
        }
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { s_name: '', s_code: '', unit: '', grade: '', point: 0 }]);
    };

    const handleRemoveSubject = (index) => {
        const updatedSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(updatedSubjects);
    };

    const calculateOverallGPA = () => {
        const totalWeightedPoints = subjects.reduce((total, subject) => {
            const unitValue = parseFloat(subject.unit) || 0;
            const pointValue = parseFloat(subject.point) || 0;
            return total + (unitValue * pointValue);
        }, 0);

        const totalUnits = subjects.reduce((total, subject) => total + (parseFloat(subject.unit) || 0), 0);

        return totalUnits > 0 ? (totalWeightedPoints / totalUnits).toFixed(2) : 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const overallGPA = calculateOverallGPA();
        setOverallGPA(overallGPA);

        try {
            const response = await axios.post('http://localhost:8080/api/subjects/subject', subjects, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Subjects saved:', response.data);
            setMessage(`Subjects submitted successfully! Overall GPA: ${overallGPA}`); // Success message

            // Optionally reset the form
            setSubjects([{ s_name: '', s_code: '', unit: '', grade: '', point: 0 }]);
        } catch (error) {
            console.error('There was an error saving the subjects!', error);
            setMessage('Error: ' + (error.response?.data?.message || error.message)); // Error message
        }
    };

    return (
        <div className="subject-form">
            <h2>Enter Subject Details</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Subject Name</th>
                            <th>Subject Code</th>
                            <th>Units</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        name="s_name"
                                        value={subject.s_name}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="s_code"
                                        value={subject.s_code}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="unit"
                                        value={subject.unit}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </td>
                                <td>
                                    <select
                                        name="grade"
                                        value={subject.grade}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    >
                                        <option value="">Select Grade</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveSubject(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleAddSubject}>Add Another Subject</button><br /><br />
                <button type="submit">Submit</button>
            </form>

            {message && <p>{message}</p>} {/* Display success or error message */}
            <h3>Overall GPA: {overallGPA}</h3> {/* Display the calculated overall GPA */}
        </div>
    );
};

export default SubjectForm;