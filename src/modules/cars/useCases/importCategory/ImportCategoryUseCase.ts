import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    descripition: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
            return new Promise((resolve, reject) => {
                const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, descripition] = line;
                categories.push({
                    name,
                    descripition,
                });
            })
            .on("end", () => {
                resolve(categories);
            })
            .on("error", (err) => {
                reject(err)
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories)
    };
}

export { ImportCategoryUseCase };