import React, {useState} from 'react';

export default function Ingredient({ingredient, onValidate, onDeleteIngredient}) {
  const {name, carbsPerHundred, defaultPortionWeight} = ingredient;
  const [portionWeight, setPortionWeight] = useState(defaultPortionWeight || 0);
  // hasBeenValidated is a state to tell if the user has entered and validated the desired amount of carbs.
  const [hasBeenValidated, setValidationState] = useState(false);
  const carbs = carbsPerHundred / 100 * portionWeight;
  return (
    <div className="Ingredient">
      <div>
        <button onClick={onDeleteIngredient}>🗑️</button>
      </div>
      <div className="Ingredient__info">
        <h4>{name}</h4>
        {carbs}
      </div>
      <div>
        <input
          className="Ingredient__grams-input"
          value={portionWeight}
          onChange={(event) => setPortionWeight(event.target.value)}
          placeholder={"Portion (g)"}
        />
        g
      </div>
      <button onClick={validateCarbsAddition}>Ajouter {hasBeenValidated && "✔"}</button>
    </div>
  );

  function validateCarbsAddition() {
    onValidate(carbs).then(() => {
      setValidationState(true);
    })
  }
}
