import React from 'react';
import { CSSTransition, transit, CSSTransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';

const FadeInOut = (props) => (
    <CSSTransition
        {...props}
        defaultStyle={{ opacity: 0 }}
        enterStyle={{ opacity: transit(1.0, 500, "ease-in-out") }}
        leaveStyle={{ opacity: transit(0, 500, "ease-in-out") }}
        activeStyle={{ opacity: 1.0 }}
    />
);
const FadeInOutGroup = (props) => (
    <CSSTransitionGroup {...props}>
        {
            React.Children.map(
                props.children,
                (child) => <FadeInOut>{child}</FadeInOut>,
            )
        }
    </CSSTransitionGroup>
);
const CSSTransitionRoute = ({ transitionName, ...rest }) => (
    <Route render={({ location }) => (
        <FadeInOutGroup>
            <Route
                location={location}
                key={location.key}
                {...rest}
            />
        </FadeInOutGroup>
    )} />
)
export default CSSTransitionRoute;