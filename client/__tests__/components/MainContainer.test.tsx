import { render, screen } from '../../utils/test-utils';
import MainContainer from '../../src/components/MainContainer';
import React from 'react';

describe("MainContainer Component", () => {

    it("renders default view", async () => {
        render(<MainContainer />, {});

        expect(await screen.getByText("Shorten a long URL")).toBeTruthy();
        expect(await screen.getByText("Customize your link")).toBeTruthy();
    });

    it("renders final screen view if response data", async () => {
        const mockDis1: React.Dispatch<unknown> = jest.fn()
        const mockDis2: React.Dispatch<unknown> = jest.fn()
        const mockDis3: React.Dispatch<unknown> = jest.fn()

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => ["", mockDis1])
            .mockImplementationOnce(() => ["", mockDis2])
            .mockImplementationOnce(() => [{ short_url: "TEST URL" }, mockDis3])

        render(<MainContainer />, {})

        const result = await screen.findByText("TEST URL");

        expect(result).toBeTruthy();
    });

    it("renders error screen view if error data", async () => {
        const mockDis1: React.Dispatch<unknown> = jest.fn()
        const mockDis2: React.Dispatch<unknown> = jest.fn()
        const mockDis3: React.Dispatch<unknown> = jest.fn()
        const mockDis4: React.Dispatch<unknown> = jest.fn()

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => ["", mockDis1])
            .mockImplementationOnce(() => ["", mockDis2])
            .mockImplementationOnce(() => [undefined, mockDis3])
            .mockImplementationOnce(() => ["TEST ERROR", mockDis4])

        render(<MainContainer />, {})

        const result = await screen.findByText("TEST ERROR");

        expect(result).toBeTruthy();
    });
})