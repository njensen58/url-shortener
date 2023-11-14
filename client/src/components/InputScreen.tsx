import React, { ChangeEvent } from 'react';
import { FaMagic, FaCompress } from 'react-icons/fa'

interface IProps {
    handleClick: () => void,
    url: string,
    alias: string,
    handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleAliasChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputScreen = ({
    handleClick,
    url,
    alias,
    handleUrlChange,
    handleAliasChange
}: IProps) => {
    return (<div className="shadow-md bg-zinc-200 rounded p-2">
        <FaCompress className="inline my-2 mb-2 mr-1" />
        <label htmlFor="name">Shorten a long URL</label>
        <input
            name="url"
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter long link here"
            className="rounded p-1 w-4/5 block mb-2"
        />
        <FaMagic className="my-2 mr-2 mb-2 inline" />
        <label htmlFor="alias" className="inline">Customize your link</label>
        <input
            name="alias"
            type="text"
            value={alias}
            onChange={handleAliasChange}
            placeholder="Enter alias"
            className="rounded p-1 w-4/5 block"
        />
        <p className="text-xs">Alias must be at least 5 alphanumeric characters.</p>
        <div className="flex justify-center">
            <button
                onClick={handleClick}
                className="border-2 border-slate-500 rounded mt-2 p-1 w-4/5">
                Shorten!
            </button>
        </div>
    </div>)
}

export default InputScreen;