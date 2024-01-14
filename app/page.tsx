import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"


interface Recipe{
  id:string,
  title: string,
  image:string,
  time: number,
  description:string
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:3004/recipes')

  //delay response
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return result.json()
}
export default async function Home() {
  const recipes = await getRecipes()

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map(recipe =>(
          <Card key={recipe.id} className="fex flex-col justify-between">
            <CardHeader className="fex-row gap-4 items-center">

             <Avatar>
              <AvatarImage src = {`.../img/${recipe.image}`} alt="recipe img"/>
              <AvatarFallback>
                {recipe.title.slice(0,1)}
              </AvatarFallback>
             </Avatar>

              <div>
                <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>{recipe.time} mins to cook.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="secondary">View Recipe</Button>
           </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}