import React from 'react';

const App = () => {
    const [text, setText] = React.useState("Hello World")

    fetch("/api").then(res => res.json()).then(res => setText(res))

    return (
        <div>{text}</div>
    )
}

export default App;