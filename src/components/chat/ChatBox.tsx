import { useContext, useEffect, useRef } from "react";
import { MessageContext } from "../../providers/MessageProvider";
import MessageInput from "../MessageInput";
import ReceiverChat from "./ReceiverChat";
import SenderChat from "./SenderChat";

const ChatBox = () => {
    const chatRef = useRef<HTMLDivElement>(null);

    const { messageArray, setMessageArray } = useContext(MessageContext);

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    }, [messageArray]);

    return (
        <div className=" p-3 w-full h-full relative col-span-3 bg-primary/20 rounded-2xl flexbox flex-col gap-3 overflow-hidden">
            {/* MESSAGE DIV */}
            <div className=" w-full h-[90%] flexbox flex-col  justify-start gap-2 rounded-2xl overflow-y-auto no-scrollbar">
                <ReceiverChat message="hey bro" />
                <ReceiverChat message="helllo broooo" />
                <ReceiverChat message="helllo broooo" />
                <ReceiverChat message="helllo broooo" />
                <SenderChat message="whatsppp brooo" />
                <SenderChat message="whatsppp brooo" />

                {messageArray?.length > 0
                    ? messageArray.map((messageInfo, index) => {
                          if (
                              messageInfo.senderId ==
                              localStorage.getItem("uuid")
                          ) {
                              return (
                                  <SenderChat
                                      key={index}
                                      message={messageInfo.message}
                                  />
                              );
                          }
                          return (
                              <ReceiverChat
                                  key={index}
                                  message={messageInfo.message}
                              />
                          );
                      })
                    : null}
                <div ref={chatRef}></div>
            </div>

            <MessageInput
                setMessageArray={setMessageArray}
                messageArray={messageArray}
            />

            {/* CONTACT OVERLAY ON CHAT */}
            {/* <div className="p-3 absolute top-3 left-3 w-full  flexbox bg-zinc-800/90 border-[2px] border-primary/70 rounded-2xl">
        <Contact />
    </div> */}
        </div>
    );
};

export default ChatBox;
