import React, { useState } from 'react'

const AiSuggestion = () => {


    const [arrangedTask, setArrangedTask] = useState([]); //store the task coming from the ai and after being converted into json 
    const [showAiSuggestion, setShowAiSuggestion] = useState(true); // to toggle the ai suggestion bar 



    const aiTaskFromLS = JSON.parse(localStorage.getItem('arrangedByAi')) || []; // get the task from local storage and parse it into json


    const toggleCloseAiSuggestion = () => {
        setShowAiSuggestion(prev => !prev);
    };


    const arrangeTasksByAi = async () => {
        setStatus("loading")

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiSuggestion/${userID}`);
            const data = response.data.message.candidates[0].content.parts[0].text;
            // console.log("the data is ", data);

            const cleanedData = data.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            // console.log("cleaned data: ", cleanedData);

            // Try parsing the cleaned JSON
            const jsonData = JSON.parse(cleanedData);
            // console.log("Parsed JSON data:", jsonData);
            localStorage.setItem('arrangedByAi', JSON.stringify(jsonData))

            setArrangedTask(jsonData);
            setStatus("idle");

        } catch (error) {
            if (error.response) {
                // Axios error with a server response
                console.error("Axios error:", error.response.data.message);
                setStatus("error");
                setErrorMsg(error.response.data.message)

                // alert(`Error: ${error.response.data.message}`);
            } else if (error instanceof SyntaxError) {
                // JSON.parse error
                console.error("JSON parsing error:", error.message);
                setStatus("error")
                setErrorMsg(error.response)
                // alert(`JSON Parsing Error: ${error.message}`);
            } else {
                // Other unexpected errors
                console.error("Unexpected error:", error.message);
                setStatus("error")
                setErrorMsg(error.response)
                // alert(`Unexpected Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 shadow-md max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-indigo-600 text-white rounded-full p-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-indigo-900 text-lg">AI Suggestion</h3>
                                <button
                                    onClick={toggleCloseAiSuggestion}
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded transition"
                                >
                                    {showAiSuggestion ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <p className="text-sm text-indigo-700 mb-2">
                                Enter your tasks and let the AI organize them like a personal assistant.
                            </p>
                        </div>
                    </div>

                    {showAiSuggestion && (
                        <div className="space-y-3">
                            {aiTaskFromLS?.map((task, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-3 rounded-lg shadow-sm border border-indigo-200"
                                >
                                    <h1 className="text-base font-semibold text-indigo-800">{task.title}</h1>
                                    <p className="text-sm text-indigo-600 mt-1">{task.reason}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={arrangeTasksByAi}
                            className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                        >
                            Arrange Tasks
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AiSuggestion