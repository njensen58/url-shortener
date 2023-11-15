import { render, screen } from '../../utils/test-utils';
import App from '../../src/App';
import React from 'react';

describe("App Component", () => {
    it("renders", async () => {
        render(<App />, {});

        expect(await screen.getByText("My-Url-Shortener")).toBeTruthy();
    });
})