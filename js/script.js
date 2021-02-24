const search_button = document.querySelector("#search_button");

search_button.addEventListener("click", () => {
    const food_name = document.querySelector("#food_name").value;
    document.querySelector("#food_item").innerHTML = "";

    if (food_name === "") {
        alert("Input shouldn't be empty!");
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food_name}`)
            .then(response => response.json())
            .then(foods => allFoods(foods));
    }
});

const allFoods = foodsInfo => {
    let foodItems = foodsInfo.meals;
     
    if(foodItems === null) {
        alert("Sorry! No Food Items Found!");
    } else {
        let foodItemDiv = "";

        foodItems.forEach(food => {
            const id = food.idMeal;
            const name = food.strMeal;
            const thumbnail = food.strMealThumb;
            
            foodItemDiv += `<div class="col-3 mt-3">
            <div class="card h-100">
                <img src="${thumbnail}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h3 class="card-title">${name}</h3>
                </div>
            </div>
        </div>`;
        });

        document.querySelector("#food_item").innerHTML = foodItemDiv;
    }
}