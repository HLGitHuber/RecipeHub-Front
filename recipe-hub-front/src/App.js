import RecipePage from "./RecipePage/RecipePage";
import RecipesList from "./RecipesList/RecipesList";
import RecipesListNonClass from "./RecipesList/RecipesListNonClass";
import RouterReact from "./Router/RouterReact";

function App() {
  return (
    <div className="App">
      <RouterReact/>
      {/* <RecipesListNonClass /> */}
    </div>
  );
}

export default App;
