// backend/controllers/user/updateWishlist.js
import User from "../../models/userModel.js";

export const updateWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, type } = req.body;

    if (!productId || !type) {
      return res
        .status(400)
        .json({ success: false, message: "productId and type are required" });
    }

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (type === "add") {
      if (!user.wishlist.includes(productId)) user.wishlist.push(productId);
    } else {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId.toString()
      );
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate("wishlist");
    return res
      .status(200)
      .json({ success: true, wishlistItems: user.wishlist });
  } catch (error) {
    console.error("Error in updateWishlist:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default updateWishlist;
