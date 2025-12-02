"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Proper Fisher-Yates Shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const subjectQuestions = {
  "Computer Basics": [
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Control Program Utility", "Central Performance Unit"], answer: "Central Processing Unit" },
    { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Action Memory", "Run Allocation Memory"], answer: "Random Access Memory" },
    { question: "Which language runs in the browser?", options: ["Python", "JavaScript", "C++", "Java"], answer: "JavaScript" },
  ],
  "Data Structures": [
    { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
    { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Linked List"], answer: "Stack" },
    { question: "Binary Search complexity is?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], answer: "O(log n)" },
  ],
  "Web Development": [
    { question: "What does HTML stand for?", options: ["Hyper Text Makeup Language", "Hyper Transfer Markup Language", "Hyper Text Markup Language", "Hyperlink Text Mark Language"], answer: "Hyper Text Markup Language" },
    { question: "Which language is used for styling websites?", options: ["HTML", "Python", "CSS", "MySQL"], answer: "CSS" },
    { question: "React is developed by?", options: ["Google", "Meta", "Microsoft", "Amazon"], answer: "Meta" },
  ],
};

export default function TestPage() {
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (questions.length > 0 && timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, questions.length, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartTest = () => {
    if (!studentName.trim() || !rollNumber.trim() || !subject) {
      alert("Please fill all fields!");
      return;
    }

    const selected = subjectQuestions[subject];
    const shuffledQuestions = shuffleArray(selected).slice(0, 10).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffledQuestions);
    setTimeLeft(20 * 60);
    setCurrentQIndex(0);
    setAnswers({});
    setScore(null);
    setIsSubmitted(false);
  };

  const handleAnswer = (qIndex, option) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) sc++;
    });
    setScore(sc);
    setIsSubmitted(true);

    // Confetti if score ≥ 70%
    if ((sc / questions.length) >= 0.7) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = questions.length > 0 ? (Object.keys(answers).length / questions.length) * 100 : 0;

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl"
        >
          <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Test Yourself
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 focus:border-blue-500 focus:outline-none transition"
                placeholder="John Doe"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Roll Number</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 focus:border-blue-500 focus:outline-none transition"
                placeholder="CSE2023001"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Subject</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 focus:border-blue-500 focus:outline-none transition"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">-- Choose Subject --</option>
                {Object.keys(subjectQuestions).map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleStartTest}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 rounded-xl font-bold text-lg transition transform hover:scale-105"
            >
              Start Test
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // Test Running or Submitted
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white py-10 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{studentName} - {subject}</h1>
        <p className="text-gray-300">Roll No: {rollNumber}</p>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <div className="text-2xl font-bold text-red-400">
            Time Left: <span className="text-3xl">{formatTime(timeLeft)}</span>
          </div>

          <div className="text-lg">
            Question {currentQIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Current Question */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={currentQIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6">
            {currentQIndex + 1}. {questions[currentQIndex].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQIndex].options.map((option, i) => {
              const isCorrect = option === questions[currentQIndex].answer;
              const isSelected = answers[currentQIndex] === option;

              return (
                <label
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    isSubmitted
                      ? isCorrect
                        ? "bg-green-500/30 border-green-500"
                        : isSelected
                        ? "bg-red-500/30 border-red-500"
                        : "bg-white/5 border-white/20"
                      : "bg-white/10 border-white/30 hover:bg-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${currentQIndex}`}
                    checked={isSelected}
                    onChange={() => handleAnswer(currentQIndex, option)}
                    disabled={isSubmitted}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="text-lg">{option}</span>
                  {isSubmitted && isCorrect && <span className="ml-auto text-green-300 font-bold">Correct</span>}
                  {isSubmitted && isSelected && !isCorrect && <span className="ml-auto text-red-300 font-bold">Wrong</span>}
                </label>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
            disabled={currentQIndex === 0}
            className="px-6 py-3 bg-white/10 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition"
          >
            Previous
          </button>

          {currentQIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQIndex(currentQIndex + 1)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl font-bold text-lg transition transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitted ? "Submitted!" : "Submit Test"}
            </button>
          )}
        </div>
      </div>

      {/* Final Score */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-16"
        >
          <div className="text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {score} / {questions.length}
          </div>
          <p className="text-2xl mt-4">
            {score >= 8 ? "Excellent! Keep it up!" : score >= 6 ? "Good Effort!" : "Better luck next time!"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-lg transition"
          >
            Take New Test
          </button>
        </motion.div>
      )}
    </main>
  );
}