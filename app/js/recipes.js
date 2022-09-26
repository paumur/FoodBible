const app_id = "";
const app_key = "";

const allergies = [
  {
    name: "Celery-Free",
    toolTip: "Does not contain celery or derivatives",
  },
  {
    name: "Crustacean-Free",
    toolTip:
      "Does not contain crustaceans (shrimp, lobster etc.) or derivatives",
  },
  { name: "Dairy-Free", toolTip: "No dairy. No lactose" },
  { name: "Egg-Free", toolTip: "No eggs or products containing eggs" },
  { name: "Fish-Free", toolTip: "No fish or fish derivatives" },
  { name: "Gluten-Free", toolTip: "No ingredients containing gluten" },
  { name: "Lupine-Free", toolTip: "Does not contain lupine or derivatives" },
  { name: "Mustard-Free", toolTip: "Does not contain mustard or derivatives" },
  { name: "Peanut-Free", toolTip: "No peanuts or products containing peanuts" },
  {
    name: "Sesame-Free",
    toolTip: "Does not contain sesame seed or derivatives",
  },
  {
    name: "Shellfish-Free",
    toolTip: "No shellfish or shellfish derivatives",
  },
  { name: "Soy-Free", toolTip: "No soy or products containing soy" },
  {
    name: "Tree-Nut-Free",
    toolTip: "No tree nuts or products containing tree nuts",
  },
  { name: "Wheat-Free", toolTip: "No wheat, can have gluten though" },
];

const diets = [
  { name: "Alcohol-Free", toolTip: "No alcohol used or contained" },
  { name: "Balanced", toolTip: "Protein/Fat/Carb values in 15/35/50 ratio" },
  { name: "High-Fiber", toolTip: "More than 5g fiber per serving" },
  {
    name: "High-Protein",
    toolTip: "More than 50% of total calories from proteins",
  },
  {
    name: "Keto-Friendly",
    toolTip: "Maximum 7 grams of net carbs per serving",
  },
  {
    name: "Kidney-Friendly",
    toolTip:
      "Per serving – phosphorus less than 250 mg and potassium less than 500 mg and sodium: less than 500 mg",
  },
  {
    name: "Kosher",
    toolTip: "Contains only ingredients allowed by the kosher diet.",
  },
  { name: "Low-Carb", toolTip: "Less than 20% of total calories from carbs" },
  { name: "Low-Fat", toolTip: "Less than 15% of total calories from fat" },
  { name: "Low-Potassium", toolTip: "Less than 150mg per serving" },
  { name: "Low-Sodium", toolTip: "Less than 140mg Na per serving" },
  {
    name: "No-Oil-Added",
    toolTip:
      "No oil added except to what is contained in the basic ingredients",
  },
  {
    name: "Low-Sugar",
    toolTip:
      "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
  },
  {
    name: "Paleo",
    toolTip:
      "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
  },
  {
    name: "Pescatarian",
    toolTip:
      "Does not contain meat or meat based products, can contain dairy and fish",
  },
  { name: "Pork-Free", toolTip: "Does not contain pork or derivatives" },
  {
    name: "Red-Meat-Free",
    toolTip:
      "Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.",
  },
  { name: "Sugar-Conscious", toolTip: "Less than 4g of sugar per serving" },
  { name: "Vegan", toolTip: "No meat, poultry, fish, dairy, eggs or honey" },
  { name: "Vegetarian", toolTip: "No meat, poultry, or fish" },
];

const mealType = [
  {
    name: "Breakfast",
    toolTip:
      "It replenishes your supply of glucose to boost your energy levels, alertness, while also providing other essential nutrients.",
  },
  {
    name: "Snack",
    toolTip:
      "Provides a boost of energy if several hours pass between meals and blood glucose levels drop. Helps curb your appetite to prevent overeating at the next meal.",
  },
  {
    name: "Lunch",
    toolTip:
      "Eating lunch raises your blood sugar level in the middle of the day, which gives you the energy you need for the rest of the day.",
  },
  {
    name: "Dinner",
    toolTip:
      "Healthy dinner is linked to good sleep, good choices at breakfast and lunch, lower inflammation, greater resilience to stress, better digestion, stable blood sugar and lower anxiety.",
  },
];

function renderFilterPill(keywords) {
  keywords.forEach((element) => {
    const root = document.querySelector(".recipe-search__filters");
    const filterWrapper = document.createElement("div");
    filterWrapper.className = "recipe-search__filter";

    const iconDiv = document.createElement("div");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-plus";
    iconDiv.appendChild(icon);

    const pillBtn = document.createElement("button");
    const pillName = document.createElement("p");
    pillName.textContent = element.name;
    pillBtn.appendChild(pillName);

    const contextMenu = document.createElement("div");
    contextMenu.className = "recipe-search__context-menu";
    const contextText = document.createElement("p");
    contextText.textContent = element.toolTip;
    contextMenu.appendChild(contextText);

    filterWrapper.appendChild(contextMenu);
    filterWrapper.appendChild(iconDiv);
    filterWrapper.appendChild(pillBtn);
    root.appendChild(filterWrapper);
    if (checkedPills.includes(element.name)) {
      const currentTarget = Array.from(
        document.querySelectorAll(".recipe-search__filter")
      ).find((el) => el.textContent.includes(element.name));
      currentTarget.classList.add("recipe-search__filter--toggled");
    }
  });
}

