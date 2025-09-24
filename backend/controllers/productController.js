const {v2:cloudinary} = require('cloudinary');
const ProductModel = require('../models/productModel');


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    // Store all the images in cloudinary
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        // we have getting secure_url from the uploaded images
        return result.secure_url;
      })
    );

    const productData = {
        name,
        description,
        // In the form data we have to receive string value and convert the prcie value to Number
        price:Number(price),
        category,
        subCategory,
        // In the form data we have to receive string value and convert the bestSeller value to Boolean
        bestSeller: bestSeller === 'true'? true : false,
        // In the form data we have to receive string value and convert the sizes value to Array
        sizes :JSON.parse(sizes),
        image:imagesUrl,
        date:Date.now()
    }

    const product = new ProductModel(productData);

    const saveProduct = await product.save();

    res.json({ success: true, message:'Product Added', product:saveProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(error);
  }
};




// function for list products
const listProducts = async(req, res)=>{
    try {
        const products = await ProductModel.find({});
        return res.json({success:true, products})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({success:false, message:error.message})
    }
}




// function for removing products
const removeProduct = async(req, res)=>{
    try {
        const {productId} = req.params;
        await ProductModel.findByIdAndDelete(productId);
        return res.json({success:true, message:'Product Removed'})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({success:false, message:error.message});
    }
}



// function single product info
const singleProduct = async(req, res)=>{
    try {
        const {productId} = req.params;
        
        const product = await ProductModel.findById(productId);

        return res.json({success:true, product})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({success:false, message:error.message})
    }
}


module.exports={
    addProduct,
    listProducts,
    removeProduct,
    singleProduct
}