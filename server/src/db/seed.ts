import { connect, connection } from "mongoose";
import { config } from "../config";
import { Category, Product } from "../models";
import { categories, products } from "../mock";

(async () => {
    try {
        await connect(config.db.uri);
        await Product.deleteMany({});
        await Category.deleteMany({});

        const categoryDocs = await Category.insertMany(categories);

        const categoryMap = categoryDocs.reduce((map: any, category) => {
            map[category.name] = category._id;
            return map;
        }, {});

        const productWithCategoryIds = products.map((product: any) => ({
            ...product,
            category: categoryMap[product.category],
        }));

        await Product.insertMany(productWithCategoryIds);

        console.log("Database seeded successfully");
    } catch (error) {
        console.log("Error while seeding database : ", error);
    } finally {
        connection.close();
        console.log("Database seeding finished");
    }
})();
