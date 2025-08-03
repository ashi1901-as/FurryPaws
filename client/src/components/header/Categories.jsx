import { Link } from "react-router-dom";
import { Smartphone, Shirt, Laptop, Home, Plane, WashingMachine, Sofa, Sparkles, ShoppingCart } from "lucide-react";

const catNav = [
  { name: "Mobiles", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Electronics", icon: Laptop },
  { name: "Home", icon: Home },
  { name: "Travel", icon: Plane },
  { name: "Appliances", icon: WashingMachine },
  { name: "Furniture", icon: Sofa },
  { name: "Beauty & More", icon: Sparkles },
  { name: "Grocery", icon: ShoppingCart },
];

const Categories = () => {
  return (
    <section className="hidden sm:block bg-[#F5F3E7] py-5 shadow-sm">
      <div className="flex items-center justify-center gap-10">
        {catNav.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              to={`/products?category=${item.name}`}
              key={i}
              className="flex flex-col items-center gap-2 group transition-all duration-300"
            >
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white shadow-md group-hover:bg-[#FCA311] transition-all duration-300">
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
