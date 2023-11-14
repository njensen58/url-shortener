import React from 'react';
import { FaMagic, FaCompress } from 'react-icons/fa';

interface IProps {
    longUrl: string;
    shortUrl: string;
}

const FinalScreen = ({ longUrl, shortUrl }: IProps) => {
    return (
        <div className="shadow-md rounded p-2">
            <p className="text-stone-200 mb-2"><FaCompress className="inline my-2 mb-2 mr-1" />Your Long URL</p>
            <p className="p-1 rounded bg-zinc-200 ">{longUrl}</p>
            <p className="text-stone-200 my-2"><FaMagic className="my-2 mr-2 mb-2 inline" />Shortened URL</p>
            <p className="p-1 rounded bg-zinc-200 ">{shortUrl}</p>
        </div>
    )
}

export default FinalScreen;