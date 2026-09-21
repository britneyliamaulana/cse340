import {
  getAllCategories,
  getCategoryById,
  getCategoryProjects,
} from "../models/categories.js";

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = "Service Categories";

  res.render("categories", { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
  const id = req.params.id;

  const category = await getCategoryById(id);
  const projects = await getCategoryProjects(id);

  res.render("category", {
    title: category.name,
    category,
    projects,
  });
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
};