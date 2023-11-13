import React, { ChangeEvent } from 'react';

const MainContainer = () => {
    const [text, setText] = React.useState("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleClick = async () => {
        const fetchOpts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: text })
        }
        const res = await fetch("/api", fetchOpts)
        const data = await res.json();
    }

    return (
        <div className="max-w-md mx-auto bg-blue-800 p-4">
            <p className="text-stone-200 mb-2">My-Url-Shortener</p>
            <div className="shadow-md bg-zinc-200 rounded p-2">
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Enter long link here"
                    className="rounded p-1"
                />
                <button
                    onClick={handleClick}
                    className="border-2 border-slate-500 rounded mt-2 p-1 block">
                    Shorten!
                </button>
            </div>
        </div>
    )
}

export default MainContainer;