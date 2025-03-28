const linksSaibaMais = document.querySelectorAll("menu__link"); //tirei o ponto

linksSaibaMais.forEach((link) => {
  link.addEventListener("pointerenter", () => {
    console.log(getComputedStyle(link).backgroundColor);
    link.style.position = "relative";
    link.style.overflow = "hidden";
    link.style.backgroundColor = "rgba(255, 255, 255, 1)"; // White hue
    link.style.transition = "clip-path 0.5s ease";
    // link.style.backgroundColor = "rgba(0,0,0,0)";//transparency effect
    // link.style.transition = "background-color 0.5s ease-out";
  });
});

linksSaibaMais.forEach((link) => {
  link.addEventListener("pointerout", () => {
    console.log(getComputedStyle(link).backgroundColor);
    link.style.clipPath = "inset(0 100% 0 0)"; // Reset to the initial state

    // link.style.backgroundColor = "rgba(257,257,257,1)";
    // link.style.transition = "background-color 0.5s ease-in";
  });
});

btnSizeDown.onclick = () => {
  const menuItemImgAll = document.querySelectorAll(".menu__item-img");
  menuItemImgAll.forEach((menuItemImg) => {
    const menuItemImgCss = getComputedStyle(menuItemImg);
    const menuItemImgCssWidth = menuItemImgCss.width; //aqui me retorna uma string com o px ou qqr un. medida
    const menuItemImgCssWidthNew = parseInt(menuItemImgCssWidth.split("p")[0]) - 50;
    menuItemImg.style.width = `${menuItemImgCssWidthNew}px`;
    console.log(menuItemImgCssWidthNew);
  });
};

btnSizeUp.onclick = () => {
  const menuItemImgAll = document.querySelectorAll(".menu__item-img");
  menuItemImgAll.forEach((menuItemImg) => {
    const menuItemImgCss = getComputedStyle(menuItemImg);
    const menuItemImgCssWidth = menuItemImgCss.width;
    const menuItemImgCssWidthNew = parseInt(menuItemImgCssWidth.split("p")[0]) + 50;
    menuItemImg.style.width = `${menuItemImgCssWidthNew}px`;
  });
};
