import React from 'react';
 import classes from "./ModelImage.module.css"

export default function ModelImage({propsImageModel}) {
    return (
    <div className={classes.body}>
        <img className={classes.tops} src={propsImageModel.tops} alt={propsImageModel.name} />
        <img className={classes.pants} src={propsImageModel.pants} alt={propsImageModel.name} />
        <img className={classes.outer} src={propsImageModel.outer} alt={propsImageModel.name} />
        <img className={classes.hat} src={propsImageModel.hat} alt={propsImageModel.name} />
        <img className={classes.glass} src={propsImageModel.glass} alt={propsImageModel.name} />
        <img className={classes.shoe} src={propsImageModel.shoe} alt={propsImageModel.name} />
        <img className={classes.dress} src={propsImageModel.dress} alt={propsImageModel.name} />
    </div>
    )
}
