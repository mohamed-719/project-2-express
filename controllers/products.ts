import productsModel from "../models/productsModel";
import { Products } from "../interfaces/products";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandling";
import multer from "multer";
import sharp from 'sharp';
import { NextFunction, Request, Response } from "express";
import ApiErrors from "../utils/apiErrors";
import asyncHandler from 'express-async-handler';
import { uploadMultiImages } from "../middlewares/uploadImages";



export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount: 1 }, { name: 'images', maxCount: 5 }])
export const resizeProductImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // if (req.file) {
  //   const imgName = `product-${Date.now()}.webp`
  //   await sharp(req.file.buffer)
  //     .resize(500, 500)
  //     .toFormat('webp')
  //     .webp({ quality: 95 })
  //     .toFile(`uploads/products/${imgName}`)
  //   req.body.cover = imgName;
  // }
  if (req.files) {
    if (req.files.cover) {
      const imgName = `product-${Date.now()}-cover.webp`
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/products/${imgName}`)
      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `product-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/products/${imgName}`);
        req.body.images.push(imgName);
      }))
    }
  }
  next();
})

function fileFilter (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  // To reject this file pass `false`, like so:
cb(null, false)
  // To accept the file pass `true`, like so:
cb(null, true)
  // You can always pass an error if something goes wrong:
cb(new Error('I don\'t have a clue!'))
}



export const getAllProducts = getAll<Products>(productsModel, 'products');
export const createProduct = createOne<Products>(productsModel);
export const getProduct = getOne<Products>(productsModel, 'reviews');
export const updateProduct = updateOne<Products>(productsModel)
export const deleteProduct = deleteOne<Products>(productsModel)