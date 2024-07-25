import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useDialogBox } from "../../hooks/useDialogBox";
import AddFriendModel from "./AddFriendModel";
import CreateGroupModel from "./CreateGroupModel";

export const DialogBox = () => {
    const nodeRef = useRef(null);

    const { isOpen, boxType } = useDialogBox();

    return (
        <CSSTransition
            nodeRef={nodeRef}
            timeout={500}
            in={isOpen}
            unmountOnExit
            classNames="dialog"
        >
            <div
                ref={nodeRef}
                className=" absolute w-full h-full flexbox z-[99] bg-background/60 top-0    "
            >
                {boxType == "ADD_FRIEND" ? (
                    <AddFriendModel />
                ) : boxType == "CREATE_GROUP" ? (
                    <CreateGroupModel />
                ) : null}
            </div>
        </CSSTransition>
    );
};
