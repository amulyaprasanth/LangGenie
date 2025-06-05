import Image from 'next/image';
import Navbar from "@/app/Navbar/page";

const Landing = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div id="title" className="relative h-screen w-screen -z-10">
                <Image fill={true} src='/bg_home.jpg' alt='water waves'/>
                <div className= 'bg-cover absolute text-white text-center content-center p-5 m-3 inset-0' >
                    <h1 className="text-7xl font-montserrat font-bold m-2"> LangGenie</h1>
                    <h2 className="text-xl font-montserrat"> Your Academic Friend</h2>
                </div>
            </div>

            <div id="about" className="flex items-center conten-center relative h-70  w-screen -z-10">
                <Image fill={true} src='/bg_about.jpg' alt='pyramidal design background'/>
                <div className="flex flex-col items-center absolute  text-white font-montserrat p-5">
                    <h2 className="text-bold text-3xl"> About </h2>
                    <h3 className='text-center lg:w-1/2 p-5 text-l'> LangGenie transforms the way you discover and explore information, acting as your personal research assistant.
                        Equipped with powerful tools like the PDF Agent and integrated access to Wiki and Arxiv,
                        LangGenie streamlines the process of navigating academic papers, articles, and research materials.
                        Whether you&#39;re delving into complex topics or seeking quick insights,
                        LangGenie helps you stay focused and informed, making your research journey faster and smarter.</h3>
                </div>
            </div>
        </div>


    )
}

export default Landing;
