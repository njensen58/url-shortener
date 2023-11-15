import { render, screen } from '../../utils/test-utils';
import ErrorDisplay from '../../src/components/ErrorDisplay';
import React from 'react';

describe("ErrorDisplay Component", () => {
    it("renders", async () => {
        render(<ErrorDisplay error={"TEST ERROR"} />, {});

        expect(await screen.getByText("TEST ERROR")).toBeTruthy();
    });
})