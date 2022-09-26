const dataFromFetch = JSON.parse(localStorage.getItem("fetchData") || "[]");
const data = JSON.parse(localStorage.getItem("favorites") || "[]");
favoritesLabels = [];
favorites = [];
mealPlan = [];

removeCards();
retrieveFavoritesFromLocalStorage();
retrieveMealPlanLocalStorage();

data.forEach((recipe) => {
  renderRecipeCards(recipe);
});

function removeCards() {
  const cardList = document.querySelector(".recipe-list");
  while (cardList.lastElementChild) {
    cardList.removeChild(cardList.lastElementChild);
  }
}

function renderRecipeCards(data) {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList = "card";

  const leftSideWrapper = document.createElement("div");
  leftSideWrapper.classList = "card__left";

  const imageWrapper = document.createElement("div");
  const image = document.createElement("img");
  image.src = data.recipe.images.REGULAR.url;
  imageWrapper.appendChild(image);

  const titleWrapper = document.createElement("div");
  titleWrapper.classList = "card-label";
  const title = document.createElement("h2");
  title.textContent = data.recipe.label;
  titleWrapper.appendChild(title);

  const starBtn = document.createElement("button");
  starBtn.addEventListener("click", addToFavorite);
  starBtn.classList = "favorite-btn";
  const starIcon = document.createElement("i");
  if (favoritesLabels.includes(data.recipe.label)) {
    starIcon.className = "fa-solid fa-star";
  } else starIcon.className = "fa-regular fa-star";
  starBtn.appendChild(starIcon);
  titleWrapper.appendChild(starBtn);

  const recipeInfoWrapper = document.createElement("div");
  recipeInfoWrapper.classList = "recipe-info";

  const cuisineTypeDiv = document.createElement("div");
  cuisineTypeDiv.classList = "recipe-info__cuisine-type";
  const cuisineTypeLogo = document.createElement("i");
  cuisineTypeLogo.classList = "fa-solid fa-utensils";
  const cuisineTypeText = document.createElement("p");
  cuisineTypeText.textContent = data.recipe.cuisineType[0];
  cuisineTypeDiv.appendChild(cuisineTypeLogo);
  cuisineTypeDiv.appendChild(cuisineTypeText);
  recipeInfoWrapper.appendChild(cuisineTypeDiv);

  const yieldDiv = document.createElement("div");
  yieldDiv.classList = "recipe-info__yield";
  const yieldLogo = document.createElement("i");
  yieldLogo.classList = "fa-solid fa-person";
  const yieldText = document.createElement("p");
  yieldText.classList = "recipe-info__yield-number";
  yieldText.textContent = data.recipe.yield;

  yieldDiv.appendChild(yieldLogo);
  yieldDiv.appendChild(yieldText);
  recipeInfoWrapper.appendChild(yieldDiv);

  if (data.recipe.totalTime !== 0) {
    const timeDiv = document.createElement("div");
    timeDiv.classList = "recipe-info__total-time";
    const timeLogo = document.createElement("i");
    timeLogo.classList = "fa-regular fa-clock";
    const timeText = document.createElement("p");
    const totalTime = data.recipe.totalTime;
    timeText.textContent = `${totalTime} min`;
    timeDiv.appendChild(timeLogo);
    timeDiv.appendChild(timeText);
    recipeInfoWrapper.appendChild(timeDiv);
  }

  const dietPlanDescriptionDiv = document.createElement("div");
  const dietPlanDescription = document.createElement("p");
  dietPlanDescription.className = "diet-plan__description";
  dietPlanDescription.textContent =
    "Create your own meal plan! Select desire date and click add! You can view your meal plan in meal plan category";
  dietPlanDescriptionDiv.appendChild(dietPlanDescription);
  const dietPlanWrapper = document.createElement("div");
  dietPlanWrapper.className = "diet-plan";
  const dateInputDiv = document.createElement("div");
  const dateInput = document.createElement("input");
  dateInput.className = "diet-plan__date-input";
  dateInput.setAttribute("type", "date");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  dateInput.setAttribute("value", today);
  dateInput.setAttribute("min", today);
  dateInput.setAttribute("name", "set-recipe-date");
  dateInputDiv.appendChild(dateInput);

  const submitBtnDiv = document.createElement("div");
  const submitBtn = document.createElement("button");
  submitBtn.className = "diet-plan__submit-btn";
  submitBtn.textContent = "Add to Meal Plan";
  submitBtnDiv.appendChild(submitBtn);

  dietPlanWrapper.appendChild(dietPlanDescriptionDiv);
  dietPlanWrapper.appendChild(dateInputDiv);
  dietPlanWrapper.appendChild(submitBtnDiv);

  leftSideWrapper.appendChild(imageWrapper);
  leftSideWrapper.appendChild(titleWrapper);
  leftSideWrapper.appendChild(recipeInfoWrapper);
  leftSideWrapper.appendChild(dietPlanWrapper);

  const rightSideWrapper = document.createElement("div");
  rightSideWrapper.classList = "card__right";

  const nutritionWrapper = document.createElement("div");
  const nutritionTitle = document.createElement("h3");
  nutritionTitle.textContent = "Nutrition";
  nutritionWrapper.appendChild(nutritionTitle);

  const nutritionList = document.createElement("div");
  nutritionList.classList = "nutrition-list";

  const caloriesPerServingWrapper = document.createElement("div");
  caloriesPerServingWrapper.classList = "nutrition-list__calories";
  const calories = document.createElement("p");
  calories.classList = "nutrition-list__calories-serving";
  calories.textContent = Math.floor(data.recipe.calories / data.recipe.yield);
  const caloriesTitle = document.createElement("p");
  caloriesTitle.textContent = "CALORIES / SERVING";
  caloriesPerServingWrapper.appendChild(calories);
  caloriesPerServingWrapper.appendChild(caloriesTitle);
  nutritionList.appendChild(caloriesPerServingWrapper);
  nutritionWrapper.appendChild(nutritionList);

  const dailyValueWrapper = document.createElement("div");
  dailyValueWrapper.classList = "nutrition-list__daily-value";
  const dailyValue = document.createElement("p");
  dailyValue.textContent = `${Math.floor(
    ((data.recipe.calories / data.recipe.yield) * 100) / 2000
  )} %`;
  dailyValue.classList = "nutrition-list__daily-value-number";
  const dailyValueTitle = document.createElement("p");
  dailyValueTitle.textContent = "DAILY VALUE";
  dailyValueWrapper.appendChild(dailyValue);
  dailyValueWrapper.appendChild(dailyValueTitle);
  nutritionList.appendChild(dailyValueWrapper);

  const servingsWrapper = document.createElement("div");
  servingsWrapper.classList = "nutrition-list__servings";
  const servingsInput = document.createElement("input");
  servingsInput.setAttribute("type", "number");
  servingsInput.setAttribute("min", "1");
  servingsInput.setAttribute("max", "18");
  servingsInput.value = data.recipe.yield;
  servingsInput.classList = "nutrition-list__servings-input";
  servingsInput.addEventListener("change", recalculateNutritions);
  const servingsTitle = document.createElement("p");
  servingsTitle.textContent = "SERVINGS";
  servingsWrapper.appendChild(servingsInput);
  servingsWrapper.appendChild(servingsTitle);
  nutritionList.appendChild(servingsWrapper);

  const ingredientsWrapper = document.createElement("div");
  ingredientsWrapper.classList = "ingredients";

  const ingredientsTitleWrapper = document.createElement("div");

  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = `${data.recipe.ingredients.length} Ingredients`;
  ingredientsTitleWrapper.appendChild(ingredientsTitle);
  ingredientsWrapper.appendChild(ingredientsTitleWrapper);
  const ingredientList = document.createElement("ul");

  data.recipe.ingredientLines.forEach((line) => {
    const singleLine = document.createElement("li");
    singleLine.classList = "ingredients__single-line";
    singleLine.textContent = line;
    ingredientList.appendChild(singleLine);
  });

  ingredientsTitleWrapper.appendChild(ingredientList);

  const preperationWrapper = document.createElement("div");

  const preperationTitleWrapper = document.createElement("div");
  const preperationTitle = document.createElement("p");
  preperationTitle.textContent = "Preperation";
  preperationTitle.appendChild(preperationTitleWrapper);
  preperationWrapper.appendChild(preperationTitleWrapper);

  const preperationInstructionsWrapper = document.createElement("div");
  const preperationInstructionsTitleWrapper = document.createElement("div");
  const preperationInstructionsTitle = document.createElement("h3");
  preperationInstructionsTitle.textContent = "Preparation";
  preperationInstructionsTitleWrapper.appendChild(preperationInstructionsTitle);
  preperationInstructionsWrapper.appendChild(
    preperationInstructionsTitleWrapper
  );
  const preperationBtn = document.createElement("a");
  preperationBtn.textContent = "Instructions";
  preperationBtn.setAttribute("href", data.recipe.url);
  preperationBtn.setAttribute("target", "_blank");

  preperationInstructionsWrapper.appendChild(preperationBtn);
  preperationWrapper.appendChild(preperationInstructionsWrapper);

  rightSideWrapper.appendChild(nutritionWrapper);
  rightSideWrapper.appendChild(ingredientsWrapper);
  rightSideWrapper.appendChild(preperationWrapper);

  cardWrapper.appendChild(leftSideWrapper);
  cardWrapper.appendChild(rightSideWrapper);

  document.querySelector(".recipe-list").appendChild(cardWrapper);
}

