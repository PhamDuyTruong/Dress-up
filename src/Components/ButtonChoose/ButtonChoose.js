import React from 'react';
import classes from "./ButtonChoose.module.css"

export default function ButtonChoose(props) {
    return (
    <li className={classes.buttonChoose}>
        <a
            href
            onClick={props.click}
            className={`${classes['buttonChoose__link']} ${props.active ? `${classes.active}` : null}`}>
            {props.name}
        </a>
    </li>
    )
}
