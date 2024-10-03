"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const category_1 = require("../entities/category");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catFilter = req.query.catFilter;
    let whereClause = {};
    if (catFilter) {
        whereClause = { name: catFilter };
    }
    try {
        const categories = yield category_1.Category.find({ where: whereClause });
        if (categories.length === 0) {
            res.status(404).send("No categories found");
        }
        else {
            res.json(categories);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error getting categories");
    }
});
exports.getCategories = getCategories;
