const search_button = document.querySelector("#search_button");

search_button.addEventListener("click", () => {
    const food_name = document.querySelector("#food_name").value;
    document.querySelector("#food_item").innerHTML = "";
    document.querySelector("#food_info").innerHTML = "";

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
                <a href="#"  onclick="foodDetails('${id}')">
                    <img src="${thumbnail}" class="card-img-top" alt="${name}">
                </a>

                <div class="card-body">
                    <a href="#" onclick="foodDetails('${id}')">
                        <h3 class="card-title">${name}</h3>
                    </a>
                </div>
            </div>
        </div>`;
        });

        document.querySelector("#food_item").innerHTML = foodItemDiv;
    }
}

const foodDetails = foodId => {
    // fetch singe items using id
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(res => res.json())
        .then(food => {
            const food_info = document.querySelector("#food_info");
            const foodInfo = food.meals[0];
            const foodName = foodInfo.strMeal;

            food_info.innerHTML = `
                <div class="card">
                
                    <img src="${foodInfo.strMealThumb}" class="card-img-top" alt="${foodName}">
                    
                    <div class="card-body">
                        <h5 class="card-title">${foodName}</h5>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fas fa-check-square"></i>
                            ${foodInfo.strIngredient1}
                        </li>

                        <li class="list-group-item">
                            <i class="fas fa-check-square"></i>
                            ${foodInfo.strIngredient2}
                        </li>

                        <li class="list-group-item">
                            <i class="fas fa-check-square"></i>
                            ${foodInfo.strIngredient3}
                        </li>

                        <li class="list-group-item">
                            <i class="fas fa-check-square"></i>
                            ${foodInfo.strIngredient4}
                        </li>

                        <li class="list-group-item">
                            <i class="fas fa-check-square"></i>
                            ${foodInfo.strIngredient5}
                        </li>

                        <li class="list-group-item">
                            <i class="fas fa-check-square"></i>
                            ${foodInfo.strIngredient6}
                        </li>
                    </ul>
                </div>`;
        });
}