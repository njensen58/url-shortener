import { render, screen } from '../../utils/test-utils';
import FinalScreen from '../../src/components/FinalScreen';
import React from 'react';

describe("FinalScreen Component", () => {
    it("renders", async () => {
        render(<FinalScreen longUrl="some.long.url" shortUrl="imshort" />, {});

        expect(await screen.getByText("some.long.url")).toBeTruthy();
        expect(await screen.getByText("imshort")).toBeTruthy();
    });
})