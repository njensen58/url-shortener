import React, { ChangeEvent } from 'react';
import InputScreen from './InputScreen';
import FinalScreen from './FinalScreen';
import ErrorDisplay from './ErrorDisplay';
import HttpRequest from '../lib/http';
import { SuccessData } from '../lib/http';


const MainContainer = () => {
    const [url, setUrl] = React.useState<string>("");
    const [alias, setAlias] = React.useState<string>("");
    const [data, setData] = React.useState<SuccessData | undefined>(undefined);
    const [error, setError] = React.useState<string>("");

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }

    const handleAliasChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlias(e.target.value)
    }

    const handleClick = async () => {
        setError("");
        try {
            const res = await new HttpRequest("POST", "/api", { url, alias }).request();
            setData(res.data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                let err = error.message || "Something went wrong, please try again."
                console.error(error)
                setError(err)
            } else {
                setError("Something went wrong, please try again.");
            }
        }
    }

    return (
        <div className="max-w-md mx-auto bg-blue-800 p-4">
            <p className="text-stone-200 mb-2 text-4xl">My-Url-Shortener</p>
            {!data?.short_url ?
                <InputScreen
                    url={url}
                    alias={alias}
                    handleClick={handleClick}
                    handleUrlChange={handleUrlChange}
                    handleAliasChange={handleAliasChange}
                />
                :
                <FinalScreen
                    longUrl={data.long_url}
                    shortUrl={data.short_url}
                />
            }
            <ErrorDisplay error={error} />
        </div>
    )
}

export default MainContainer;