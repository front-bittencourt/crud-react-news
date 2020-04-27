import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import Footer from './index';

describe('Tests for Footer component', () => {
    it('Must contain the text', async () => {
        const { getByTestId } = render(<Footer />)
        const fieldNode = await waitForElement(
            () => getByTestId('footer')
        )
        console.log(fieldNode)
    })
})