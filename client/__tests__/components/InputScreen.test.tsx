import { render, fireEvent, screen } from '../../utils/test-utils';
import InputScreen from '../../src/components/InputScreen';
import React from 'react';

describe("InputScreen Component", () => {
    const defaultProps = {
        handleClick: jest.fn(),
        url: "",
        alias: "",
        handleUrlChange: jest.fn(),
        handleAliasChange: jest.fn()
    }

    it("renders", async () => {
        render(<InputScreen {...defaultProps} />, {});

        expect(await screen.getByText("Shorten a long URL")).toBeTruthy();
        expect(await screen.getByText("Customize your link")).toBeTruthy();
    });

    it("calls handleUrlChange on url input update", async () => {
        render(<InputScreen {...defaultProps} />, {});

        const urlInput = await screen.findByLabelText("Shorten a long URL");
        const testEventObj = { target: { value: "test" } }
        await fireEvent.change(urlInput, testEventObj);

        expect(defaultProps.handleUrlChange).toHaveBeenCalled()
        expect(defaultProps.handleUrlChange).toHaveBeenCalledTimes(1)
    });

    it("calls handleAliasChange on url input update", async () => {
        render(<InputScreen {...defaultProps} />, {});

        const aliasInput = await screen.findByLabelText("Customize your link");
        const testEventObj = { target: { value: "test" } }
        await fireEvent.change(aliasInput, testEventObj);

        expect(defaultProps.handleAliasChange).toHaveBeenCalled()
        expect(defaultProps.handleAliasChange).toHaveBeenCalledTimes(1)
    });

    it("calls handleClick on shorten submission", async () => {
        render(<InputScreen {...defaultProps} />, {});

        const btn = await screen.findByText("Shorten!");

        await fireEvent.click(btn);

        expect(defaultProps.handleClick).toHaveBeenCalled()
        expect(defaultProps.handleClick).toHaveBeenCalledTimes(1)
    });
})