import { FoodTrafficLight } from "@/components/interactive/food-traffic-light";
import { foods } from "@/lib/content";

/** Envoltorio de servidor: pasa los alimentos de content/foods.json al semáforo interactivo. */
export function FoodGuide() {
  return <FoodTrafficLight foods={foods} />;
}
