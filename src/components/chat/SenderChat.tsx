const SenderChat = ({ message }: { message: string }) => {
    return (
        <div className="px-4 py-3 ml-auto animate-send-chat bg-primary shadow-md max-w-[60%] flexbox rounded-l-2xl rounded-tr-2xl">
            <span className=" ">{message}</span>
        </div>
    );
};

export default SenderChat;
