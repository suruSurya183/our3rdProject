import Product from "../models/product.model.js";
import path from "path";
import ImageKit from "imagekit";
import {
  validateProductInsertion,
  validateProductUpdate,
} from "../validators/product.validator.js";
import { v4 } from "uuid";
// export const createProduct = async (req, res) => {
//   const { error } = validateProductInsertion(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   try {
//     var imagekit = new ImageKit({
//       publicKey: process.env.PUBLICKEY_IMAGEKIT,
//       privateKey: process.env.PRIVATEKEY_IMAGEKIT,
//       urlEndpoint: process.env.ENDPOINT_URL,
//     });
//     const momdifiedName = `imagekit-${Date.now()}${path.extname(file.name)}`;
//     console.log(momdifiedName);
//     const {
//       categoryId,
//       itemId,
//       itemName,
//       description,
//       price,
//       photos,
//       quantityInStock,
//       offers,
//       disabled,
//     } = new Product(req.body);
//     const { fileId, url } = await imagekit.upload({
//       file: file.data,
//       fileName: momdifiedName,
//     });

//     photos.push({ fileId, url });
//     const product = await new Product({
//       categoryId,
//       itemId,
//       itemName,
//       description,
//       price,
//       photos,
//       quantityInStock,
//       offers,
//     });
//     const savedProduct = await product.save();

//     res.status(201).json({
//       message: "product created successfully",
//       savedProduct,
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };
export const createProduct = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateProductInsertion(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Create an instance of ImageKit
    const imagekit = new ImageKit({
      publicKey: process.env.PUBLICKEY_IMAGEKIT,
      privateKey: process.env.PRIVATEKEY_IMAGEKIT,
      urlEndpoint: process.env.ENDPOINT_URL,
    });

    // Generate modified name for the file
    const file = req.files.photos;
    const modifiedName = `imagekit-${Date.now()}${path.extname(file.name)}`;

    // Upload the file to ImageKit
    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedName,
    });

    // Create a new Product instance
    const itemId = v4();
    const {
      categoryId,
      venderId,
      itemName,
      description,
      price,
      photos,
      quantityInStock,
      offers,
    } = req.body;
    
    const product = new Product({
      categoryId,
      venderId,
      itemId,
      itemName,
      description,
      price,
      photos: [{ fileId, url }],
      quantityInStock,
      offers,
    });
  
    // Save the product to the database
    const savedProduct = await product.save();

    // Respond with success message
    res.status(201).json({
      message: "Product created successfully",
      savedProduct,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProduct = async (req, res) => {
  const { error } = validateProductUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).send("Product not found");
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send("Product not found");
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
};
