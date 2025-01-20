interface CardProps {
    title: string;
    description: string;
    link: string;
}

export const Card = ({ title, description, link }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <a
                    href={link}
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Demo
                </a>
            </div>
        </div>
    );
};