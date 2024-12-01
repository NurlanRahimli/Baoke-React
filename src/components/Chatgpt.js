// import React, { useState } from "react";
// import axios from "axios";

// import REACT_APP_OPENAI_API_KEY from "../components/chatgpt.env";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false); // Toggle chatbot visibility

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo", // Or the model you're authorized for
//           messages: updatedMessages,
//         },
//         {
//           headers: {
//             Authorization:
//               "Bearer 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",
//           },
//         }
//       );

//       const assistantMessage = response.data.choices[0].message;
//       setMessages((prev) => [...prev, assistantMessage]);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error with OpenAI API:", error);
//     }

//     setInput("");
//   };

//   return (
//     <div
//       className={`fixed bottom-4 right-4 z-50 ${
//         isOpen ? "w-80 h-96" : "w-16 h-16"
//       } bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col transition-all duration-300`}
//     >
//       {/* Chatbot Header */}
//       <div
//         className="bg-blue-500 text-white p-2 cursor-pointer rounded-t-lg flex items-center justify-between"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="font-bold">{isOpen ? "ChatGPT Helper" : "💬"}</span>
//       </div>

//       {/* Chatbot Body */}
//       {isOpen && (
//         <div className="flex flex-col flex-1 p-2 overflow-hidden">
//           <div className="flex-1 overflow-y-auto">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 my-1 ${
//                   msg.role === "user"
//                     ? "text-right text-blue-600"
//                     : "text-left text-gray-600"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             ))}
//           </div>

//           {/* Input Field */}
//           <div className="mt-2 flex">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-500 text-white px-4 rounded-r-lg"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
