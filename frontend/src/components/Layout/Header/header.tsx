import Logo from "./logo";

const Header=()=>{
    return (
        <header className="fixed m-0 h-7 w-screen py-0_5 px-1 flex border-gray-5 border-b bg-white justify-between">
            <Logo />
        </header>
    );
}

export default Header;