import { Link } from "react-router-dom";
import { 
  Bone, 
  Shirt, 
  Heart, 
  Home, 
  PawPrint, 
  Droplet, 
  Sofa, 
  Sparkles, 
  ShoppingCart 
} from "lucide-react";

const catNav = [
  { name: "Food", icon: Bone },          // Pet food & treats
  { name: "Clothing", icon: Shirt },      // Pet clothes & accessories
  { name: "Medicines", icon: Heart },       // Vet care, meds, wellness
  { name: "Housing", icon: Home },       // Kennels, cages, aquariums
  { name: "Accessories", icon: PawPrint },    // Carriers, leashes, travel gear
  { name: "Grooming", icon: Droplet },   // Shampoo, brushes
  { name: "Toys", icon: Sparkles },      // Balls, chew toys
  { name: "Supplies", icon: ShoppingCart }, // General pet supplies
];



const Categories = () => {
  return (
    <section className="hidden sm:block bg-[#fcfcfc] py-5 shadow-sm">
      <div className="flex items-center justify-center gap-12">
        {catNav.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              to={`/products?category=${item.name}`}
              key={i}
              className="flex flex-col items-center gap-2 group transition-all duration-300"
            >
              <div className="h-14 w-14 flex items-center justify-center rounded-full border border-[#f2c4bb] bg-white shadow-md group-hover:bg-[#f2c4bb] transition-all duration-300">
                <Icon className="h-6 w-6 text-[#14213D] group-hover:text-white transition-all duration-300" />
              </div>
              <span className="text-sm font-medium text-[#14213D] group-hover:text-[#FCA311] transition-colors">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
