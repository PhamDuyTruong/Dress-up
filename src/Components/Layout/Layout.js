import React from 'react';
 import classes from './Layout.module.css'

export default function Layout(props) {
    return (
        <div className={classes.model}>
            <main>{props.children}</main>
        </div>
    )
}
