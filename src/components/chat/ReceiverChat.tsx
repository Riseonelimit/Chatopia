const ReceiverChat = ({ message }: { message: string }) => {
    return (
        <div className="px-4 py-3 mr-auto animate-receive-chat bg-gray-800/70 shadow-md max-w-[60%] flexbox rounded-r-2xl rounded-tl-2xl">
            <span className=" ">{message}</span>
        </div>
    );
};

export default ReceiverChat;
