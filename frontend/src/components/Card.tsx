import { useNavigate } from "react-router";

interface CardProps {
    title: string;
    description: string;
    link: string;
}

export const Card = ({title, description, link}: CardProps) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="px-6 py-4">
                <div className="text-black ont-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button
                    onClick = {() => navigate(link)}
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Demo
                </button>
            </div>
        </div>
    );
};
