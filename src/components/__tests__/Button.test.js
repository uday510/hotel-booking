/**
 * @file Button.test.js
 * @description Test file for the Button component using Jest and react-test-renderer.
 */

import renderer from 'react-test-renderer';
import React from 'react';
import Button from '../Button';

/**
 * Renders a tree using react-test-renderer.
 *
 * @param {ReactNode} tree - The React tree to be rendered.
 * @returns {ReactTestRenderer} The rendered tree.
 */
const renderTree = (tree) => renderer.create(tree);

describe('<Button>', () => {
  /**
   * Snapshot test for rendering the Button component.
   */
  it('should render component', () => {
    expect(renderTree(<Button />).toJSON()).toMatchSnapshot();
  });
});
