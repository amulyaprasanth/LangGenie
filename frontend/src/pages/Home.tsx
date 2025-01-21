import bgHome from '../assets/bg_home.jpg';
import bgHome2 from '../assets/bg2_home.jpg';
import bgHome3 from '../assets/bg3_home.jpg';
import {CardList} from "../components/CardList.tsx";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

export const Home = () => {
    return (
        <div className="flex-auto">
            <div className="bg-cover h-screen p-5 text-center content-center"
                 style={{backgroundImage: `url(${bgHome})`}}>
                <h1 className="text-7xl montserrat-large font-bold m-2">LangGenie</h1>
                <h2 className="text-xl lato-regular">Unlock Knowledge with AI Tools</h2>
            </div>
            <div>
                <div id="about" className="bg-cover h-96 text-center content-center p-10"
                     style={{backgroundImage: `url(${bgHome2})`}}>
                    <ScrollAnimation animateIn="fadeInRight" className="bg-slate-400 bg-opacity-60 p-5 text-black">
                        <h3 className="roboto-normal text-xl mx-10">About</h3>
                        <p className="text-l roboto-normal mx-auto">
                            LangGenie is an AI-powered research platform designed to enhance the way you access and
                            explore
                            information. With tools like the PDF Agent and Wiki & Arxiv integration, LangGenie makes it
                            easy
                            to navigate academic papers, articles, and research materials. Whether you're diving deep
                            into a
                            subject or looking for quick insights, LangGenie provides seamless access to knowledge,
                            helping
                            you stay focused and informed in your research journey.
                        </p>
                    </ScrollAnimation>
                </div>
                <div id="services" className="bg-cover" style={{backgroundImage: `url(${bgHome3})`}}>
                    <CardList/>
                </div>
            </div>

        </div>
    );
};