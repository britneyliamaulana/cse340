import db from './db.js'

const getAllProjects = async () => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM public.project p
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    ORDER BY p.date;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM project
    WHERE organization_id = $1
    ORDER BY date;
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.project p
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.project p
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0] || null;
};

const createProject = async (
  title,
  description,
  location,
  date,
  organizationId
) => {
  const query = `
    INSERT INTO project
    (title, description, location, date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;

  const queryParams = [
    title,
    description,
    location,
    date,
    organizationId
  ];

  

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};

const updateProject = async (
  projectId,
  title,
  description,
  location,
  date,
  organizationId
) => {
  const query = `
    UPDATE project
    SET
      title = $1,
      description = $2,
      location = $3,
      date = $4,
      organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const result = await db.query(query, [
    title,
    description,
    location,
    date,
    organizationId,
    projectId
  ]);

  if (result.rowCount === 0) {
    throw new Error("Project not found.");
  }

  return result.rows[0];
};

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO project_volunteer (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING;
  `;

  await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM project_volunteer
    WHERE user_id = $1
      AND project_id = $2;
  `;

  await db.query(query, [userId, projectId]);
};

const getProjectsByVolunteer = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM project_volunteer pv
    JOIN project p
      ON pv.project_id = p.project_id
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE pv.user_id = $1
    ORDER BY p.date;
  `;

  const result = await db.query(query, [userId]);

  return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
  const query = `
    SELECT 1
    FROM project_volunteer
    WHERE user_id = $1
      AND project_id = $2;
  `;

  const result = await db.query(query, [userId, projectId]);

  return result.rowCount > 0;
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
  addVolunteer,
  removeVolunteer,
  getProjectsByVolunteer,
  isUserVolunteer
};