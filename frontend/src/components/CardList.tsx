import {Card} from "./Card.tsx";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import {config} from "../Constants.ts";

const url = config.url.BASE_URL;

export const CardList = () => {
    const cards = [
        {
            title: "WikiArXiv Explore",
            description: "Effortlessly retrieve and explore knowledge from Wikipedia and ArXiv.",
            link: `${url}/tool`
        },
        {
            title: "DocQnA",
            description: "Unlock answers directly from your PDFs with ease.",
            link: `${url}/rag`
        }
    ];

    return (
        <div className="text-center">
            <ScrollAnimation animateIn="backInDown">
                <h2 className="text-3xl font-bold pt-5 pb-5 lato-regular">Services</h2>
            </ScrollAnimation>

            <ScrollAnimation animateIn="backInLeft">
                <div className="flex justify-center space-x-4 roboto-normal">
                    {cards.map((card, index) => (
                        <Card key={index} title={card.title} description={card.description} link={card.link}/>
                    ))}
                </div>
            </ScrollAnimation>
        </div>
    );
};