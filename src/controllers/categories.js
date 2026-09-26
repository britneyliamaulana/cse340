import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  getCategoryProjects,
  getProjectCategories,
  updateCategoryAssignments
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js";

import { body, validationResult } from "express-validator";

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters")
];

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = "Service Categories";

  res.render("categories", { title, categories });
};


const showNewCategoryForm = async (req, res) => {
  res.render("new-category", {
    title: "Add New Category"
  });
};

const processNewCategoryForm = async (req, res) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect("/new-category");
  }

  try {
    const { name } = req.body;

    const newCategoryId = await createCategory(name);

    req.flash("success", "Category added successfully!");

    res.redirect(`/category/${newCategoryId}`);
  } catch (error) {
    console.error("Error creating category:", error);

    req.flash("error", "There was an error creating the category.");

    res.redirect("/new-category");
  }
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryById(categoryId);

  res.render("edit-category", {
    title: "Edit Category",
    category
  });
};

const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;

  const results = validationResult(req);

  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-category/${categoryId}`);
  }

  try {
    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash("success", "Category updated successfully!");

    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error("Error updating category:", error);

    req.flash("error", "There was an error updating the category.");

    res.redirect(`/edit-category/${categoryId}`);
  }
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

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getProjectCategories(projectId);

  const title = "Assign Categories to Project";

  res.render("assign-categories", {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const selectedCategoryIds = req.body.categoryIds || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  await updateCategoryAssignments(projectId, categoryIdsArray);

  req.flash("success", "Categories updated successfully.");

  res.redirect(`/project/${projectId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};