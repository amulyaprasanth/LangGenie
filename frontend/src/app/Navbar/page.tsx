'use client'
import Image from 'next/image';
import Link from 'next/link';
import {useState} from "react";

export default function Navbar () {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openMenu = () =>{
        setIsOpen(prev => !prev);
        }
    return (
        <div className="fixed top-0 z-50 w-full shadow-md" >
            <div className='w-full bg-slate-800 h-20 flex items-center justify-between z-10'>
                <div className="flex items-center">
                    <Image  src='/logo.png'
                            alt='genie coming out of the bottle with a bulb icon'
                            height={50} width={50}/>
                    <h1 className='font-sans text-3xl'> LangGenie </h1>
                </div>
                <div className="hidden md:flex items-center ml-auto space-x-2 p-4">
                    <Link className="nav-links" href="#about">About</Link>
                    <Link className="nav-links" href="#contact">Contact</Link>
                    <Link className="nav-links" href="#services">Services</Link>
                </div>
                <div className="md:hidden hover:text-black hover:bg-slate-300 transition duration-300 ease-in-out rounded-xl mr-3 px-2 py-1 ml-auto shadow-2"
                     onClick={openMenu}>
                    <h1 className='text-2xl text-gray-300 hover:text-gray-700'> &#9776;</h1>
                </div>
            </div>
            <div className="md:hidden">
                {isOpen && <Dropdown/>}
            </div>
        </div>


    )
}
const Dropdown = () => {
    return (
        <div className="absolute top-15 right-0 mr-3 bg-slate-400 rounded-xl text-black px-8 py-2 flex flex-col items-center z-20">
            <p className="w-full py-2 text-center hover:border-b-2 hover:border-amber-500 transition-all cursor-pointer">
                About
            </p>
            <p className="w-full py-2 text-center hover:border-b-2 hover:border-amber-500 transition-all cursor-pointer">
                Contact
            </p>
            <p className="w-full py-2 text-center hover:border-b-2 hover:border-amber-500 transition-all cursor-pointer">
                Services
            </p>
        </div>

    )
}
