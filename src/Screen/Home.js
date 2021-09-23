import React, {useState} from 'react';
import Button from '../Components/Button/Button';
import { data } from '../data';

import { toPng } from "html-to-image";
import download from "downloadjs";

import classes from './Home.module.css'
import { importImage } from '../Helper/importImage';
import ButtonChoose from '../Components/ButtonChoose/ButtonChoose';
import ModelImage from '../Components/ModelImage/ModelImage';

export default function Home() {
    const [tops, setTops] = useState(null);
    const [outer, setOuter] = useState(null);
    const [shoe, setShoe] = useState(null);
    const [glass, setGlass] = useState(null);
    const [hat, setHat] = useState(null);
    const [pants, setPants] = useState(null);
    const [dataState, setDataState] = useState(data);

    const removeActiveFirst = (list) =>{
        if(list.length >= 2){
            const objectActive = list.find(ac => ac.active);
            delete objectActive.active;
        }
    };

    const setActiveBtnTop = (obj)=>{
        const cloneData = [...dataState];
        const indexNameFolder = cloneData.indexOf(obj);
        cloneData.forEach(ac => (ac.active = false));
        cloneData[indexNameFolder].active = true;
        cloneData[indexNameFolder].items[0].active = true;
        const listActive = cloneData[indexNameFolder].items.filter(ac => (ac.active === true));
        removeActiveFirst(listActive);
        setDataState(cloneData);
    };

    const setActiveBtnMiddle = (obj, objStyle) =>{
        const cloneData = [...dataState];
        const indexNameFolder = cloneData.indexOf(obj);
        const indexNameFile = cloneData[indexNameFolder].items.indexOf(objStyle);
        cloneData[indexNameFolder].items.forEach((ac) => (ac.active = false));
        cloneData[indexNameFolder].items[indexNameFile].active = true;

        cloneData[indexNameFolder].items[indexNameFile].listImageColor.forEach((ac) => (ac.active = false));
        cloneData[indexNameFolder].items[indexNameFile].listImageColor[0].active = true;

        const listActive = cloneData[indexNameFolder].items[indexNameFile].listImageColor.filter((ac) => ac.active === true);

        removeActiveFirst(listActive)
        setDataState(cloneData);

    };

    const setActiveBtnBottom = (obj, objStyle, objStyleBg) =>{
        const cloneData = [...dataState];
        const indexNameFolder = cloneData.indexOf(obj);
        const indexNameFile = cloneData[indexNameFolder].items.indexOf(objStyle);
        const indexNameFileBg = cloneData[indexNameFolder].items[indexNameFile]?.listImageColor.indexOf(objStyleBg);
        cloneData[indexNameFolder].items[indexNameFile].listImageColor.forEach(ac => (ac.active = false));

        cloneData[indexNameFolder].items[indexNameFile].listImageColor[indexNameFileBg].active = true;
        setDataState(cloneData);
    };

    const changeImage = (obj, objStyle) =>{
        const { nameFolder } = obj;
        const {nameFile } = objStyle;
        importImage(nameFolder, nameFile, (image)=>{
            switch(nameFolder){
                case "tops":
                    setTops(image);
                    break;
                case "outer":
                    setOuter(image);
                    break;
                case "shoe":
                    setShoe(image);
                    break;
                case "pants":
                    setPants(image);
                    break;
                case "hat":
                    setHat(image);
                    break;
                case "glass":
                    setGlass(image);
                    break;
                default:
                    break;
            }
        })
    };

    const handleChooseTop = () =>{
        return dataState.map((obj)=>{
            return (
                <ButtonChoose active={obj.active} click={() => {setActiveBtnTop(obj)}} key={obj.name} name={obj.name} label={obj.nameFolder} />
            )
        })
    };

    const handleChooseMiddle =() =>{
        return dataState
        .filter((obj) => obj.active)
        .map((objIngredient) => {
            return objIngredient.items.map((ingredient) => {
                return (
                    <ButtonChoose
                        active={ingredient.active}
                        click={() => {
                            setActiveBtnMiddle(objIngredient, ingredient);
                            changeImage(objIngredient, ingredient.listImageColor[0]);
                        }}
                        key={ingredient.name}
                        name={ingredient.name}
                        label={ingredient.nameFolder}
                    />
                );
            });
        });
    };

    const handleChooseBottom = () =>{
        return dataState
        .filter((objIngredient) => objIngredient.active)
        .map((objIngredient) => {
            return objIngredient.items
                .filter((ingredient) => ingredient.active)
                .map((ingredient) => {
                    return ingredient.listImageColor?.map((item) => {
                        return (
                            item.name &&
                            <ButtonChoose
                                active={item.active}
                                click={() => {
                                    setActiveBtnBottom(objIngredient, ingredient, item);
                                    changeImage(objIngredient, item);
                                }}
                                key={item.name}
                                name={item.name}
                                label={item.nameFolder}
                            />
                        );
                    });
                });
        });
    };

    const downloadPng = () =>{
        toPng(document.getElementById("model__image-download")).then((dataUrl) => {
            download(dataUrl, "model.png");
        })
    };

    const random = () =>{
        return dataState.map((objIngredient) => {
            const randomItems = Math.floor(
                Math.random() * objIngredient.items?.length
            )
            return objIngredient.items
                .filter((ingredient) => ingredient.id === randomItems).map(ingredient => {
                    const resultRandom = Math.floor(
                        Math.random() * ingredient.listImageColor?.length
                    )
                    return ingredient.listImageColor.filter(item => item.id === resultRandom).map(item => changeImage(objIngredient, item))
                })
        });
    };

    const propsImageModel = {
        tops,
        outer,
        pants,
        hat,
        shoe,
        glass,
    };



    return (
        <div className={classes.model__content}>
            <div className={classes["model__content--left"]}>
                <div className={classes.model__image} id="model__image-download">
                    <ModelImage  propsImageModel={propsImageModel}/>
                </div>
            </div>
            <div className={classes["model__content--right"]}>
                <div className={classes.model__choose}>
                    <div className={classes["model__choose--top"]}>
                         <h3>Accessorize</h3>
                         <ul>{handleChooseTop()}</ul>
                    </div>
                    <div className={classes["model__choose--middle"]}>
                        <ul>
                            {handleChooseMiddle()}
                        </ul>
                    </div>
                    <div className={classes["model__choose--bottom"]}>
                        <ul>{handleChooseBottom()}</ul>
                    </div>
                    <div className={classes["model__list--btn"]}>
                       <h3>Action</h3>
                       <Button click = {() => random()}>
                         <span className={classes.model__icon}>
                            <i className="fas fa-random"></i>
                           </span>
                       </Button>
                       <Button click={() => downloadPng()}>
                          <span className={classes.model__icon}>
                              <i className="fas fa-download"></i>
                            </span>
                       </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
