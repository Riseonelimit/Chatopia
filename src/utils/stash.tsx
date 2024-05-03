// const handleClick = () => {
//     console.log(localStorage.getItem("uuid"));
//     console.log(chatId);

//     socket.emit(`message`, {
//         uuid: Number(localStorage.getItem("uuid")),
//         message: message,
//         chatId,
//     });
// };
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//     throw new Error("Missing Publishable Key");
// }

// useEffect(() => {
//     console.log("render");

//     setClientID(localStorage.getItem("uuid"));
//     socket.on("connect", () => {
//         console.log("Connected: ", socket.id);
//     });
// }, []);

// socket.on(`message${chatId}`, (message) => {
//     setMessages([...messages, message]);
// });
