const btnLights = document.getElementById("btn-lights");
const btnSizeUp = document.getElementById("btn-sizeup");
const btnSizeDown = document.getElementById("btn-sizedown");
const cssRoot = document.documentElement;
const photoParallax = document.querySelector(".footer__img");
const btnMenuFloat = document.getElementById("btn-menu-float");
const navFloat = document.querySelector(".header__nav-float");

btnMenuFloat.addEventListener("mouseenter", () => {
  navFloat.classList.toggle("hidden");
});

btnMenuFloat.addEventListener("touchstart", () => {
  navFloat.classList.toggle("hidden");
});

btnLights.onclick = () => {
  toggleCssVariable("--cor-primaria", "#854836", "#e0c097");
  toggleCssVariable("--cor-secundaria", "#ffb22c", "#b85c38");
  toggleCssVariable("--cor-terciaria", "#f93827", "#da5151");
  toggleCssVariable("--cor-base-claro", "#f7f7f7", "#242222");
  toggleCssVariable("--fonte-cor", "#242222", "#f7f7f7");

  toggleImgSrc(
    "#btn-lights img",
    "img/light_off_24dp_FFB22C.svg",
    "img/light_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
  );

  toggleImgSrc(
    "#btn-sizeup img",
    "img/text_increase_24dp_FFB22C.svg",
    "img/text_increase_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
  );

  toggleImgSrc(
    "#btn-sizedown img",
    "img/text_decrease_24dp_FFB22C.svg",
    "img/text_decrease_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
  );

  const btnMenuFloatSVG = btnMenuFloat.querySelector("#rect16");
  const newFill = btnMenuFloatSVG.style.fill === "rgb(255, 178, 44)" ? "#242222" : "#ffb22c";
  btnMenuFloatSVG.style.fill = newFill;
};

btnSizeDown.onclick = () => {
  const textSize = parseInt(getComputedStyle(cssRoot).getPropertyValue("--fonte-tamanho").trim());
  if (textSize <= 12) {
    alert("Mínimo tamanho de texto alcançado");
    return;
  }
  cssRoot.style.setProperty("--fonte-tamanho", `${textSize - 2}px`);
};

btnSizeUp.onclick = () => {
  const textSize = parseInt(getComputedStyle(cssRoot).getPropertyValue("--fonte-tamanho").trim());
  if (textSize >= 26) {
    alert("Máximo tamanho de texto alcançado");
    return;
  }
  cssRoot.style.setProperty("--fonte-tamanho", `${textSize + 2}px`);
};

function toggleCssVariable(variable, value1, value2) {
  const currentValue = getComputedStyle(cssRoot).getPropertyValue(variable).trim();
  cssRoot.style.setProperty(variable, currentValue === value1 ? value2 : value1);
}

function toggleImgSrc(imgSelector, src1, src2) {
  const img = document.querySelector(imgSelector);
  img.src.endsWith(src1) ? img.setAttribute("src", src2) : img.setAttribute("src", src1);
}
//-------------------------------------------------------------------------------------------->

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".menu__card");

  const observer = new IntersectionObserver(
    (entries) => {
      // console.log(entries);
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
        // Se eu quiser que só aconteça uma vez
        // if (entry.isIntersecting) {
        //   observer.unobserve(entry.target);
        // }
      });
    },
    {
      // root: null, ou se eu  não colocar nada o root é o viewport
      threshold: 0.5, //Os transforms estão em 100%. quanto mais eu aumento o threshold mais eu tenho que aumentar
      rootMargin: "0% 70%", //o rootMargin para que o observer possa ver o tamanho do threshold que eu escolher
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
  //-------------------------------------------------------------------------->
  let isPhotoVisible = false;

  //talvez se eu adicionar aqui o offset set to zero
  // isPhotoVisible.addEventListener("change", () => {});
  const observerParallaxEffect = new IntersectionObserver(
    (entries) => {
      //{const entry = entries[0]; // Access the first (and only) entry or
      entries.forEach((entry) => {
        isPhotoVisible = entry.isIntersecting; // Update visibility status
        console.log(isPhotoVisible);
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the photo is visible
    }
  );

  observerParallaxEffect.observe(photoParallax);

  window.addEventListener("scroll", () => {
    // console.log("scrollPosition  " + window.scrollY);
    // console.log("innerWidth  " + window.innerWidth);
    // if (isPhotoVisible) { No final das contas não faz diferença o IntersectionObserver nesse caso
    //na verdade faz se eu conseguir zerar o valor do scrollPosition assim que o isPhotoVisible=true...
    //  porque daí o ponto de partida vai ser um scrollPosition = 0 e não vou ter problemas com foto saindo da tela...
    //talvez um offset = scrollPosition*0.1-(scrollPosition*0.9)
    //eu posso colocar um if (offset>=200||offset<= -200){STOPu!!} ou o contrário só mudar o style if (offset<=200 && offset>=-200)) {GOw!!}

    const scrollPosition = window.scrollY;
    let offset;
    // let offsetZerado = 0;
    if (window.innerWidth >= 1024) {
      // For large screens
      offset = scrollPosition * 0.1;
    } else if (window.innerWidth >= 740) {
      // For medium screens
      offset = scrollPosition * 0.1 - 300;
    } else {
      // For small screens
      offset = scrollPosition * 0.1 - 285;
    }
    // console.log("offset:   " + offset);
    photoParallax.style.transform = `translateY(${-offset}px)`;
    // }else{offsetZerado = 0 }
  });
});
