import TextField from "@mui/material/TextField";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { categories } from "../../utils/constants";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "./../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../SEO/SeoData";
import { Checkbox, FormControlLabel } from "@mui/material"; // ✅ Import these for F Assured switch

const MAX_IMAGE_SIZE = 500 * 1024;
const MAX_IMAGES_COUNT = 4;

const CreateProduct = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [warranty, setWarranty] = useState("");
  const [brand, setBrand] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({ title: "", description: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  // ✅ New state variables for ratings and fAssured
  const [ratings, setRatings] = useState("");
  const [fAssured, setFAssured] = useState(false);

  // ✅ Handlers are the same as before, no changes needed here.
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      toast.warning("Logo image size exceeds 500 KB!");
      return;
    }
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > MAX_IMAGES_COUNT) {
      toast.warning("You can only upload up to 4 images");
      return;
    }
    files.forEach((file) => {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.warning("One of the product images exceeds 500 KB");
        return;
      }
      setImages((prev) => [...prev, file]);
      setImagesPreview((prev) => [...prev, URL.createObjectURL(file)]);
    });
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput.trim()]);
    setHighlightInput("");
  };

  const deleteHighlight = (index) => setHighlights(highlights.filter((_, i) => i !== index));

  const handleSpecsChange = (e) => setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  const addSpec = () => {
    if (!specsInput.title.trim() || !specsInput.description.trim()) return;
    setSpecs([...specs, specsInput]);
    setSpecsInput({ title: "", description: "" });
  };
  const deleteSpec = (index) => setSpecs(specs.filter((_, i) => i !== index));

  // ✅ Updated submit handler
  const newProductSubmitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSubmit(true);

    try {
      if (!logo) {
        toast.warning("Please Add Brand Logo");
        setIsSubmit(false);
        return;
      }
      if (specs.length < 2) {
        toast.warning("Please Add Minimum 2 Specifications");
        setIsSubmit(false);
        return;
      }
      if (images.length < 1) {
        toast.warning("Please Add Product Images");
        setIsSubmit(false);
        return;
      }
      if (Number(ratings) > 5 || Number(ratings) < 0) {
        toast.warning("Ratings must be between 0 and 5.");
        setIsSubmit(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("discountPrice", Number(discountPrice));
      formData.append("category", category);
      formData.append("stock", Number(stock));
      formData.append("warranty", Number(warranty));
      formData.append("brandName", brand);
      formData.append("logo", logo);
      // ✅ Append new fields
      formData.append("ratings", Number(ratings));
      formData.append("fAssured", fAssured);

      images.forEach((image) => formData.append("images", image));
      highlights.forEach((h) => formData.append("highlights", h));
      specs.forEach((s) => formData.append("specifications", JSON.stringify(s)));

      // 🔥 DEBUG: Log all FormData entries before sending
      console.log("🔥 FormData being sent:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/product/new-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product Added Successfully!");
        navigate("/admin/dashboard/all-products");
      }
    } catch (error) {
      console.error("🔥 Create Product Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <SeoData title="New Product | FurryPaws" />
      <ScrollToTopOnRouteChange />

      {isSubmit ? (
        <div className="relative h-full">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={newProductSubmitHandler}
          encType="multipart/form-data"
          className="flex flex-col w-full sm:flex-row bg-white rounded-lg shadow p-4"
          id="mainForm"
        >
          <div className="flex flex-col mx-auto py-2 gap-3 m-2 w-[90%] ">
            {/* Name & Description */}
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              multiline
              rows={2}
              required
              variant="outlined"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Price & Discount */}
            <div className="flex gap-2 justify-between">
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Discount Price"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                required
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>

            {/* Category */}
            <TextField
              label="Category"
              select
              fullWidth
              variant="outlined"
              size="small"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((el, i) => (
                <MenuItem value={el} key={i}>
                  {el}
                </MenuItem>
              ))}
            </TextField>

            {/* Stock & Warranty */}
            <div className="flex justify-between gap-4">
              <TextField
                label="Stock"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                label="Warranty"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
                required
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>

            {/* ✅ New fields for Ratings and F Assured */}
            <div className="flex justify-between gap-4 items-center">
              <TextField
                label="Ratings"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                required
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
              />
              <FormControlLabel 
                control={
                  <Checkbox 
                    checked={fAssured} 
                    onChange={(e) => setFAssured(e.target.checked)} 
                    inputProps={{ 'aria-label': 'F Assured Checkbox' }}
                  />
                } 
                label="F Assured" 
              />
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center border rounded">
                <input
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  type="text"
                  placeholder="Highlight"
                  className="px-2 flex-1 outline-none border-none"
                />
                <span
                  onClick={addHighlight}
                  className="py-2 px-6 bg-[#88e0d8] text-white rounded-r hover:shadow-lg cursor-pointer"
                >
                  Add
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {highlights.map((h, i) => (
                  <div key={i} className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                    <p className="text-green-800 text-sm font-medium">{h}</p>
                    <span
                      onClick={() => deleteHighlight(i)}
                      className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Logo */}
            <h2 className="font-medium">Brand Details</h2>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
              <TextField
                label="Brand"
                type="text"
                variant="outlined"
                size="small"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <div className="w-24 h-10 flex items-center justify-center border rounded-lg relative">
                {!logoPreview ? <ImageIcon /> : <img draggable="false" src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain" />}
                <span className="text-red-500 absolute -top-1 -right-[90px]">
                  *<span className="text-[10px] text-gray-500">(max 500KB)</span>
                </span>
              </div>
              <label className="rounded bg-[#88e0d8] text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                <input type="file" name="logo" accept="image/*" onChange={handleLogoChange} className="hidden" />
                Choose Logo
              </label>
            </div>

            {/* Specifications */}
            <h2 className="font-medium">Specifications <span className="text-xs text-gray-500">(at least 2 required)</span></h2>
            <div className="flex justify-between gap-2 items-center">
              <TextField value={specsInput.title} onChange={handleSpecsChange} name="title" label="Name" placeholder="Model No." variant="outlined" size="small" />
              <TextField value={specsInput.description} onChange={handleSpecsChange} name="description" label="Description" placeholder="WJDK42DF5" variant="outlined" size="small" />
              <span onClick={addSpec} className="py-2 px-6 bg-[#88e0d8] text-white rounded hover:shadow-lg cursor-pointer">Add</span>
            </div>
            <div className="flex flex-col gap-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex justify-between gap-2 sm:gap-5 items-center text-sm rounded bg-blue-50 py-1 px-2">
                  <p className="text-gray-500 font-medium">{spec.title}</p>
                  <p>{spec.description}</p>
                  <span onClick={() => deleteSpec(i)} className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"><DeleteIcon /></span>
                </div>
              ))}
            </div>

            {/* Product Images */}
            <h2 className="font-medium">Product Images <span className="ml-2 text-xs text-gray-500">(1-4 images, max 500KB each)</span></h2>
            <div className="flex gap-2 overflow-x-auto h-32 border rounded">
              {imagesPreview.map((image, i) => <img draggable="false" src={image} alt="Product" key={i} className="w-full h-full object-contain" />)}
            </div>
            <label className="rounded font-medium bg-[#88e0d8] text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
              <input type="file" name="images" accept="image/*" multiple onChange={handleProductImageChange} className="hidden" />
              Choose Files
            </label>

            <div className="flex justify-end">
              <input form="mainForm" type="submit" className="bg-[#e5a692] uppercase w-full p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit" />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateProduct;