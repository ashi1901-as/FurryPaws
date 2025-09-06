import { Link } from "react-router-dom";
// ✅ Import the new categories list
import { categories } from "../../utils/constants";
import {
    Bone,
    Shirt,
    Heart,
    Home,
    PawPrint,
    Droplet,
    Sparkles,
    ShoppingCart
} from "lucide-react";

// Create a mapping object to link your category names to icons
// This makes the code cleaner and more robust
const categoryIcons = {
   "Food": Bone ,          // Pet food & treats
  "Clothing": Shirt ,      // Pet clothes & accessories
  "Medicines": Heart ,       // Vet care, meds, wellness
  "Housing":Home,       // Kennels, cages, aquariums
  "Accessories": PawPrint,    // Carriers, leashes, travel gear
  "Grooming": Droplet,   // Shampoo, brushes
  "Toys": Sparkles,      // Balls, chew toys
  "Supplies": ShoppingCart, // General pet supplies
};

const Categories = () => {
  return (
    <section className="hidden sm:block bg-[#fcfcfc] py-5 shadow-sm">
      <div className="flex items-center justify-center gap-12">
        {categories.map((catName, i) => {
          const Icon = categoryIcons[catName] || ShoppingCart; 
          return (
            <Link
              to={`/products?category=${catName}`} 
              key={i}
              className="flex flex-col items-center gap-2 group transition-all duration-300"
            >
              <div className="h-14 w-14 flex items-center justify-center rounded-full border border-[#f2c4bb] bg-white shadow-md group-hover:bg-[#f2c4bb] transition-all duration-300">
                <Icon className="h-6 w-6 text-[#14213D] group-hover:text-white transition-all duration-300" />
              </div>
              <span className="text-sm font-medium text-[#14213D] group-hover:text-[#FCA311] transition-colors">
                {catName}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;