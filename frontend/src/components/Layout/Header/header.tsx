import Logo from "./logo";

const Header=()=>{
    return (
        <header className="fixed m-0 h-7 w-screen py-0_5 px-1 flex bg-white justify-between z-9">
            <Logo />
        </header>
    );
}

export default Header;