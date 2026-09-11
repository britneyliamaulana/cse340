-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT project_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

INSERT INTO project
    (organization_id, title, description, location, date)
VALUES
-- BrightFuture Builders
(1, 'Park Renovation', 'Renovate and improve a local community park.', 'Central Community Park', '2026-10-05'),
(1, 'Community Center Repair', 'Help repair and improve the local community center.', 'Downtown Community Center', '2026-10-12'),
(1, 'School Building Project', 'Assist with improvements to a local school building.', 'Sunrise Primary School', '2026-10-19'),
(1, 'Neighborhood Cleanup', 'Work together to clean and improve neighborhood spaces.', 'Greenfield Neighborhood', '2026-10-26'),
(1, 'Playground Construction', 'Help construct a safe new playground for local children.', 'Riverside Community', '2026-11-02'),

-- GreenHarvest Growers
(2, 'Community Garden', 'Create a sustainable community vegetable garden.', 'Westside Community Garden', '2026-10-07'),
(2, 'Tree Planting Day', 'Plant trees to improve the local environment.', 'Greenfield Park', '2026-10-14'),
(2, 'Urban Farming Workshop', 'Teach community members about sustainable urban farming.', 'GreenHarvest Center', '2026-10-21'),
(2, 'Food Garden Project', 'Create vegetable gardens to provide fresh food to families.', 'Eastside Neighborhood', '2026-10-28'),
(2, 'Composting Initiative', 'Teach residents how to compost household and garden waste.', 'Community Learning Center', '2026-11-04'),

-- UnityServe Volunteers
(3, 'Food Drive', 'Collect and distribute food to families in need.', 'UnityServe Center', '2026-10-09'),
(3, 'Community Tutoring', 'Provide tutoring support to local students.', 'City Library', '2026-10-16'),
(3, 'Senior Support Day', 'Assist elderly community members with household tasks.', 'Oakview Community', '2026-10-23'),
(3, 'Clothing Donation Drive', 'Collect and distribute clothing to people in need.', 'UnityServe Center', '2026-10-30'),
(3, 'Neighborhood Volunteer Day', 'Bring volunteers together to improve the local community.', 'Southside Community', '2026-11-06');





-- Categories table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Junction table (many-to-many)
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);


INSERT INTO category (name)
VALUES
('Environmental'),
('Education'),
('Community Support');


INSERT INTO project_category (project_id, category_id)
VALUES
(1,1),(2,1),(3,2),(4,3),(5,1),
(6,1),(7,1),(8,2),(9,1),(10,1),
(11,3),(12,2),(13,3),(14,3),(15,3);