import drink from "../assets/drink.svg";

const Contact = () => {
    return (
        <div className="p-2 w-full h-[5rem] relative grid grid-cols-5 gap-2 bg-primary/20 rounded-2xl hover:bg-primary border-[1px] border-primary duration-150 hover:scale-[1.05]">
            <div className="bg-red-300 col-span-1 w-full  flexbox rounded-xl overflow-hidden">
                <img
                    src={drink}
                    alt=""
                    className=" w-full h-full object-cover"
                />
            </div>
            <div className=" col-span-4 w-full flexbox flex-col items-start  ">
                <h2 className=" font-semibold">Name</h2>
                <p className=" text-xs line-clamp-1 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    officiis exercitationem, mollitia sapiente dolorem.
                </p>
            </div>

            <div className=" absolute -top-2 -right-2 shadow-lg p-[1px] rounded-full">
                🟢
            </div>
        </div>
    );
};

export default Contact;