function renderFilterPillNutrientsTab(keywords) {
  keywords.forEach((element) => {
    const root = document.querySelector(".recipe-search__filters");
    const filterWrapper = document.createElement("div");
    filterWrapper.className = "recipe-search__filter dropdown";

    const iconDiv = document.createElement("div");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-plus";
    iconDiv.appendChild(icon);

    const pillBtn = document.createElement("button");
    const pillName = document.createElement("p");
    pillName.textContent = element.name;
    pillBtn.appendChild(pillName);

    const contextMenu = document.createElement("div");
    contextMenu.className = "dropdown-content";
    const contextText = document.createElement("p");
    contextText.textContent = element.toolTip;
    contextMenu.appendChild(contextText);

    filterWrapper.appendChild(contextMenu);
    filterWrapper.appendChild(iconDiv);
    filterWrapper.appendChild(pillBtn);
    root.appendChild(filterWrapper);
    if (checkedPills.includes(element.name)) {
      const currentTarget = Array.from(
        document.querySelectorAll(".recipe-search__filter")
      ).find((el) => el.textContent.includes(element.name));
      currentTarget.classList.add("recipe-search__filter--toggled");
    }
  });
}

function renderCaloriesTab() {
  const root = document.querySelector(".recipe-search__filters");
  const filterWrapper = document.createElement("div");
  filterWrapper.className = "calories-tab";
  const text = document.createElement("p");
  text.className = "calories-tab__text";
  text.textContent =
    "Input maximum desired calories per serving. For food database results default serving is 100g.";
  filterWrapper.appendChild(text);
  const inputDiv = document.createElement("div");
  inputDiv.className = "calories-tab__input-div";
  const input = document.createElement("input");
  input.classList = "calories-input";
  const span = document.createElement("span");
  span.textContent = "kcal";
  const iconDiv = document.createElement("div");
  iconDiv.classList = "calories-input-btn";
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-plus";
  iconDiv.appendChild(icon);
  inputDiv.appendChild(input);
  inputDiv.appendChild(span);
  inputDiv.appendChild(iconDiv);
  filterWrapper.appendChild(inputDiv);
  root.appendChild(filterWrapper);
}

function renderMealTypeTab() {
  renderFilterPill(mealType);
}

function removeFilterPills() {
  const oldFilter = document.querySelectorAll(".recipe-search__filter");
  const nutrientTabTitles = document.querySelectorAll(".nutrients-title");
  oldFilter.forEach((filter) => filter.remove());
  if (document.querySelector(".calories-tab")) {
    document.querySelector(".calories-tab").remove();
  }
  if (nutrientTabTitles) {
    nutrientTabTitles.forEach((title) => title.remove());
  }
}

// Tab rendering

const filters = document.querySelectorAll(".recipe-search__method");

filters.forEach((filter) => {
  filter.addEventListener("click", (filter) => {
    removeFilterPills();
    if (document.querySelector(".recipe-search__method--selected")) {
      document
        .querySelector(".recipe-search__method--selected")
        .classList.remove("recipe-search__method--selected");
    }
    filter.target.classList.add("recipe-search__method--selected");
    switch (filter.target.textContent) {
      case "Allergies":
        renderFilterPill(allergies);
        togglePills();
        renderSelectedPill(checkedPills);
        break;
      case "Diets":
        renderFilterPill(diets);
        togglePills();
        renderSelectedPill(checkedPills);
        break;
      case "Calories":
        renderCaloriesTab();
        renderSelectedPill(checkedPills);
        addMaxCalories();
        break;
      case "Meal Type":
        renderMealTypeTab();
        togglePills();
        renderSelectedPill(checkedPills);
        break;
    }
  });
});

// Toggle Filter Pills

let checkedPills = [];

function togglePills() {
  const filterPills = document.querySelectorAll(".recipe-search__filter");
  filterPills.forEach((pill) =>
    pill.addEventListener("click", (pill) => {
      if (checkedPills.includes(pill.currentTarget.lastChild.textContent)) {
        checkedPills = checkedPills.filter(
          (item) => item !== pill.currentTarget.lastChild.textContent
        );
        pill.currentTarget.classList.remove("recipe-search__filter--toggled");
        renderSelectedPill(checkedPills);
      } else {
        checkedPills.push(pill.currentTarget.lastChild.textContent);
        renderSelectedPill(checkedPills);
        pill.currentTarget.classList.add("recipe-search__filter--toggled");
      }
    })
  );
}

// Add Toggled Pills to Selected filters list

