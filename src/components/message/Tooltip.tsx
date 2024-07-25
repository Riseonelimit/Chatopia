const Tooltip = ({ message }: { message: string }) => {
    return (
        <span className=" px-2 py-2 rounded-2xl absolute bg-background border-[1px] border-primary/70 text-white text-xs font-medium text-center backdrop-blur-md group-hover:translate-y-[50px] translate-y-[30px] group-hover:visible invisible duration-150 group-hover:opacity-100 opacity-0 select-none ">
            {message}
        </span>
    );
};

export default Tooltip;
