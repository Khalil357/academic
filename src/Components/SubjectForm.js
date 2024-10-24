import React, { useState } from 'react';
import axios from 'axios';

const SubjectForm = () => {
    const [subject, setSubject] = useState({
        s_name: '',
        s_code: '',
        unit: '',
        point: '',
        grade: ''
    });

    const [message, setMessage] = useState(''); // For feedback messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubject((prevSubject) => {
            const updatedSubject = { ...prevSubject, [name]: value };
            console.log('Updated subject state:', updatedSubject); // Debugging line
            return updatedSubject;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting subject:', subject); // Debugging line
        try {
            const response = await axios.post('http://localhost:8080/api/subjects/subject', subject, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Subject saved:', response.data);
            setMessage('Subject submitted successfully!'); // Success message
            
            // Optionally reset the form
            setSubject({
                s_name: '',
                s_code: '',
                unit: '',
                point: '',
                grade: ''
            });
        } catch (error) {
            console.error('There was an error saving the subject!', error);
            setMessage('Error: ' + (error.response?.data?.message || error.message)); // Error message
        }
    };

    return (
        <div className="subject-form">
            <h2>Enter Subject Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Subject Name:
                        <input
                            type="text"
                            name="s_name"
                            value={subject.s_name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Subject Code:
                        <input
                            type="text"
                            name="s_code"
                            value={subject.s_code}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Units:
                        <input
                            type="number"
                            name="unit"
                            value={subject.unit}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Point:
                        <input
                            type="number"
                            name="point"
                            value={subject.point}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Grade:
                        <select
                            name="grade"
                            value={subject.grade}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Grade</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
};

export default SubjectForm;