function renderSelectedPill(keywords) {
  const Selectedfilter = document.querySelectorAll(
    ".recipe-search__selected-filters > div"
  );
  Selectedfilter.forEach((item) => item.remove());
  keywords.forEach((element) => {
    const root = document.querySelector(".recipe-search__selected-filters");
    const filterWrapper = document.createElement("div");
    filterWrapper.className = "recipe-search__filter";

    const iconDiv = document.createElement("div");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-plus";
    iconDiv.appendChild(icon);

    const pillBtn = document.createElement("button");
    const pillName = document.createElement("p");
    pillName.textContent = element;
    pillBtn.appendChild(pillName);

    filterWrapper.appendChild(iconDiv);
    filterWrapper.appendChild(pillBtn);
    root.prepend(filterWrapper);
    removeSelectedFilter();
  });
}

// Feature to remove Selected filter pills

function removeSelectedFilter() {
  document
    .querySelectorAll(
      ".recipe-search__selected-filters > .recipe-search__filter"
    )
    .forEach((element) =>
      element.addEventListener("click", (element) => {
        element.currentTarget.remove();
        if (checkedPills.includes(element.currentTarget.textContent)) {
          var index = checkedPills.indexOf(element.currentTarget.textContent);
          if (index !== -1) {
            checkedPills.splice(index, 1);
          }
          document
            .querySelectorAll(".recipe-search__filter--toggled")
            .forEach((item) => {
              if (
                item.lastChild.textContent === element.currentTarget.textContent
              ) {
                item.classList.remove("recipe-search__filter--toggled");
              }
            });
        }
      })
    );
}

// Add MAX DESIRE CALORIES TO SELECTED FILTERS LIST

let lastValue;

function addMaxCalories() {
  document
    .querySelector(".calories-input-btn")
    .addEventListener("click", () => {
      const input = document.querySelector(".calories-input");
      if (lastValue) {
        const index = checkedPills.indexOf(lastValue);
        checkedPills.splice(index, 1);
      }
      if (input.value) {
        lastValue = `Max Calories ${input.value} kcal`;
        checkedPills.push(lastValue);
        renderSelectedPill(checkedPills);
      }
    });
}

// Search for recipe Feature ------------------------------------------------------------------------

const searchButton = document.querySelector(".recipe-search__button");
const searchInput = document.querySelector('input[name="search-input"]');

let search;
let mealTypes = "";
let diet = "";
let health = "";
let calories = "";

searchInput.addEventListener("input", (e) => {
  search = e.target.value;
});

searchButton.addEventListener("click", () => {
  requestMealTypes(checkedPills);
  requestDiet(checkedPills);
  requestHealth(checkedPills);
  requestCalories(checkedPills);
  if (search) {
    requestRecipes();
  }
});

function requestRecipes() {
  fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${search}${mealTypes}${diet}${health}${calories}&app_id=${app_id}&app_key=${app_key}
`)
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("fetchData", JSON.stringify(response));
      window.location.assign("/recipe-result.html");
    })
    .catch((err) => console.error(err));
}

function requestMealTypes(arr) {
  const selectedMealTypes = arr
    .filter((val) => mealType.includes(val))
    .map((item) => {
      return `&mealType=${item}`;
    })
    .join("");
  return (mealTypes = selectedMealTypes);
}

function requestDiet(arr) {
  const dietList = [
    "Balanced",
    "High-Fiber",
    "High-Protein",
    "Low-Carb",
    "Low-Fat",
    "Low-Sodium",
  ];
  const selectedDiet = arr
    .filter((val) => dietList.includes(val))
    .map((item) => {
      return `&diet=${item.toLowerCase()}`;
    })
    .join("");
  return (diet = selectedDiet);
}

function requestHealth(arr) {
  const healthList = [
    "Alcohol-Coctail",
    "Alcohol-Free",
    "Celery-Free",
    "Crustacean-Free",
    "Dairy-Free",
    "Egg-Free",
    "Fish-Free",
    "Gluten-Free",
    "Keto-Friendly",
    "Kidney-Friendly",
    "Kosher",
    "Low-Potassium",
    "Low-Sugar",
    "Lupine-Free",
    "Mustard-Free",
    "No-Oil-Added",
    "Paleo",
    "Peanut-Free",
    "Pescatarian",
    "Pork-Free",
    "Red-Meat-Free",
    "Sesame-Free",
    "Shellfish-Free",
    "Soy-Free",
    "Sugar-Conscious",
    "Sufite-Free",
    "Tree-Nut-Free",
    "Vegan",
    "Vegetarian",
    "Wheat-Free",
  ];
  const selectedHealth = arr
    .filter((val) => healthList.includes(val))
    .map((item) => {
      return `&health=${item.toLowerCase()}`;
    })
    .join("");
  return (health = selectedHealth);
}

function requestCalories(arr) {
  const regexFind = /Max Calories \d* kcal/gm;
  const regexCaloriesNumber = /\d+/gm;
  const selectedCalories = arr.filter((val) => val.match(regexFind));
  if (selectedCalories.length) {
    const number = Number(selectedCalories[0].match(regexCaloriesNumber));
    calories = `&calories=${number}`;
  }
}
