const prisma = require('../db/index');

const findWishlist = async () => {
  const wishlist = await prisma.Wishlist.findMany();

  return wishlist;
};

const createWishlist = async (wishlistData) => {
  const { user_id, product_id } = wishlistData;

  if (!user_id || !product_id) {
    throw new Error('user_id and product_id are required');
  }

  const wishlist = await prisma.Wishlist.create({
    data: {
      user_id: user_id,
      product_id: product_id,
    },
  });

  return wishlist;
};

const findUserWishlist = async (userId) => {
  const userWishlist = await prisma.Wishlist.findMany({
    where: { user_id: userId },
  });

  return userWishlist;
};

const updateWishlist = async (wishlistId, updateData) => {
  const wishlist = await prisma.Wishlist.update({
    where: { wishlist_id: wishlistId },
    data: updateData,
    include: {
      product: true,
      user: true,
    },
  });
  return wishlist;
};

const deleteWishlist = async (wishlistId) => {
  const wishlist = await prisma.Wishlist.delete({
    where: { wishlist_id: wishlistId },
  });

  return wishlist;
};

module.exports = {
  findWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
  findUserWishlist,
};
