export const importImage = (nameFolder, nameFile, checkNameFolder) => {
    import(`../assets/img/${nameFolder}/${nameFile}.png`)
        .then((image) => {
            checkNameFolder(image.default);

        }).catch((_) => {
            checkNameFolder("")
        })
}