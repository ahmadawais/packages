/**
 * External dependencies
 */
import { createElement, Component, cloneElement, Children, Fragment } from 'react';
import { render, findDOMNode, createPortal, unmountComponentAtNode } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { camelCase, flowRight, isString, upperFirst } from 'lodash';

/**
 * Returns a new element of given type. Type can be either a string tag name or
 * another function which itself returns an element.
 *
 * @param  {?(string|Function)} type     Tag name or element creator
 * @param  {Object}             props    Element properties, either attribute
 *                                       set to apply to DOM node or values to
 *                                       pass through to element creator
 * @param  {...WPElement}       children Descendant elements
 * @return {WPElement}                   Element
 */
export { createElement };

/**
 * Renders a given element into the target DOM node.
 *
 * @param {WPElement} element Element to render
 * @param {Element}   target  DOM node into which element should be rendered
 */
export { render };

/**
 * Removes any mounted element from the target DOM node.
 *
 * @param {Element} target DOM node in which element is to be removed
 */
export { unmountComponentAtNode };

/**
 * A base class to create WordPress Components (Refs, state and lifecycle hooks)
 */
export { Component };

/**
 * A component which renders its children without any wrapping element.
 */
export { Fragment };

/**
 * Creates a copy of an element with extended props.
 *
 * @param  {WPElement} element Element
 * @param  {?Object}   props   Props to apply to cloned element
 * @return {WPElement}         Cloned element
 */
export { cloneElement };

/**
 * Finds the dom node of a React component
 *
 * @param {Component} component component's instance
 * @param {Element}   target    DOM node into which element should be rendered
 */
export { findDOMNode };

export { Children };

/**
 * Creates a portal into which a component can be rendered.
 *
 * @see https://github.com/facebook/react/issues/10309#issuecomment-318433235
 *
 * @param {Component} component Component
 * @param {Element}   target    DOM node into which element should be rendered
 */
export { createPortal };

/**
 * Renders a given element into a string
 *
 * @param  {WPElement} element Element to render
 * @return {String}            HTML
 */
export { renderToStaticMarkup as renderToString };

/**
 * Concatenate two or more React children objects
 *
 * @param  {...?Object} childrenArguments Array of children arguments (array of arrays/strings/objects) to concatenate
 * @return {Array}                        The concatenated value
 */
export function concatChildren( ...childrenArguments ) {
	return childrenArguments.reduce( ( memo, children, i ) => {
		Children.forEach( children, ( child, j ) => {
			if ( child && 'string' !== typeof child ) {
				child = cloneElement( child, {
					key: [ i, j ].join(),
				} );
			}

			memo.push( child );
		} );

		return memo;
	}, [] );
}

/**
 * Composes multiple higher-order components into a single higher-order component. Performs right-to-left function
 * composition, where each successive invocation is supplied the return value of the previous.
 *
 * @param {...Function} hocs The HOC functions to invoke.
 * @return {Function}        Returns the new composite function.
 */
export { flowRight as compose };

/**
 * Returns a wrapped version of a React component's display name.
 * Higher-order components use getWrapperDisplayName().
 *
 * @param {Function|Component} BaseComponent used to detect the existing display name.
 * @param {String} wrapperName Wrapper name to prepend to the display name.
 * @return {String}            Wrapped display name.
 */
export function getWrapperDisplayName( BaseComponent, wrapperName ) {
	const { displayName = BaseComponent.name || 'Component' } = BaseComponent;

	return `${ upperFirst( camelCase( wrapperName ) ) }(${ displayName })`;
}
