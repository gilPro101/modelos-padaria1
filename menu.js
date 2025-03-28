// const js = require("@eslint/js");

const btnLights = document.getElementById("btn-lights");
const btnSizeUp = document.getElementById("btn-sizeup");
const btnSizeDown = document.getElementById("btn-sizedown");
const menuItems = document.querySelectorAll(".menu__item"); //it returns a NodeList not an array então os array.prototype methods não funcionam nele
const menuInput = document.getElementById("menu-input");
const cssRoot = document.documentElement;
const displayWindow = document.querySelector(".display__window-screen");
const btnMenuFloat = document.getElementById("btn-menu-float");
const navFloat = document.querySelector(".header__nav-float");

btnMenuFloat.addEventListener("mouseenter", () => {
  navFloat.classList.toggle("hidden");
});

btnMenuFloat.addEventListener("touchstart", () => {
  navFloat.classList.toggle("hidden");
});

btnLights.onclick = () => {
  const fontColor = getComputedStyle(cssRoot).getPropertyValue("--fonte-cor").trim();
  console.log(fontColor);
  const novaCor = fontColor === "#242222" ? "#f7f7f7" : "#242222";
  cssRoot.style.setProperty("--fonte-cor", novaCor);

  const mainCss = document.querySelector("main");
  const mainCssBackground = getComputedStyle(mainCss);
  const mainCssBackgroundImg = mainCssBackground.backgroundImage;
  const newBackgroundImg = mainCssBackgroundImg.includes("Bakery_pattern_light.jpg")
    ? "url('img/Bakery_pattern_dark4.jpg')"
    : 'url("img/Bakery_pattern_light.jpg")';

  mainCss.style.backgroundImage = newBackgroundImg; //quando não é uma variável
  // cssRoot(document.documentElement) tem que alterar desta forma
  displayWindow.style.backgroundColor =
    getComputedStyle(displayWindow).backgroundColor === "rgb(247, 247, 247)"
      ? "#242222"
      : "#f7f7f7";

  const btnMenuFloatSVG = btnMenuFloat.querySelector("#rect16");
  const newFill = btnMenuFloatSVG.style.fill === "rgb(255, 178, 44)" ? "#242222" : "#ffb22c";
  btnMenuFloatSVG.style.fill = newFill;
};

btnSizeDown.onclick = () => {
  const currentSize = parseInt(getComputedStyle(cssRoot).getPropertyValue("--img-size"));
  const newSize = Math.max(currentSize - 50, 50);
  cssRoot.style.setProperty("--img-size", `${newSize}px`);
  const currentSizeP = parseInt(getComputedStyle(cssRoot).getPropertyValue("--fonte-tamanho"));
  const newSizeP = Math.max(currentSizeP - 5, 5);
  cssRoot.style.setProperty("--fonte-tamanho", `${newSizeP}px`);
};

btnSizeUp.onclick = () => {
  const currentSize = parseInt(getComputedStyle(cssRoot).getPropertyValue("--img-size"));
  const newSize = Math.min(currentSize + 50, 500);
  cssRoot.style.setProperty("--img-size", `${newSize}px`);
  const currentSizeP = parseInt(getComputedStyle(cssRoot).getPropertyValue("--fonte-tamanho"));
  const newSizeP = Math.min(currentSizeP + 5, 35);
  cssRoot.style.setProperty("--fonte-tamanho", `${newSizeP}px`);
};

const displayDiv = document.querySelector(".display");

displayDiv.onclick = () => {
  displayDiv.style.display = "none";
};

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const itemDiv = event.target.parentElement;
    const itemImg = itemDiv.querySelector("img").src;
    const itemName = itemDiv.querySelector(".menu__item-name").textContent;
    const itemDescription = itemDiv.querySelector(".menu__item-description").textContent;
    const displayImg = document.querySelector(".screen__img");
    const displayName = document.querySelector(".screen__name");
    const displayDescription = document.querySelector(".screen__description");
    displayDiv.style.display = "flex";
    displayImg.src = itemImg;
    displayName.textContent = itemName;
    displayDescription.textContent = itemDescription;
  });
});

menuInput.addEventListener("input", () => {
  const searchValue = menuInput.value.toLowerCase();
  getMenuByInput(searchValue);
  menuItems.forEach((item) => {
    const itemName = item.querySelector(".menu__item-name").textContent.toLocaleLowerCase();
    // const itemDescription = item.querySelector(".menu__item-description").textContent.toLocaleLowerCase(); //Pode dar confusão se eu colocar a description como parâmetro de busca também
    if (itemName.includes(searchValue) /*|| itemDescription.includes(searchValue)*/) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

function getMenuByInput(term) {
  const allItems = Array.from(menuItems);
  const filteredItems = allItems.filter((item) => {
    return (
      item
        .querySelector(".menu__item-name")
        .textContent.toLowerCase()
        .includes(term.toLowerCase()) ||
      item
        .querySelector(".menu__item-description")
        .textContent.toLowerCase()
        .includes(term.toLowerCase())
    );
  });
  console.log(filteredItems);
  return filteredItems;
}
