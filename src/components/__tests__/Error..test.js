/**
 * @file Error.test.js
 * @description Test file for the Error component using Jest and react-test-renderer.
 */

import renderer from 'react-test-renderer';
import React from 'react';
import Error from '../Error';

/**
 * Renders a tree using react-test-renderer.
 *
 * @param {ReactNode} tree - The React tree to be rendered.
 * @returns {ReactTestRenderer} The rendered tree.
 */
const renderTree = (tree) => renderer.create(tree);

describe('<Error>', () => {
  /**
   * Snapshot test for rendering the Error component.
   */
  it('should render component', () => {
    expect(renderTree(<Error />).toJSON()).toMatchSnapshot();
  });
});
