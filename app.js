const heroSection = document.querySelector(".heroSection");
const imgDiv = document.querySelectorAll(".heroSection > div");

let counter = 0;

imgDiv.forEach((elem, index) => {
  elem.style.left = `${index * 100}%`;
});

const slider = () => {
  imgDiv.forEach((elem) => {
    elem.style.transform = `translateX(${counter * 100}%)`;
  });
};

setInterval(() => {
  counter--;
  counter < -3 ? (counter = 0) : counter;
  slider();
}, 5000);
//
//
//
//
//

const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const section4 = document.querySelector(".section4");
const footer = document.querySelector("footer");

let search;
function optionData() {
  return (options = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/auto-complete",
    params: { q: search },
    headers: {
      "X-RapidAPI-Key": "0b49101d79mshab8379fd6a0761cp1f25ffjsna37478f04c2d",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  });
}

async function apiData() {
  const options = optionData();
  try {
    const response = await axios.request(options);
    return (returnData = response.data.d);
  } catch (error) {
    console.error(error);
  }
}

// Creating Dynamic Elements and set their data
async function sectionData(section) {
  let returnData = await apiData();

  // Creating h2 div
  let H2 = document.createElement("h2");
  H2.append(search);
  section.appendChild(H2);

  // Creating Container div
  let containerDiv = document.createElement("div");
  containerDiv.classList.add(`containerDiv`);
  section.appendChild(containerDiv);

  returnData.forEach((elem, index) => {
    // Creating div
    let div = document.createElement("div");
    div.classList.add(`imgDiv`);
    containerDiv.appendChild(div);

    // Creating Hover Div
    let hoverDiv = document.createElement("div");
    hoverDiv.classList.add("hoverDiv");

    //   Hover div html data
    let hoverDivHtml = `
        <div>
          <h2>Movie Name</h2>
          <span>${elem.l}</span>
        </div>
        <div>
          <h2>Type</h2>
          <span>${elem.qid}</span>
        </div>
        <div>
          <h2>Year</h2>
          <span>${elem.y}</span>
        </div>
      </div>`;

    hoverDiv.insertAdjacentHTML("afterbegin", hoverDivHtml);

    // Creating image
    let image = document.createElement("img");
    image.classList.add("image");
    try {
      image.setAttribute("src", elem.i.imageUrl);
    } catch (err) {
      console.log(err);
    }

    // Image, HoverDiv ko div ka child bana diya
    div.appendChild(image);
    div.appendChild(hoverDiv);
  });
}

async function SectionCall() {
  search = "Shinchan";
  await sectionData(section1);
  section1.style.padding = "4rem 0rem";
  footer.style.display = "flex";

  search = "Pokemon";
  await sectionData(section2);
  section2.style.padding = "4rem 0rem";

  search = "Avengers";
  await sectionData(section3);
  section3.style.padding = "4rem 0rem";

  search = "Batman";
  await sectionData(section4);
  section4.style.padding = "4rem 0rem";
}

SectionCall();

// Search

let input = document.querySelector("input");
const searchButton = document.querySelector(".fa-solid");
const header = document.querySelector("header");
const sections = document.querySelectorAll("section");
const body = document.querySelector("body");

searchButton.addEventListener("click", () => {
  let inputVal = input.value;
  if (inputVal.length != 0) {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/auto-complete",
      params: { q: inputVal },
      headers: {
        "X-RapidAPI-Key": "0b49101d79mshab8379fd6a0761cp1f25ffjsna37478f04c2d",
        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
      },
    };

    async function searchData() {
      try {
        const response = await axios.request(options);
        let data = response.data.d;
        for (const section of sections) {
          section.style.display = "none";
        }
        heroSection.style.display = "none";
        let div = document.createElement("div");
        div.classList.add("searchDiv");
        header.insertAdjacentElement("afterend", div);
        let closeButton = document.createElement("Button");
        closeButton.classList.add("closeButton");
        closeButton.append("Close");
        div.appendChild(closeButton);

        closeButton.addEventListener("click", () => {
          for (const section of sections) {
            section.style.display = "flex";
          }
          heroSection.style.display = "flex";
          div.style.display = "none";
        });

        // data.forEach((elem) => {
        //   console.log(elem);
        // })

        async function SectionCall() {
          search = inputVal;
          await sectionData(div);
          div.style.padding = "4rem 0rem";
        }
        SectionCall();
      } catch (error) {
        console.error(error);
      }
    }
    searchData();
  } else {
    return;
  }
});
