import React, {useEffect, useState} from 'react';
import Ingredient from "./Ingredient";
import {axiosInstance} from "../../server";

export default function Ingredients({onCarbsUpdate}) {
  const [ingredients, setIngredients] = useState([]);
  const [newCarbs, setNewCarbs] = useState(0);
  const [newName, setNewName] = useState('');
  const [defaultPortionWeight, setDefaultPortionWeight] = useState(0);

  useEffect(fetchIngredients, [])

  return (
    <div className="Ingredients">
      <div className="Ingredient__create">
        <h4>Nouvel ingrédient</h4>
        <label htmlFor="">
          Nom :
          <input
            type="text"
            placeholder="Nom de l'ingrédient"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </label>
        <label htmlFor="">
          Calories pour 100g
          <input
            type="text"
            placeholder="Calories pour 100 g"
            value={newCarbs}
            onChange={(event) => setNewCarbs(event.target.value)}
          />
        </label>
        <label htmlFor="">
          Poids d'une portion
          <input
            type="text"
            placeholder="Poids d'une portion normale"
            value={defaultPortionWeight}
            onChange={(event) => setDefaultPortionWeight(event.target.value)}
          />
        </label>
        <button onClick={saveNewIngredient}>Enregistrer</button>
      </div>
      <div className="Ingredients__list">
        {ingredients.map((ingredient, key) =>
          <Ingredient
            key={key}
            ingredient={ingredient}
            onValidate={addCarbs}
            onDeleteIngredient={() => deleteIngredient(ingredient._id)}
          />
        )}
      </div>
    </div>
  );

  /**
   * Send a request to the database to delete the ingredient which has the parameter id
   * @param ingredientId
   */
  function deleteIngredient(ingredientId) {
    axiosInstance.get(`/ingredients/delete/${ingredientId}`).then(fetchIngredients)
  }

  /**
   * Saves a new ingredient in the Database
   * Then fetches the new ingredients list
   */
  function saveNewIngredient() {
    axiosInstance.post('/ingredients/create', {
      name: newName,
      carbsPerHundred: newCarbs,
      defaultPortionWeight
    }).then(fetchIngredients)
  }

  /**
   * Fetchs all the ingredients and refreshes the List
   */
  function fetchIngredients() {
    axiosInstance.get('/ingredients').then(response => {
      setIngredients(response.data.ingredients)
    })
  }

  async function addCarbs(carbs) {
    return axiosInstance.post('/user/addCarbs', {carbs}).then(response => {
      onCarbsUpdate(response.data.user);
    })
  }
}