function recalculateNutritions(e) {
  const cardList = document.querySelectorAll(
    ".nutrition-list__calories-serving"
  );

  const thisCard = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__calories-serving"
  );

  const thisCardInput = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__servings-input"
  );

  const thisCardCalories = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__calories-serving"
  );

  const thisCardDailyValue = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__daily-value-number"
  );

  cardList.forEach((card, i) => {
    if (card === thisCard) {
      const totalCalories = dataFromFetch.hits[i].recipe.calories;
      const caloriesPerServing = Math.floor(
        totalCalories / thisCardInput.value
      );
      thisCardCalories.textContent = caloriesPerServing;
      thisCardDailyValue.textContent = `${Math.floor(
        (caloriesPerServing * 100) / 2000
      )} %`;
    }
  });
}

function recalculateNutritions(e) {
  const cardList = document.querySelectorAll(
    ".nutrition-list__calories-serving"
  );

  const thisCard = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__calories-serving"
  );

  const thisCardInput = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__servings-input"
  );

  const thisCardCalories = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__calories-serving"
  );

  const thisCardDailyValue = e.target.parentNode.parentNode.querySelector(
    ".nutrition-list__daily-value-number"
  );

  cardList.forEach((card, i) => {
    if (card === thisCard) {
      const totalCalories = data.hits[i].recipe.calories;
      const caloriesPerServing = Math.floor(
        totalCalories / thisCardInput.value
      );
      thisCardCalories.textContent = caloriesPerServing;
      thisCardDailyValue.textContent = `${Math.floor(
        (caloriesPerServing * 100) / 2000
      )} %`;
    }
  });
}

function updateFavoritesLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function retrieveFavoritesFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("favorites") || "[]");
  favoritesLabels = data.map((item) => item.recipe.label);
  favorites = data;
}

function addToFavorite(e) {
  const thisBtn = e.target.parentNode;
  document.querySelectorAll(".favorite-btn").forEach((btn, i) => {
    if (thisBtn === btn) {
      if (thisBtn.firstChild.className === "fa-regular fa-star") {
        thisBtn.firstChild.className = "fa-solid fa-star";
        favorites.push(data.hits[i]);
        updateFavoritesLocalStorage();
        retrieveFavoritesFromLocalStorage();
      } else {
        const obj = favorites.find(
          (item) => item.recipe.label === dataFromFetch.hits[i].recipe.label
        );
        thisBtn.firstChild.className = "fa-regular fa-star";
        favorites.splice(i, 1);
        document.querySelectorAll(".card")[i].remove();
        updateFavoritesLocalStorage();
        retrieveFavoritesFromLocalStorage();
      }
    }
  });
}

function redirectToInstructions(redirectLink) {
  console.log(redirectLink);
  window.open(redirectLink, "_blank");
}

function retrieveMealPlanLocalStorage() {
  const data = JSON.parse(localStorage.getItem("mealPlan") || "[]");
  mealPlan = data;
}

// ADD To Meal Plan Functionallity

function updateMealPlanLocalStorage() {
  localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
}

const dateInputs = document.querySelectorAll(".diet-plan__date-input");
const submitBtns = document.querySelectorAll(".diet-plan__submit-btn");

submitBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const cardLabel =
      btn.parentNode.parentNode.parentNode.querySelector(".card-label")
        .firstChild.textContent;
    const obj = { date: dateInputs[i].value, ...favorites[i] };
    const isAdded = mealPlan.find((item) => item.recipe.label === cardLabel);
    const isSameDate = mealPlan.find(
      (item) => item.date === dateInputs[i].value
    );
    if (!isAdded) {
      mealPlan.push(obj);
      updateMealPlanLocalStorage();
    } else if (isAdded && !isSameDate) {
      mealPlan.push(obj);
      updateMealPlanLocalStorage();
    }
  });
});
