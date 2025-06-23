import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react'; // optional icon lib
const AiSuggestion = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const userID = user.id;

    const [arrangedTask, setArrangedTask] = useState([]);
    const [triesLeft, setTriesLeft] = useState(null);

    const [showAiSuggestion, setShowAiSuggestion] = useState(false);
    const aiTaskFromLS = JSON.parse(localStorage.getItem('arrangedByAi')) || [];

    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [remainingTries, setRemainingTries] = useState(null); // ✅

    const toggleCloseAiSuggestion = () => {
        setShowAiSuggestion(prev => !prev);
    };

    const arrangeTasksByAi = async () => {
        setStatus("loading");
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiSuggestion/${userID}`);
            console.log("AI Suggestion Response:", response.data);

            const { message, remainingTries } = response.data;
            const data = message.candidates[0].content.parts[0].text;
            const cleanedData = data.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            const jsonData = JSON.parse(cleanedData);

            localStorage.setItem('arrangedByAi', JSON.stringify(jsonData));
            setArrangedTask(jsonData);
            // setRemainingTries(response.data.remainingTries); // ✅ from backend
            setTriesLeft(remainingTries);

            setStatus("success");
            setShowAiSuggestion(true);
            setSuccessMsg("✅ Tasks arranged successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (error) {
            console.error("AI Suggestion Error:", error);

            if (error.response?.status === 429) {
                const tries = error.response?.data?.remainingTries ?? 0;
                setRemainingTries(tries); // ✅ update state
                setErrorMsg("❌ You’ve utilized all your credits. Please try again after 24 hours.");
            } else {
                setErrorMsg("❌ Failed to fetch AI suggestions. Please try again.");
            }

            setStatus("error");
            setTimeout(() => setErrorMsg(""), 4000);
        } finally {
            setStatus("idle");
        }
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-lg max-h-[90vh] overflow-y-auto transition-all">
                <div className="flex flex-col gap-5">
                    {/* Header */}
                    {triesLeft !== null && (
                        <div className="text-sm text-indigo-700 bg-indigo-100 border border-indigo-300 p-2 rounded-md">
                            🔁 Remaining AI tries: <strong>{triesLeft}</strong>
                        </div>
                    )}

                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-600 text-white rounded-full p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-indigo-900 text-xl">AI Suggestions</h3>
                                <button
                                    onClick={toggleCloseAiSuggestion}
                                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-1 rounded text-xs"
                                >
                                    {showAiSuggestion ? "Hide" : "Show"}
                                </button>
                            </div>
                            <p className="text-sm text-indigo-700">
                                Get your tasks smartly arranged using AI insights. Click below!
                            </p>
                        </div>
                    </div>

                    {/* Success/Error Messages */}
                    {errorMsg && (
                        <div className="text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded-md">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="text-sm text-green-700 bg-green-100 border border-green-300 p-2 rounded-md">
                            {successMsg}
                        </div>
                    )}

                    {/* Task Cards */}
                    {showAiSuggestion && aiTaskFromLS.length > 0 && (
                        <div className="space-y-4">
                            {aiTaskFromLS.map((task, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-indigo-200 p-4 rounded-xl shadow-sm transition hover:shadow-md"
                                >
                                    <h4 className="text-indigo-800 font-semibold">{task.title}</h4>
                                    <p className="text-sm text-indigo-600 mt-1">{task.reason}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Button & Loader */}
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <button
                            onClick={arrangeTasksByAi}
                            disabled={status === "loading"}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-all"
                        >
                            {status === "loading" && <Loader2 className="animate-spin h-5 w-5" />}
                            {status === "loading" ? "Fetching..." : "Arrange Tasks"}
                        </button>

                        {/* Remaining Tries */}
                        {remainingTries !== null && (
                            <p className="text-xs text-gray-500">
                                Remaining AI suggestions: <span className="font-semibold">{remainingTries}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AiSuggestion;